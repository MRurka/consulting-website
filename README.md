# michaelrurka.com

Static prerendered React site. Five pages × two languages (EN/FR) → ten
HTML files emitted into `dist/` at build time. GitHub Pages serves the
output. Each page hydrates from a small per-page bundle (React 18,
production build, ESM, esbuild).

## Stack

- **Source:** plain `.jsx` files in repo root (page modules + shared
  components), ESM imports, no JSX runtime config (esbuild's automatic
  JSX).
- **Build:** `scripts/build.js` runs esbuild twice per page — once for
  the SSR bundle (CJS, loaded via `createRequire` and rendered with
  `react-dom/server`), once for the client bundle (ESM, minified,
  content-hashed under `dist/js/`). Then templates the resulting HTML
  with `<head>` meta, hydration data, and writes EN at `/<page>.html`
  and FR at `/fr/<page>.html`.
- **i18n:** `i18n/en.json` + `i18n/fr.json` (mirrored key sets). Build
  inlines the per-language dict as `window.__I18N__` so client hydration
  uses the same strings the server rendered. See
  [CLAUDE.md](CLAUDE.md).
- **SEO:** the build also emits `robots.txt`, `sitemap.xml`, `llms.txt`,
  `<link rel="canonical">`, `hreflang` alternates, Open Graph, Twitter
  card, and JSON-LD per page.

## Local development

```sh
npm install         # one time
npm run build       # produces dist/
npm run dev         # build + serve dist/ on http://localhost:8765
```

`npm run dev` is one-shot — it does not watch. Re-run after edits.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) runs on every push to
`main`: installs deps, runs `check-i18n`, runs the build, publishes
`dist/` to GitHub Pages. Pages source must be set to **GitHub Actions**
in the repo settings.

## i18n

Site ships in English and French. Keys live in `i18n/en.json` and
`i18n/fr.json` with parity enforced by `scripts/check-i18n.js`. All UI
text is wrapped in `t('key')` or `<T id="key" />` — see
[CLAUDE.md](CLAUDE.md) for conventions.

URL convention: EN at `/<page>.html`, FR at `/fr/<page>.html`. The
in-page `LangSwitch` navigates to the equivalent URL in the other
locale. A small inline script handles `?lang=fr` deep-links and
persisted preference (`localStorage.mr_lang`) by redirecting before
first paint.

### One-time setup

This repo ships a tracked pre-commit hook that runs
`scripts/check-i18n.js`. Activate it locally with:

```sh
git config core.hooksPath .githooks
```

### Translation workflow

1. Edit copy in `i18n/en.json` (or wrap a new string in `t()`/`<T>`).
2. Add the same key to `i18n/fr.json` — `"[FR] <english>"` placeholder
   is fine if a real translation isn't ready, but the key MUST exist.
3. Commit. The hook verifies parity.
4. When Michael delivers translated FR copy, replace placeholders, then
   re-baseline the staleness hashes:

   ```sh
   node scripts/check-i18n.js --update-hashes
   ```

Run the check ad-hoc with:

```sh
npm run check-i18n
```

## Layout

```
.                       repo root
├── i18n/               translation JSON
├── entries/            per-page client hydration entries
├── scripts/            build.js, check-i18n.js
├── assets/             static files copied to dist/assets/
├── *.jsx               page modules + shared components (ESM)
└── dist/               build output (gitignored)
```

## Deferred work

See [debt.md](debt.md).
