/* i18n runtime — provider, hooks, <T> tokenizer.
 *
 * Post-prerender model: each HTML page is monolingual. The build script
 * inlines window.__I18N__ = { lang, dict } so hydration uses the exact
 * same strings the server rendered. setLang() navigates to the other
 * locale's URL — no client-side dict swap, no first-paint blocking.
 *
 * URL convention:
 *   EN: /index.html, /about.html, /services.html, /book.html, /case-study-company-x.html
 *   FR: same paths under /fr/
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const I18nContext = createContext({ lang: 'en', dict: {}, setLang: () => {} });

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
const T_TAG_RE = /<(br\s*\/?|\/?(?:em|strong|a)(?:\s+href="[^"]*")?)\s*>/g;

function parseInline(str) {
  if (typeof str !== 'string') return [str];
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

export function T({ id, vars }) {
  const { dict } = useContext(I18nContext);
  const raw = dict && dict[id];
  if (raw == null) {
    if (typeof window !== 'undefined') {
      if (!window.__T_WARNED__) window.__T_WARNED__ = {};
      if (!window.__T_WARNED__[id]) {
        console.warn('[i18n] missing key:', id);
        window.__T_WARNED__[id] = true;
      }
    }
    return id;
  }
  const interpolated = interpolate(raw, vars);
  const nodes = parseInline(interpolated);
  return React.createElement(React.Fragment, null, renderNodes(nodes, id));
}

/* ============ hooks ============ */
export function useT() {
  const { dict } = useContext(I18nContext);
  return function t(key, vars) {
    const raw = dict && dict[key];
    if (raw == null) {
      if (typeof window !== 'undefined') {
        if (!window.__T_WARNED__) window.__T_WARNED__ = {};
        if (!window.__T_WARNED__[key]) {
          console.warn('[i18n] missing key:', key);
          window.__T_WARNED__[key] = true;
        }
      }
      return key;
    }
    return interpolate(raw, vars);
  };
}

export function useLang() {
  const { lang, setLang } = useContext(I18nContext);
  return { lang, setLang };
}

// usePageTitle: kept for API compatibility, but in the prerendered model
// the <title> is already correct from SSR. This becomes a no-op except
// for confirming it on hydration in case anyone deep-linked weirdly.
export function usePageTitle(/* key */) {
  // intentionally empty — SSR sets the title.
}

/* ============ URL helpers ============ */
// Map current path to the equivalent path in `nextLang`.
// EN: /about.html  ↔  FR: /fr/about.html
// EN: /            ↔  FR: /fr/
function pathForLang(currentPath, nextLang) {
  if (nextLang === 'fr') {
    return currentPath.startsWith('/fr/') ? currentPath : ('/fr' + currentPath);
  }
  if (currentPath.startsWith('/fr/')) return currentPath.replace(/^\/fr\//, '/');
  return currentPath;
}

/* ============ provider ============ */
export function I18nProvider({ initialDict, initialLang, children }) {
  // Both server and client read from the same source. On the client we
  // also try window.__I18N__ as a fallback (e.g. when this provider is
  // mounted without explicit props by ad-hoc tooling).
  const lang = initialLang
    || (typeof window !== 'undefined' && window.__I18N__ && window.__I18N__.lang)
    || 'en';
  const dict = initialDict
    || (typeof window !== 'undefined' && window.__I18N__ && window.__I18N__.dict)
    || {};

  const setLang = useCallback((next) => {
    if (next === lang || typeof window === 'undefined') return;
    try { localStorage.setItem('mr_lang', next); } catch (e) { /* private mode, ignore */ }
    const newPath = pathForLang(window.location.pathname, next);
    window.location.assign(newPath + window.location.search + window.location.hash);
  }, [lang]);

  return React.createElement(
    I18nContext.Provider,
    { value: { lang, dict, setLang } },
    children
  );
}
