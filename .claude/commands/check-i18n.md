---
description: Run the i18n consistency check (en/fr key parity, attribute coverage, stale FR detection).
---

Run `node scripts/check-i18n.js` and report the result. If it fails:

1. Read the failure output and fix each issue at its source — wrap literal
   strings in `t()` / `<T>`, add missing keys to both `i18n/en.json` and
   `i18n/fr.json`, etc.
2. Do not bypass the check. Do not edit `scripts/check-i18n.js` to silence
   it.
3. If an EN value changed and Michael has re-translated FR, run
   `node scripts/check-i18n.js --update-hashes` to re-baseline.

If everything passes, just report "i18n OK" with the key count.
