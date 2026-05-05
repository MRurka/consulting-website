#!/usr/bin/env node
/* check-i18n.js — verify i18n integrity before commit/push.
 *
 * Checks:
 *   A. en.json and fr.json have identical key sets (no extras either side).
 *   B. Every t('foo') / <T id="foo" /> reference in *.jsx resolves to a
 *      key present in both dicts.
 *   C. Heuristic scan: literal English-looking strings in JSX *text nodes*
 *      that aren't wrapped in t()/<T>. Restricted to text between > and <,
 *      excludes attributes / inline <style> / template literals / console.*.
 *   D. Attribute coverage: aria-label, alt, title, placeholder must use
 *      t() — string literals on those attrs fail.
 *   E. Stale FR translations: every fr.json value is hashed against the
 *      EN value at last sync (stored in i18n/.en-hashes.json). If an EN
 *      value has changed since the hash was recorded, fail — Michael
 *      needs to re-translate. Run with --update-hashes after FR re-sync
 *      to re-baseline.
 *
 * Exit code 1 on any failure. Prints offending file:line.
 *
 * No deps — plain Node.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const EN_PATH = path.join(ROOT, 'i18n', 'en.json');
const FR_PATH = path.join(ROOT, 'i18n', 'fr.json');
const HASH_PATH = path.join(ROOT, 'i18n', '.en-hashes.json');

const args = process.argv.slice(2);
const UPDATE_HASHES = args.includes('--update-hashes');

const failures = [];
function fail(msg) { failures.push(msg); }

/* ---------- load dicts ---------- */
function loadJson(p) {
  if (!fs.existsSync(p)) { fail(p + ': missing'); return {}; }
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { fail(p + ': invalid JSON — ' + e.message); return {}; }
}
const en = loadJson(EN_PATH);
const fr = loadJson(FR_PATH);

/* ---------- Check A: key set parity ---------- */
const enKeys = new Set(Object.keys(en));
const frKeys = new Set(Object.keys(fr));
for (const k of enKeys) if (!frKeys.has(k)) fail('[A] missing in fr.json: ' + k);
for (const k of frKeys) if (!enKeys.has(k)) fail('[A] missing in en.json: ' + k);

/* ---------- collect JSX files ---------- */
const JSX_FILES = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.jsx'))
  .filter(f => f !== 'i18n.jsx') // i18n.jsx is the runtime, not a UI surface
  .map(f => path.join(ROOT, f));

/* ---------- Check B: t() / <T id> reference resolution ---------- */
// Match t('key', ...) or t("key", ...) where the FIRST argument is a complete
// string literal (no concatenation). The trailing `(?![+\w])` excludes
// `t('prefix.' + ...)` and `t('prefix.' . ...)`.
const T_CALL_RE = /\bt\(\s*['"]([^'"]+)['"]\s*(?![+])/g;
const T_ELEMENT_RE = /<T\s+[^>]*id=["']([^"']+)["']/g;

for (const file of JSX_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  function lineOf(idx) {
    let n = 1, i = 0;
    while (i < idx) { if (src[i] === '\n') n++; i++; }
    return n;
  }
  let m;
  T_CALL_RE.lastIndex = 0;
  while ((m = T_CALL_RE.exec(src)) !== null) {
    const key = m[1];
    // Defensive: skip captures ending with '.' — those are always dynamic
    // prefixes that the regex above should already exclude, but just in case.
    if (key.endsWith('.')) continue;
    if (!enKeys.has(key)) fail('[B] ' + path.basename(file) + ':' + lineOf(m.index) + ' t(' + JSON.stringify(key) + ') — missing in en.json');
    if (!frKeys.has(key)) fail('[B] ' + path.basename(file) + ':' + lineOf(m.index) + ' t(' + JSON.stringify(key) + ') — missing in fr.json');
  }
  T_ELEMENT_RE.lastIndex = 0;
  while ((m = T_ELEMENT_RE.exec(src)) !== null) {
    const key = m[1];
    if (!enKeys.has(key)) fail('[B] ' + path.basename(file) + ':' + lineOf(m.index) + ' <T id=' + JSON.stringify(key) + '> — missing in en.json');
    if (!frKeys.has(key)) fail('[B] ' + path.basename(file) + ':' + lineOf(m.index) + ' <T id=' + JSON.stringify(key) + '> — missing in fr.json');
  }
}

/* ---------- Check C: literal text nodes ---------- */
// Text between > and < that doesn't contain { (interpolation) or look like markup.
// Allowlist file path: scripts/.i18n-allowlist (one line per allowed substring;
// matched case-sensitively against the captured text).
const ALLOWLIST_PATH = path.join(__dirname, '.i18n-allowlist');
const allowlist = fs.existsSync(ALLOWLIST_PATH)
  ? fs.readFileSync(ALLOWLIST_PATH, 'utf8').split('\n').map(s => s.trim()).filter(Boolean)
  : [];
function isAllowed(text) {
  return allowlist.some(s => text.includes(s));
}

// Match >TEXT< where TEXT contains a space, starts with capital A-Z, length > 3,
// and doesn't contain { or }. Excludes any stretch with newlines (those are usually
// JSX expressions or multiline indentation).
const TEXT_NODE_RE = />([A-Z][^<>{}\n]{3,})</g;

for (const file of JSX_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  function lineOf(idx) {
    let n = 1, i = 0;
    while (i < idx) { if (src[i] === '\n') n++; i++; }
    return n;
  }
  let m;
  TEXT_NODE_RE.lastIndex = 0;
  while ((m = TEXT_NODE_RE.exec(src)) !== null) {
    const text = m[1].trim();
    if (text.length < 4) continue;
    if (!/\s/.test(text)) continue;             // single tokens (e.g. "→") skip
    if (/^[\s\d:.,/—·#$%&-]+$/.test(text)) continue; // pure punctuation/numbers
    if (isAllowed(text)) continue;
    fail('[C] ' + path.basename(file) + ':' + lineOf(m.index) + ' literal text in JSX: ' + JSON.stringify(text));
  }
}

/* ---------- Check D: forbidden literal-string attributes ---------- */
const FORBIDDEN_ATTRS = ['aria-label', 'alt', 'title', 'placeholder'];
for (const file of JSX_FILES) {
  const src = fs.readFileSync(file, 'utf8');
  function lineOf(idx) {
    let n = 1, i = 0;
    while (i < idx) { if (src[i] === '\n') n++; i++; }
    return n;
  }
  for (const attr of FORBIDDEN_ATTRS) {
    // Match `aria-label="..."` (string literal — NOT `aria-label={t(...)}` nor `aria-label={...}`).
    const re = new RegExp(attr + '\\s*=\\s*"([^"]*)"', 'g');
    let m;
    while ((m = re.exec(src)) !== null) {
      const v = m[1].trim();
      if (!v) continue;
      if (isAllowed(v)) continue;
      fail('[D] ' + path.basename(file) + ':' + lineOf(m.index) + ' literal ' + attr + '="' + v + '" — wrap with t()');
    }
  }
}

/* ---------- Check E: stale FR translations ---------- */
function hash(s) { return crypto.createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 12); }
let storedHashes = {};
if (fs.existsSync(HASH_PATH)) {
  try { storedHashes = JSON.parse(fs.readFileSync(HASH_PATH, 'utf8')); }
  catch { storedHashes = {}; }
}

if (UPDATE_HASHES) {
  const next = {};
  for (const k of Object.keys(en)) next[k] = hash(en[k]);
  fs.writeFileSync(HASH_PATH, JSON.stringify(next, null, 2) + '\n', 'utf8');
  console.log('Updated', Object.keys(next).length, 'EN-value hashes ->', path.relative(ROOT, HASH_PATH));
} else {
  // Only flag stale keys that have a *non-placeholder* FR value, to avoid
  // spamming during initial bootstrap when fr.json is full of "[FR] ..." placeholders.
  for (const k of Object.keys(en)) {
    const stored = storedHashes[k];
    if (!stored) continue; // never synced — skip until first --update-hashes
    if (stored === hash(en[k])) continue; // EN unchanged
    const frVal = fr[k];
    if (typeof frVal === 'string' && frVal.startsWith('[FR] ')) continue; // still a placeholder, not a real translation
    fail('[E] ' + k + ': EN value changed since last FR sync — re-translate or run check-i18n.js --update-hashes');
  }
}

/* ---------- report ---------- */
if (failures.length === 0) {
  console.log('check-i18n: OK ' + Object.keys(en).length + ' keys, ' + JSX_FILES.length + ' jsx files scanned.');
  process.exit(0);
}
console.error('check-i18n: ' + failures.length + ' failure(s)\n');
for (const f of failures) console.error('  ' + f);
console.error('\nFix the issues above. See CLAUDE.md for conventions.');
process.exit(1);
