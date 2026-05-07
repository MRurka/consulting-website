# Tech debt

Tracked deferrals. Append on defer, delete on resolve. See CLAUDE.md
for the protocol.

## i18n: French meta descriptions

**Deferred:** 2026-05-07.

**What:** Five `meta.<page>.description` keys in `i18n/fr.json` are
still `[FR] <english>` placeholders. They are now correctly emitted
into FR HTML `<head>` (description, og:description, twitter:description,
JSON-LD description), so the SEO plumbing exists — only the copy is
missing.

**Trigger to revisit:** before sharing FR pages externally for organic
search or social previews. Replace placeholders, then run
`node scripts/check-i18n.js --update-hashes` to re-baseline.
