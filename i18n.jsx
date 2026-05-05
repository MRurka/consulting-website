/* i18n runtime — provider, hooks, <T> tokenizer.
 *
 * Boot flow:
 *   1. Inline pre-Babel <script> in each HTML reads ?lang= / localStorage / navigator.language,
 *      sets <html lang>, kicks off `fetch('i18n/<lang>.json')`, and parks the promise on
 *      window.__I18N_BOOT__ = { lang, dictPromise }.
 *   2. <I18nProvider> awaits that promise. Renders null until resolved (block first paint).
 *      On fetch failure, falls back to en.json. If both fail, renders with raw keys
 *      and console.error — never hangs.
 *   3. setLang() reloads the dict for the new locale and updates ?lang= via replaceState.
 *
 * Public API on window: I18nProvider, useT, useLang, T.
 */

const { createContext: i18nCreateContext, useContext: i18nUseContext,
        useState: i18nUseState, useEffect: i18nUseEffect } = React;

const I18nContext = i18nCreateContext({ lang: 'en', dict: {}, setLang: () => {} });

/* ============ dict loader ============ */
const __dictCache = {};
async function loadDict(lang) {
  if (__dictCache[lang]) return __dictCache[lang];
  try {
    const res = await fetch('i18n/' + lang + '.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    __dictCache[lang] = data;
    return data;
  } catch (err) {
    console.error('[i18n] failed to load', lang, err);
    return null;
  }
}

/* ============ string interpolation ============ */
// Replaces {var} placeholders with vars[var]; substitutes {nbsp} -> U+00A0.
function interpolate(str, vars) {
  if (typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (m, key) => {
    if (key === 'nbsp') return ' ';
    if (vars && Object.prototype.hasOwnProperty.call(vars, key)) return String(vars[key]);
    return m;
  });
}

/* ============ <T> tokenizer ============ */
// Parses a small whitelist of inline tags into React elements:
//   <br/> <em>...</em> <strong>...</strong> <a href="...">...</a>
// No innerHTML — pure tokenizer.
const T_TAG_RE = /<(br\s*\/?|\/?(?:em|strong|a)(?:\s+href="[^"]*")?)\s*>/g;

function parseInline(str) {
  if (typeof str !== 'string') return [str];
  const out = [];
  const stack = [{ tag: 'root', children: [] }];
  let cursor = 0;
  let m;
  T_TAG_RE.lastIndex = 0;
  while ((m = T_TAG_RE.exec(str)) !== null) {
    const text = str.slice(cursor, m.index);
    if (text) stack[stack.length - 1].children.push(text);
    const raw = m[1].trim();
    cursor = T_TAG_RE.lastIndex;
    if (/^br\s*\/?$/.test(raw)) {
      stack[stack.length - 1].children.push({ tag: 'br', children: [] });
    } else if (raw === 'em' || raw === 'strong') {
      const node = { tag: raw, children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else if (/^a\s+href="([^"]*)"$/.test(raw)) {
      const href = raw.match(/href="([^"]*)"/)[1];
      const node = { tag: 'a', href, children: [] };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    } else if (raw === '/em' || raw === '/strong' || raw === '/a') {
      const expected = raw.slice(1);
      if (stack[stack.length - 1].tag === expected) stack.pop();
      else console.warn('[i18n] unbalanced </' + expected + '> in', JSON.stringify(str));
    } else {
      // unknown tag — emit as literal text
      stack[stack.length - 1].children.push(m[0]);
    }
  }
  if (cursor < str.length) stack[stack.length - 1].children.push(str.slice(cursor));
  return stack[0].children;
}

function renderNodes(nodes, keyPrefix) {
  return nodes.map((node, i) => {
    const k = keyPrefix + ':' + i;
    if (typeof node === 'string') return node;
    if (node.tag === 'br') return React.createElement('br', { key: k });
    if (node.tag === 'em' || node.tag === 'strong') {
      return React.createElement(node.tag, { key: k }, renderNodes(node.children, k));
    }
    if (node.tag === 'a') {
      return React.createElement('a', { key: k, href: node.href }, renderNodes(node.children, k));
    }
    return null;
  });
}

function T({ id, vars }) {
  const { dict } = i18nUseContext(I18nContext);
  const raw = dict && dict[id];
  if (raw == null) {
    if (typeof window !== 'undefined' && !window.__T_WARNED__) window.__T_WARNED__ = {};
    if (typeof window !== 'undefined' && !window.__T_WARNED__[id]) {
      console.warn('[i18n] missing key:', id);
      window.__T_WARNED__[id] = true;
    }
    return id;
  }
  const interpolated = interpolate(raw, vars);
  const nodes = parseInline(interpolated);
  return React.createElement(React.Fragment, null, renderNodes(nodes, id));
}

/* ============ hooks ============ */
function useT() {
  const { dict } = i18nUseContext(I18nContext);
  return function t(key, vars) {
    const raw = dict && dict[key];
    if (raw == null) {
      if (typeof window !== 'undefined' && !window.__T_WARNED__) window.__T_WARNED__ = {};
      if (typeof window !== 'undefined' && !window.__T_WARNED__[key]) {
        console.warn('[i18n] missing key:', key);
        window.__T_WARNED__[key] = true;
      }
      return key;
    }
    return interpolate(raw, vars);
  };
}

function useLang() {
  const { lang, setLang } = i18nUseContext(I18nContext);
  return { lang, setLang };
}

// Reactively set document.title from a dict key. Pass null to disable.
function usePageTitle(key) {
  const { dict } = i18nUseContext(I18nContext);
  i18nUseEffect(() => {
    if (!key || !dict) return;
    const v = dict[key];
    if (v) document.title = v;
  }, [key, dict]);
}

/* ============ provider ============ */
function I18nProvider({ children }) {
  const boot = (typeof window !== 'undefined' && window.__I18N_BOOT__) || { lang: 'en', dictPromise: loadDict('en') };
  const [lang, setLangState] = i18nUseState(boot.lang);
  const [dict, setDict] = i18nUseState(null);

  // Resolve the boot promise on mount.
  i18nUseEffect(() => {
    let cancelled = false;
    Promise.resolve(boot.dictPromise).then((d) => {
      if (cancelled) return;
      if (d) {
        __dictCache[boot.lang] = d;
        setDict(d);
      } else if (boot.lang !== 'en') {
        // Fallback to English on failure.
        loadDict('en').then((en) => {
          if (cancelled) return;
          if (en) { setLangState('en'); setDict(en); }
          else setDict({}); // both failed — render with raw keys
        });
      } else {
        setDict({});
      }
    });
    return () => { cancelled = true; };
  }, []);

  // Switch locale: load dict, persist, update URL + <html lang>.
  const setLang = React.useCallback(async (next) => {
    if (next === lang) return;
    const d = await loadDict(next);
    if (!d) {
      console.error('[i18n] cannot switch to', next, '(load failed)');
      return;
    }
    setDict(d);
    setLangState(next);
    try { localStorage.setItem('mr_lang', next); } catch {}
    document.documentElement.lang = next;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', next);
      window.history.replaceState({}, '', url);
    } catch {}
  }, [lang]);

  if (dict === null) return null; // block first paint

  return React.createElement(
    I18nContext.Provider,
    { value: { lang, dict, setLang } },
    children
  );
}

Object.assign(window, { I18nProvider, useT, useLang, usePageTitle, T });
