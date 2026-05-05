# French/English Translation — Implementation Plan

**Status:** Approved, not yet started
**Owner:** Michael (translations) + Claude (implementation)
**Created:** 2026-05-05

---

## Goals

1. Full English/French parity across all user-facing copy on the site.
2. JSON-driven translations — Michael handles translation work outside the codebase, drops in `fr.json`, no code changes needed.
3. Permanent guardrails so new pages and copy can never ship without French support.
4. Strip dev-only scaffolding (tweaks panel, calculator placeholder) along the way.

## Non-goals (for this phase)

- French SEO via separate static `/fr/*.html` pages — deferred, tracked in `debt.md`.
- Translating dev-only / internal surfaces (none remain after Phase 0).

---

## Confirmed decisions

| Decision | Choice |
|---|---|
| URL strategy | `?lang=fr` query param + `localStorage.mr_lang` |
| First paint | Block until JSON dict resolves |
| Tweaks panel | **Remove entirely** |
| Calculator | **Remove entirely** (currently commented out) |
| Per-page meta translation | `document.title` only; full meta deferred → `debt.md` |
| `/project/` directory | **Delete entirely** as part of Phase 0 |

---

## Architecture

### JSON shape
Two mirrored files, flat dotted keys, single source of truth per locale. **UTF-8, no BOM.**

```
i18n/en.json
i18n/fr.json
```

```json
{
  "nav.services": "Services",
  "nav.about": "About",
  "nav.cta": "Let's talk",
  "home.hero.h1": "You've built a real business.<br/><em>Now what?</em>",
  "home.hero.sub": "Grow it, streamline it, …",
  "home.hero.cta": "Book a free intro call",
  "availability.same_year": "Available — {m1} & {m2} {year}",
  "availability.cross_year": "Available — {m1} {y1} & {m2} {y2}",
  "meta.home.title": "Michael Rurka — Operator's growth partner."
}
```

- Flat keys (not nested) so the file round-trips through a 2-column spreadsheet for translation.
- Inline markup is restricted to `<br/>`, `<em>`, `<strong>`, `<a href="…">` — parsed by a small `<T>` component using a tokenizer (no `dangerouslySetInnerHTML`).
- Variables use `{name}` placeholder syntax.
- Missing key → renders the key string itself + `console.warn`, so gaps are loud in dev.
- **French typography:** JSON values may include literal Unicode (curly quotes `'` `"`, en/em dashes `–` `—`). For mandatory NBSP before `: ; ? ! »` in French, translators may insert literal U+00A0 OR use the `{nbsp}` token, which `t()` substitutes to U+00A0 at render time. Apostrophes inside JSON strings are escaped per JSON spec (`L’opérateur` is fine; literal `'` also works since the wrapper is `"`).

### Runtime API (`i18n.jsx`)
- `<I18nProvider>` — owns `lang` state (replaces the 5 duplicated `useState`/localStorage blocks across page entries), reads `?lang=` then `localStorage` then `navigator.language`.
- `useT()` → `(key, vars?) => string`
- `<T id="…" vars={…} />` → React element with parsed inline tags
- `useLang()` → `{ lang, setLang }`
- `loadDict(lang)` → fetches `/i18n/{lang}.json`, caches in memory.
- Side effects on `lang` change: update `<html lang>`, `document.title`, push `?lang=` to URL via `history.replaceState`.

---

## Phases

### Phase 0 — Strip dev scaffolding

Must land first because tweaks/calculator currently gate which copy variant renders — pointless to translate three H1 variants when only one ships.

**Tweaks removal:**
- Lock canonical variants from current defaults: `h1Variant: 'D3'`, `accent: 'forest'`, `heroLayout: 'split'`, `typePairing: 'editorial'`, `langStyle: 'segmented'`, `howVariant: 'v4'`, **`statsLayout: 'panel'`** (from `case-study-company-x.html`).
- **Phase 0 exit criterion — run before declaring done:**
  ```
  grep -rn "useTweaks\|TweaksPanel\|tweaks\.\|window.__TWEAKS__\|EDITMODE-BEGIN" *.jsx *.html
  ```
  Output must be empty. Each of the 5 page Apps (`app.jsx`, `about.jsx`, `services.jsx`, `book.jsx`, `case-study-company-x.jsx`) carries its own `<TweaksPanel>` tree with potentially different option sets — enumerate and strip each individually. `case-study-company-x.jsx` also has its own `data-accent`/`data-type` `useEffect` (~line 595) that must be removed; collapse `CSStats` to the `panel` variant.
- Delete `tweaks-panel.jsx`.
- Inline chosen variants: replace `h1Map[tweaks.h1Variant]` with the D3 JSX directly; collapse `if (layout === 'fullbleed') / 'split' / 'portrait'` branches in `Hero` to just split (only `index.html` renders Hero — other pages' `heroLayout` values are dead); collapse `langStyle` to always `segmented`; set `data-accent="forest"` / `data-type="editorial"` statically in each HTML's `<html>` tag, drop the dynamic `useEffect` everywhere it lives.
- Strip `<script>window.__TWEAKS__ = …</script>` and `EDITMODE-BEGIN/END` markers from all 5 HTMLs.
- Strip `<script type="text/babel" src="tweaks-panel.jsx">` from all 5 HTMLs.

**Calculator removal:**
- Delete `calculator.jsx`.
- Remove `<script type="text/babel" src="calculator.jsx">` from `index.html`.
- Remove the entire `<style>` block in `index.html` covering `.calc-shell`, `.calc-vert-*`, `.calc-goal*`, `.calc-substep-*`, `.calc-flow*`, `.calc-field*`, `.calc-slider*`, `.calc-out*`, `.calc-shell__*`, `.calc-back`, `.calc-default-mark`, `.calc-step`, `.calc-notch`, `.calc-card` (verify before deleting — there are ~500 lines of calculator-only CSS).
- Remove the commented-out `<CalculatorSection />` line in `app.jsx`.
- Remove `CalculatorPlaceholder` from `sections.jsx` (currently exported on `window` but unreferenced).
- Remove `.calc-card` / `.calc-mock` styles inside `sections.jsx` styled blocks if any remain.

**`/project/` directory removal:** confirmed for deletion. It's a duplicate Claude Design handoff snapshot of the root files — keeping it risks drift between root and `/project/` copies. `rm -rf project/` as part of this phase.

### Phase 1 — i18n infrastructure

- Create `i18n.jsx` exporting `I18nProvider`, `useT`, `<T>`, `useLang`, `loadDict` on `window`.
- Create empty stub `i18n/en.json` and `i18n/fr.json`.
- Wire `<script type="text/babel" src="i18n.jsx">` into all 5 HTMLs **before** other `.jsx` scripts.
- Replace per-page lang state in `app.jsx`, `about.jsx`, `services.jsx`, `book.jsx`, `case-study-company-x.jsx` with `useLang()`.
- Block first paint: `I18nProvider` returns `null` until first dict resolves. Add a tiny inline `<style>` in each HTML setting `body { background: #f4f1ec }` so the gap doesn't flash white.
- Read `?lang=` on boot, write via `history.replaceState` on switch (no full reload).

**Parallelize JSON fetch with Babel transform.** Don't wait for Babel to compile `i18n.jsx` before kicking off the dict fetch. In each HTML `<head>`, add a non-Babel inline `<script>`:

```html
<script>
  (function(){
    var p = new URLSearchParams(location.search);
    var stored = null; try { stored = localStorage.getItem('mr_lang'); } catch(e){}
    var lang = p.get('lang') || stored || (navigator.language||'').slice(0,2);
    if (lang !== 'fr') lang = 'en';
    document.documentElement.lang = lang;
    window.__I18N_BOOT__ = { lang: lang, dictPromise: fetch('i18n/'+lang+'.json').then(function(r){ return r.ok ? r.json() : null; }).catch(function(){ return null; }) };
  })();
</script>
```

`I18nProvider` then awaits `window.__I18N_BOOT__.dictPromise`. **Failure fallback:** if the active dict fails to load, fall back to EN (load `en.json` if not already attempted); if both fail, render with raw keys + a `console.error`. Provider must never hang on `null`.

Same boot script also rewrites `document.title` from a small inlined per-page title map (resolves the FR title-flash issue noted in audit) and sets `<html lang>` synchronously before any paint.

### Phase 2 — String extraction

Walk files in this order, building `en.json` as you go:

1. `components.jsx` — NavBar links, Calendly modal copy, "Let's talk".
2. `sections.jsx` — Hero (final D3 variant only), marquee, services, footer.
3. `how.jsx` — step copy.
4. `about.jsx`, `services.jsx`, `book.jsx`, `case-study-company-x.jsx`.

**Conventions:**
- Plain text → `{t('key')}`.
- Strings with inline tags → `<T id="key" />`.
- Hero H1 with `<br/>` and `<em>` lives inside the JSON string, parsed by `<T>`.
- **Attribute strings count as user-facing copy** and must be translated: `aria-label`, `alt`, `title`, `placeholder` — wrap with `t()` (e.g. `aria-label={t('nav.menu')}`). Audit these explicitly per file: `components.jsx:227,248,314` (`aria-label="Menu" / "Close"`), Calendly modal copy at `components.jsx:320-324`, `book.jsx:71` (`title="Schedule a call"`), and the template-literal `aria-label={\`Switch to ${other.toUpperCase()}\`}` at `components.jsx:61,103,125,164` (replace with `t('lang.switch_to', { lang: other.toUpperCase() })`).
- **Eliminate imperative DOM writes that bypass React.** `app.jsx:38-42` and `about.jsx:223` use `document.querySelectorAll('.years-in-tech').forEach(el => el.textContent = yrs)`. These won't react to lang changes. Replace with `<T id="…" vars={{ n: yrs }} />` and remove the `useEffect`. Same for the hardcoded "13 years" in `how.jsx:24`.

**Deliverable:** complete `en.json` ready for handoff. `fr.json` with identical key structure and empty values, ready for Michael to translate.

### Phase 3 — Locale-aware formatting

- `availabilityLabel(now, lang, t)` — uses `Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', { month: 'long' })`, interpolated into `availability.same_year` / `availability.cross_year` keys.
- "Years in tech" — pure number stays universal; surrounding copy templated as `t('about.years', { n: yrs })`.
- Future numeric/currency formatting (if any returns): `Intl.NumberFormat(locale, …)`.

### Phase 4 — Per-page `document.title` only

- Title is set **twice**: (a) by the inline pre-Babel boot script using a small inlined title map (handles FR deep-link without flash), (b) by `usePageMeta('meta.home')` in the page App for runtime lang switches.
- Static HTML `<title>` keeps EN as the no-JS / pre-boot default.
- Full `<meta name=description>` localization + FR static pages → **deferred to `debt.md`**.

### Phase 5 — Enforcement (lands with or immediately after Phase 1)

Five redundant layers. Layer 5 (local git hook) is the single most important — it's the only one that fires when Michael commits directly from the terminal without Claude.

#### Layer 1 — `CLAUDE.md` instruction (durable)
Add or create `CLAUDE.md` at repo root with:

> **i18n is mandatory.** All user-facing copy must go through `t()` or `<T>` and exist in both `i18n/en.json` and `i18n/fr.json`. When you add or modify any UI string:
> 1. Add the key to `i18n/en.json` with the English value.
> 2. Add the same key to `i18n/fr.json` — placeholder `"[FR] <english>"` is acceptable if a real translation isn't ready, but the key MUST exist.
> 3. Never inline a literal string in JSX (text content OR `aria-label`/`alt`/`title`/`placeholder` attributes). Never call `t()` with a key that isn't in both files.
>
> Before reporting any UI task complete, run `node scripts/check-i18n.js` and fix any failures.
>
> **`debt.md` protocol:** when deferring scope, append an entry with date + reason + revisit trigger. When resolving, delete the entry in the same commit that lands the fix, referencing the original reason in the commit message.

#### Layer 2 — `scripts/check-i18n.js` (no deps, plain Node)
- **Check A:** `en.json` and `fr.json` have identical key sets. Reports missing keys per side.
- **Check B:** every `t('foo')` and `<T id="foo">` reference in `*.jsx` resolves to a key that exists in both files.
- **Check C:** heuristic scan for literal strings in **JSX text nodes only** (between `>` and `<`, excluding JSX attributes, CSS-in-JS template strings, `console.*` args, and inline `<style>{...}` blocks). Conditions: starts with capital, contains a space, length > 3. Allowlist starts empty.
- **Check D — attribute coverage:** scan JSX attributes named `aria-label`, `alt`, `title`, `placeholder`. String literals → fail. Template literals → fail unless they're already wrapping `t()`.
- **Check E — stale FR translations:** `fr.json` carries a parallel `_meta` object mapping each key to a hash of the EN value at last sync. On EN value change without FR re-sync, fail loudly with the changed keys. Re-syncing is just re-running the script with `--update-hashes` after Michael delivers updated FR. Simple and survives spreadsheet round-trips.
- Exit code 1 on failure with file:line of each offender.

#### Layer 3 — Claude Code blocking hook (Claude commits/pushes)
Confirmed against current Claude Code docs (2026-05-04): hooks receive payload via **stdin as JSON**, **exit 2** blocks the tool call AND surfaces stderr to Claude, `$CLAUDE_PROJECT_DIR` is the standard project-root env var.

Add to `.claude/settings.json` via the `update-config` skill:

```json
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "cmd=$(jq -r '.tool_input.command' 2>/dev/null); if echo \"$cmd\" | grep -qE 'git (commit|push)'; then node \"$CLAUDE_PROJECT_DIR/scripts/check-i18n.js\" || exit 2; fi; exit 0"
      }]
    }]
  }
}
```

When the regex doesn't match, `exit 0` (don't interfere with unrelated commands). When it matches and the script fails, propagate as `exit 2` so Claude sees the failure and blocks. Regex catches `git commit -am`, `git commit --amend`, `git push --force`, etc.

#### Layer 4 — `/check-i18n` slash command
`.claude/commands/check-i18n.md` — runs the script ad-hoc, useful for spot audits.

#### Layer 5 — Local git hook (terminal commits)
Single-developer project: Michael will hit `git commit` from the terminal. Claude's hook never fires there. Mandatory backstop:

- Add `.githooks/pre-commit` (tracked in repo, not in `.git/hooks`):
  ```bash
  #!/usr/bin/env bash
  set -e
  node "$(git rev-parse --show-toplevel)/scripts/check-i18n.js"
  ```
- One-time setup, documented in `README.md`: `git config core.hooksPath .githooks`
- This makes the check authoritative: every commit (Claude or human) goes through the same gate.

### Phase 6 — Translation handoff & QA

1. Hand off `i18n/en.json` to Michael.
2. Michael returns `i18n/fr.json` with translated values.
3. Drop into `/i18n/`, run `node scripts/check-i18n.js --update-hashes` to seed `_meta` hashes (Check E baseline).
4. Smoke check: every page in FR, verify line breaks/emphasis render, dates localize, NBSP appears before `: ; ? ! »`, CTAs don't blow out (FR copy ~20% longer than EN — watch hero, nav, button widths).
5. Verify `?lang=fr` deep-links and switcher persistence across navigation.
6. Run a tiny self-test inside `i18n.jsx` (active on `localhost` only): assert `<T>` parser handles representative fixtures (`<br/>`, nested `<em>` inside `<strong>`, `<a href>`, `{var}` interpolation, `{nbsp}` token, malformed input). Failures → `console.error` only, never throw.

---

## File-level summary

### Created
- `i18n.jsx` — runtime helpers
- `i18n/en.json`, `i18n/fr.json` (UTF-8 no BOM)
- `scripts/check-i18n.js`
- `.githooks/pre-commit` + `core.hooksPath` documented in `README.md`
- `CLAUDE.md` (or new section appended)
- `debt.md` (with FR SEO entry seeded + workflow protocol)
- `.claude/commands/check-i18n.md`

### Deleted
- `tweaks-panel.jsx`
- `calculator.jsx`
- `/project/` directory (entire duplicate handoff snapshot)
- All tweaks-related JSX in `app.jsx`, `about.jsx`, `services.jsx`, `book.jsx`, `case-study-company-x.jsx`
- `CalculatorPlaceholder` from `sections.jsx`
- Calculator CSS block in `index.html`
- `<script>window.__TWEAKS__</script>` blocks in all 5 HTMLs
- `EDITMODE-BEGIN/END` markers

### Modified
- All 5 HTML files — remove tweaks/calculator scripts, add `i18n.jsx` script, set `data-accent` / `data-type` statically.
- All 5 page App components — replace lang state with `useLang()`, lock variant choices, wrap copy in `t()` / `<T>`.
- `components.jsx`, `sections.jsx`, `how.jsx`, `about.jsx`, `services.jsx`, `book.jsx`, `case-study-company-x.jsx` — string extraction.
- `.claude/settings.json` — add PreToolUse hook.

---

## Risks / things to watch

- **First-paint blocking** adds latency, but mitigated by Phase 1's parallel-fetch design (boot `<script>` kicks off JSON fetch alongside Babel transform, not after). Tiny dict size + HTTP cache cover the rest. Fallback if ever needed: inline the active dict at deploy time.
- **Heuristic literal-string check** restricted to JSX text nodes + named attributes; allowlist mechanism in `check-i18n.js` from day one to absorb true positives (e.g. brand names, mailto). Keep allowlist additions in commits with justification.
- **FR length overflow** in nav and hero CTAs — handled in Phase 6 QA, may require minor CSS tweaks.
- **Babel-standalone runtime** — adding one more script (`i18n.jsx`) is a marginal cost; no concern.
- **CDN/static-host caching of `i18n/*.json`.** If hosted with aggressive cache headers, FR-translation updates won't reach users. **Mitigation:** append `?v=<short-hash-or-mtime>` to the JSON fetch URL in the boot script, regenerated on each deploy. Document in deploy workflow.
- **Stale FR after EN edits.** Handled by Check E (`_meta` hashes in `fr.json`); without it, drift is silent.
- **Hook semantics confirmed** against Claude Code docs (2026-05-04): stdin JSON payload, exit 2 blocks + surfaces stderr, `$CLAUDE_PROJECT_DIR` is standard. Re-verify if Claude Code releases ever change hook protocol; Layer 5 (local git hook) remains authoritative regardless.

---

## Phase order (final)

0. Strip tweaks + calculator + `/project/`
1. i18n infrastructure
2. String extraction → produce `en.json`
3. Locale-aware date formatting
4. `document.title` localization (other meta deferred to `debt.md`)
5. Enforcement layer (`CLAUDE.md` + `check-i18n.js` + PreToolUse hook)
6. Translation handoff + smoke test

Phases 0–5 are Claude's work. Phase 6 is the handoff loop with Michael.
