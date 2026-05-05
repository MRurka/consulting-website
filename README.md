# michaelrurka.com

Static consulting site. React + Babel-standalone over plain HTML pages
(no build step, no `node_modules`). Five entry points: `index.html`,
`about.html`, `services.html`, `book.html`, `case-study-company-x.html`.

## Local development

Serve the directory with any static HTTP server:

```sh
python3 -m http.server 8765
# or any equivalent
```

Then open <http://localhost:8765/>.

## i18n

Site ships in English and French. Translation copy lives in
`i18n/en.json` and `i18n/fr.json` (mirrored key sets). All UI text is
wrapped in `t('key')` or `<T id="key" />` — see `CLAUDE.md` for the
conventions.

`?lang=fr` deep-links select French; choice persists in `localStorage`.

### One-time setup

This repo ships a tracked pre-commit hook that runs `scripts/check-i18n.js`
to catch missing keys, untranslated strings, and stale FR translations
**before** any commit lands. To activate it for your local clone:

```sh
git config core.hooksPath .githooks
```

After that, every `git commit` runs the check automatically.

### Translation workflow

1. Edit copy in `i18n/en.json` (or wrap a new string in `t()`/`<T>`).
2. Add the same key to `i18n/fr.json` — `"[FR] <english>"` placeholder
   is fine if a real translation isn't ready, but the key MUST exist.
3. Commit. The hook verifies parity.
4. When Michael delivers translated FR copy, replace the `[FR] ...`
   placeholders, then run:

   ```sh
   node scripts/check-i18n.js --update-hashes
   ```

   This re-baselines the EN-value hash file (`i18n/.en-hashes.json`),
   which the staleness check uses to detect EN edits that need FR re-sync.

Run the check ad-hoc with:

```sh
node scripts/check-i18n.js
```

## Deferred work

See `debt.md`.
