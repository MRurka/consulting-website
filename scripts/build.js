/* Static site build:
 *   1. Bundle each page's server entry → load → ReactDOMServer.renderToString.
 *   2. Bundle each page's client entry → dist/js/<slug>.[hash].js for hydration.
 *   3. For each (page, lang) pair, emit HTML at /<page> (EN) and /fr/<page> (FR).
 *   4. Copy assets, write robots.txt, sitemap.xml, llms.txt, CNAME.
 *
 * No watch mode. Run via `npm run build`. CI publishes dist/.
 */

import { build as esbuild } from 'esbuild';
import {
  readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, statSync,
} from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const tmpDir = path.join(distDir, '.tmp');

const SITE_URL = 'https://michaelrurka.com';
const LANGS = ['en', 'fr'];
const DEFAULT_LANG = 'en';

// Each page renders the same React tree via I18nProvider with a per-lang dict.
// `htmlBase` is the bare filename — EN serves at /<htmlBase>, FR at /fr/<htmlBase>.
// `ld` is the JSON-LD slug used to switch between Person/Article/etc. schemas.
const PAGES = [
  { slug: 'home',      module: 'app.jsx',                  entry: 'entries/home.jsx',       htmlBase: 'index.html',                titleKey: 'meta.home.title',      descKey: 'meta.home.description',      ld: 'home' },
  { slug: 'about',     module: 'about.jsx',                entry: 'entries/about.jsx',      htmlBase: 'about.html',                titleKey: 'meta.about.title',     descKey: 'meta.about.description',     ld: 'about' },
  { slug: 'services',  module: 'services.jsx',             entry: 'entries/services.jsx',   htmlBase: 'services.html',             titleKey: 'meta.services.title',  descKey: 'meta.services.description',  ld: 'service' },
  { slug: 'book',      module: 'book.jsx',                 entry: 'entries/book.jsx',       htmlBase: 'book.html',                 titleKey: 'meta.book.title',      descKey: 'meta.book.description',      ld: 'book' },
  { slug: 'caseStudy', module: 'case-study-company-x.jsx', entry: 'entries/case-study.jsx', htmlBase: 'case-study-company-x.html', titleKey: 'meta.cs.title', descKey: 'meta.cs.description', ld: 'caseStudy' },
];

/* ------------------ helpers ------------------ */
const log = (...a) => console.log('[build]', ...a);

function loadDict(lang) {
  const file = path.join(root, 'i18n', `${lang}.json`);
  return JSON.parse(readFileSync(file, 'utf8'));
}

function htmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJsonScript(obj) {
  // </script> safety + Unicode line/paragraph separator escapes for inline JSON.
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function urlForPage(htmlBase, lang) {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return `${prefix}/${htmlBase}`;
}

/* ------------------ JSON-LD per page ------------------ */
function jsonLdFor(page, lang, dict) {
  const url = SITE_URL + urlForPage(page.htmlBase, lang);
  const name = 'Michael Rurka';
  const desc = dict[page.descKey] || dict['meta.home.description'] || '';
  const sameAs = ['https://www.linkedin.com/in/michaelrurka/'];
  const image = `${SITE_URL}/assets/michael.webp`;

  if (page.ld === 'home' || page.ld === 'about') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        url: SITE_URL + urlForPage('index.html', lang),
        image,
        jobTitle: lang === 'fr' ? 'Partenaire de croissance' : "Operator's growth partner",
        sameAs,
        email: 'mailto:michaelrurka91@gmail.com',
        address: { '@type': 'PostalAddress', addressLocality: 'Montreal', addressRegion: 'QC', addressCountry: 'CA' },
        description: desc,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: name + ' — Consulting',
        url: SITE_URL + urlForPage('services.html', lang),
        provider: { '@type': 'Person', name },
        areaServed: ['Canada', 'Latin America'],
        description: dict['meta.services.description'] || desc,
      },
    ];
  }
  if (page.ld === 'service') {
    return [{
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: name + ' — Consulting',
      url, provider: { '@type': 'Person', name, url: SITE_URL },
      areaServed: ['Canada', 'Latin America'],
      description: desc,
    }];
  }
  if (page.ld === 'caseStudy') {
    return [{
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: dict['cs.hero.h1'] || dict[page.titleKey],
      url, image, author: { '@type': 'Person', name, url: SITE_URL },
      publisher: { '@type': 'Person', name },
      description: desc,
      inLanguage: lang,
    }];
  }
  if (page.ld === 'book') {
    return [{
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      url, description: desc,
      mainEntity: { '@type': 'Person', name, url: SITE_URL },
    }];
  }
  return [];
}

/* ------------------ HTML template ------------------ */
function renderHtml({ page, lang, dict, ssrHtml, jsBundlePath }) {
  const title = dict[page.titleKey] || 'Michael Rurka';
  const desc = dict[page.descKey] || '';
  const canonical = SITE_URL + urlForPage(page.htmlBase, lang);
  const altEn = SITE_URL + urlForPage(page.htmlBase, 'en');
  const altFr = SITE_URL + urlForPage(page.htmlBase, 'fr');
  const ogImage = `${SITE_URL}/assets/michael.webp`;
  const ldBlobs = jsonLdFor(page, lang, dict)
    .map(o => `<script type="application/ld+json">${safeJsonScript(o)}</script>`)
    .join('\n');

  const initialI18n = safeJsonScript({ lang, dict });

  return `<!doctype html>
<html lang="${lang}" data-accent="forest" data-type="editorial">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${htmlEscape(title)}</title>
<meta name="description" content="${htmlEscape(desc)}" />
<link rel="canonical" href="${canonical}" />
<link rel="alternate" hreflang="en" href="${altEn}" />
<link rel="alternate" hreflang="fr" href="${altFr}" />
<link rel="alternate" hreflang="x-default" href="${altEn}" />

<!-- Open Graph -->
<meta property="og:type" content="${page.ld === 'caseStudy' ? 'article' : 'website'}" />
<meta property="og:title" content="${htmlEscape(title)}" />
<meta property="og:description" content="${htmlEscape(desc)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:locale" content="${lang === 'fr' ? 'fr_CA' : 'en_CA'}" />
<meta property="og:site_name" content="Michael Rurka" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${htmlEscape(title)}" />
<meta name="twitter:description" content="${htmlEscape(desc)}" />
<meta name="twitter:image" content="${ogImage}" />

<link rel="icon" type="image/x-icon" href="/assets/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Archivo:wght@400;500;600;700;800;900&family=Archivo+Narrow:wght@400;500;600;700&display=swap" rel="stylesheet">

<!-- Lang preference: redirect at first paint if the user previously chose
     the other locale via ?lang= or via in-page switcher (localStorage). -->
<script>
(function(){
  try {
    var p = new URLSearchParams(location.search);
    var override = p.get('lang');
    if (override === 'en' || override === 'fr') {
      try { localStorage.setItem('mr_lang', override); } catch (e) {}
    }
    var stored;
    try { stored = localStorage.getItem('mr_lang'); } catch (e) {}
    var prefer = override || stored;
    var pathname = location.pathname;
    var isFR = pathname.indexOf('/fr/') === 0;
    if (prefer === 'fr' && !isFR) {
      location.replace('/fr' + pathname + location.search.replace(/[?&]lang=(en|fr)/, '').replace(/^&/, '?') + location.hash);
    } else if (prefer === 'en' && isFR) {
      var stripped = pathname.replace(/^\\/fr\\//, '/');
      location.replace(stripped + location.search.replace(/[?&]lang=(en|fr)/, '').replace(/^&/, '?') + location.hash);
    }
  } catch (e) {}
})();
</script>

<!-- PostHog analytics -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="Ei Ni init zi Gi Nr Ui Xi Hi capture calculateEventProperties tn register register_once register_for_session unregister unregister_for_session an getFeatureFlag getFeatureFlagPayload getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync ln identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset setIdentity clearIdentity get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException addExceptionStep captureLog startExceptionAutocapture stopExceptionAutocapture loadToolbar get_property getSessionProperty nn Qi createPersonProfile setInternalOrTestUser sn qi cn opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Ji debug Fr rn getPageViewId captureTraceFeedback captureTraceMetric Bi".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_gHc4QgqVXi5JQjMUBbBseFfrzUhJsZUbOdEibZW1kzJ', {
    api_host: 'https://us.i.posthog.com',
    defaults: '2026-01-30',
    person_profiles: 'identified_only',
  });
</script>

<style>body { background: #f4f1ec; }</style>
<link rel="stylesheet" href="/assets/styles.css">

${ldBlobs}

</head>
<body>

<div id="root">${ssrHtml}</div>

<script>window.__I18N__ = ${initialI18n};</script>
<script type="module" src="${jsBundlePath}"></script>

<noscript>
  <div style="padding:32px 22px;font-family:system-ui,sans-serif">
    <p>${htmlEscape(desc)}</p>
    <p><a href="mailto:michaelrurka91@gmail.com">michaelrurka91@gmail.com</a></p>
  </div>
</noscript>

</body>
</html>
`;
}

/* ------------------ build steps ------------------ */
async function bundleServer(page) {
  // Generate a tiny per-page server entry on the fly. esbuild's stdin
  // resolves relative paths against `resolveDir`.
  const code = `
import React from 'react';
import { renderToString } from 'react-dom/server';
import { I18nProvider } from './i18n.jsx';
import App from './${page.module}';

export function render(dict, lang) {
  return renderToString(
    React.createElement(I18nProvider, { initialDict: dict, initialLang: lang },
      React.createElement(App))
  );
}
`;
  const out = path.join(tmpDir, `ssr.${page.slug}.cjs`);
  await esbuild({
    stdin: { contents: code, resolveDir: root, loader: 'jsx' },
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    outfile: out,
    jsx: 'automatic',
    loader: { '.jsx': 'jsx' },
    logLevel: 'warning',
  });
  // Bust require cache so multi-page builds in the same process see fresh modules.
  delete require.cache[require.resolve(out)];
  const mod = require(out);
  return mod.render;
}

async function bundleClient(page) {
  const entry = path.join(root, page.entry);
  const result = await esbuild({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    target: ['es2020'],
    minify: true,
    platform: 'browser',
    jsx: 'automatic',
    loader: { '.jsx': 'jsx' },
    define: { 'process.env.NODE_ENV': '"production"' },
    write: false,
    logLevel: 'warning',
  });
  const file = result.outputFiles[0];
  const hash = crypto.createHash('sha1').update(file.contents).digest('hex').slice(0, 8);
  const filename = `${page.slug}.${hash}.js`;
  const outPath = path.join(distDir, 'js', filename);
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, file.contents);
  return `/js/${filename}`;
}

function copyStaticAssets() {
  const src = path.join(root, 'assets');
  const dst = path.join(distDir, 'assets');
  cpSync(src, dst, { recursive: true });

  // CNAME for GitHub Pages.
  const cname = path.join(root, 'CNAME');
  if (existsSync(cname)) cpSync(cname, path.join(distDir, 'CNAME'));
}

function writeRobotsTxt() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  writeFileSync(path.join(distDir, 'robots.txt'), body);
}

function writeSitemap() {
  const urls = [];
  for (const page of PAGES) {
    for (const lang of LANGS) {
      urls.push({
        loc: SITE_URL + urlForPage(page.htmlBase, lang),
        alts: LANGS.map(l => ({ hreflang: l, href: SITE_URL + urlForPage(page.htmlBase, l) })),
      });
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
${u.alts.map(a => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${urlForPage(PAGES[0].htmlBase, 'en')}" />
  </url>`).join('\n')}
</urlset>
`;
  writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
}

function writeLlmsTxt(dicts) {
  const en = dicts.en;
  const body = `# Michael Rurka

> ${en['meta.home.description']}

## About

${en['about.hero.p2']} ${en['about.hero.p3']}

## What I do

- ${en['home.whatido.cx.title']}: ${en['home.whatido.cx.body']}
- ${en['home.whatido.ops.title']}: ${en['home.whatido.ops.body']}
- ${en['home.whatido.tech.title']}: ${en['home.whatido.tech.body']}
- ${en['home.whatido.growth.title']}: ${en['home.whatido.growth.body']}

## Pages

- [Home](${SITE_URL}/index.html): ${en['meta.home.description']}
- [About](${SITE_URL}/about.html): ${en['meta.about.description']}
- [Services](${SITE_URL}/services.html): ${en['meta.services.description']}
- [Case study (Company X)](${SITE_URL}/case-study-company-x.html): ${en['meta.cs.description']}
- [Book a call](${SITE_URL}/book.html): ${en['meta.book.description']}

## Contact

- Email: michaelrurka91@gmail.com
- LinkedIn: https://www.linkedin.com/in/michaelrurka/
- Based in Montreal, Quebec, Canada. Working across Canada and Latin America.
`;
  writeFileSync(path.join(distDir, 'llms.txt'), body);
}

/* ------------------ main ------------------ */
async function main() {
  log('cleaning dist/');
  if (existsSync(distDir)) rmSync(distDir, { recursive: true });
  mkdirSync(tmpDir, { recursive: true });

  log('loading dicts');
  const dicts = Object.fromEntries(LANGS.map(l => [l, loadDict(l)]));

  log('bundling client + server per page');
  for (const page of PAGES) {
    const [render, jsBundlePath] = await Promise.all([
      bundleServer(page),
      bundleClient(page),
    ]);
    for (const lang of LANGS) {
      const ssrHtml = render(dicts[lang], lang);
      const html = renderHtml({ page, lang, dict: dicts[lang], ssrHtml, jsBundlePath });
      const outRel = urlForPage(page.htmlBase, lang); // e.g. /about.html or /fr/about.html
      const outPath = path.join(distDir, outRel.replace(/^\//, ''));
      mkdirSync(path.dirname(outPath), { recursive: true });
      writeFileSync(outPath, html);
      log('wrote', outRel);
    }
  }

  log('copying assets');
  copyStaticAssets();

  log('writing robots.txt, sitemap.xml, llms.txt');
  writeRobotsTxt();
  writeSitemap();
  writeLlmsTxt(dicts);

  log('cleaning tmp');
  rmSync(tmpDir, { recursive: true, force: true });

  log('done');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
