# CLAUDE.md — repo conventions for Claude Code

## i18n is mandatory

This site ships in English and French. **Every** user-facing string must
go through the i18n system or the FR build is broken.

When you add or modify any UI string:

1. Add the key to `i18n/en.json` with the English value.
2. Add the **same key** to `i18n/fr.json`. Placeholder `"[FR] <english>"`
   is acceptable if a real translation isn't ready, but the key MUST
   exist in both files.
3. Never inline a literal string in JSX — neither text content nor any of
   the user-facing attributes: `aria-label`, `alt`, `title`,
   `placeholder`. Use `{t('key')}` for plain text or `<T id="key" />`
   for strings that contain inline markup.
4. Never call `t()` or `<T id=...>` with a key that isn't in **both**
   JSON files.

Plain text → `{t('key')}`. Markup-bearing strings → `<T id="key" />`.
The `<T>` tokenizer supports `<br/>`, `<em>`, `<strong>`, and `<a href>`
only. For French typography, use `{nbsp}` in the JSON value where U+00A0
is required (before `: ; ? ! »`).

Variables are interpolated with `{name}` placeholders, passed via the
second arg to `t()` or via `vars={{ name }}` on `<T>`.

**Before reporting any UI task complete, run:**

```sh
npm run check-i18n
```

Fix any failures. The same script runs as a `git commit`/`git push` hook
— see `.githooks/pre-commit` and `.claude/settings.json`. If the hook
fires and the script fails, do not bypass it; fix the underlying issue.

If the i18n schema changes or you need to add genuinely new keys, do so
in the same change that introduces the strings — never as a follow-up.

## Build model

Site is statically prerendered. `scripts/build.js` runs esbuild for SSR
and client bundles per page, then writes ten HTML files to `dist/` (five
pages × EN/FR). EN serves at `/<page>.html`, FR at `/fr/<page>.html`.
Run `npm run build` after any source edit; `npm run dev` builds and
serves on `:8765`. There is no watch mode.

When adding/removing pages: update the `PAGES` array in
`scripts/build.js`, add a per-page entry under `entries/`, and add the
matching `meta.<slug>.title` + `meta.<slug>.description` keys to both
i18n JSONs. Asset paths inside JSX must be **root-relative**
(`/assets/foo.png`) so they resolve correctly under `/fr/`. Internal
nav links can stay relative (`services.html` resolves correctly under
both `/` and `/fr/`).

Anything rendered with `new Date()` or other moving inputs needs
`suppressHydrationWarning` on the wrapping element — SSR runs at build
time, hydration runs in the browser, and the values may differ across
month/year boundaries.

## debt.md protocol

When deferring scope:
- Append a new entry with date, what was deferred, why, and the trigger
  to revisit.
- Keep entries terse (one short paragraph each).

When resolving:
- Delete the entry in the same commit that lands the fix.
- Reference the original deferral in the commit message.

## Variant lock-in

Phase 0 of the i18n project locked all the previously runtime-tweakable
design variants. The site is **always** rendered with:

- Hero: D3 H1 ("You've built a real business. _Now what?_"), split layout
- Accent: forest green (`data-accent="forest"` on `<html>`)
- Type pairing: editorial / Archivo (`data-type="editorial"` on `<html>`)
- Lang switcher: segmented pill
- "How" section: v4
- Case-study stats: panel layout

Don't reintroduce alternate variants without removing the lock.
