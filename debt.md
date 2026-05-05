# Tech debt

Tracked deferrals. Append on defer, delete on resolve. See CLAUDE.md
for the protocol.

## i18n: French SEO + meta description

**Deferred:** 2026-05-05.

**What:** French copy is rendered client-side via fetched JSON. Search
engine crawlers that don't execute JS will only see the English default
in static HTML, so `/index.html`, `/about.html`, etc. are not indexable
in French. Additionally, only `<title>` is currently localized — full
`<meta name="description">` localization is also deferred.

**Fix options when revisited:**

1. Generate `/fr/*.html` static mirrors at deploy time (build step
   required — currently no build).
2. Pre-render with a small Node script that walks the dict and emits
   `fr-<page>.html` with strings substituted in.
3. Server-side rendering (heaviest — would change hosting model).

Whichever path is chosen, also generate localized `<meta name=description>`
and OpenGraph tags as part of the same pass.

**Trigger to revisit:** if FR organic search traffic becomes a goal, or
if analytics show FR users landing on EN content.
