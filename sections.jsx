/* Big sections — hero, marquee, services, case study, work grid, footer */
import React, { useState, useEffect } from 'react';
import { useT, useLang, T } from './i18n.jsx';
import { MobileCarousel } from './carousel.jsx';

export function availabilityLabel(now = new Date(), lang = 'en', t = null) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (daysInMonth - day) < 15 ? 2 : 1;
  const m1 = new Date(year, month + offset, 1);
  const m2 = new Date(year, month + offset + 1, 1);
  const locale = lang === 'fr' ? 'fr-CA' : 'en-CA';
  const name = (d) => d.toLocaleString(locale, { month: 'long' });
  // Fallback (no t supplied) — used by anything that imports this util pre-Phase-2.
  if (!t) {
    return m1.getFullYear() === m2.getFullYear()
      ? `Available — ${name(m1)} & ${name(m2)} ${m2.getFullYear()}`
      : `Available — ${name(m1)} ${m1.getFullYear()} & ${name(m2)} ${m2.getFullYear()}`;
  }
  return m1.getFullYear() === m2.getFullYear()
    ? t('availability.same_year', { m1: name(m1), m2: name(m2), year: m2.getFullYear() })
    : t('availability.cross_year', { m1: name(m1), y1: m1.getFullYear(), m2: name(m2), y2: m2.getFullYear() });
}

/* ============ HERO ============ */
export function Hero({ onTalk }) {
  const t = useT();
  const { lang } = useLang();

  // Hold the hero invisible until the portrait + fonts are decoded, then fade the whole section in.
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const imgP = new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = '/assets/michael.webp';
    });
    const fontsP = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    Promise.all([imgP, fontsP]).then(() => {
      if (!cancelled) requestAnimationFrame(() => setHeroReady(true));
    });
    return () => { cancelled = true; };
  }, []);

  const heroFade = {
    opacity: heroReady ? 1 : 0,
    transition: 'opacity 0.7s cubic-bezier(.2,.7,.2,1)',
  };

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', ...heroFade }}>
      <div className="wrap hero-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 64, alignItems: 'stretch' }} >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span className="live-dot" aria-hidden/>
            <span className="eyebrow" suppressHydrationWarning>{availabilityLabel(new Date(), lang, t)}</span>
          </div>
          <h1 className="h-display reveal in" style={{ fontSize: 'clamp(44px, 6.8vw, 104px)', fontFamily: undefined }}>
            <T id="home.hero.h1" />
          </h1>
          <div style={{ marginTop: 48 }}>
            <p style={{ fontSize: 'clamp(22px, 1.9vw, 28px)', maxWidth: '40ch', color: 'var(--ink)', marginBottom: 28, fontFamily: 'var(--display)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
              {t('home.hero.sub')}
            </p>
            <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 16, padding: '16px 26px' }}>
              {t('home.hero.cta')} <span className="arr">→</span>
            </button>
          </div>
        </div>
        <div className="hero-split__image" style={{
          backgroundImage: 'image-set(url(/assets/michael.webp) type("image/webp"), url(/assets/michael.jpg) type("image/jpeg"))',
          backgroundSize: 'cover',
          backgroundPosition: '60% 30%',
          aspectRatio: '3 / 4',
          minHeight: 560,
          borderRadius: 10,
        }}/>
      </div>
      <style>{`
        .hero-split h1 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
        @media (max-width: 720px) {
          .hero-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-split__image { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ============ WHAT I DO ============ */
export function WhatIDo() {
  const t = useT();
  const { lang } = useLang();
  const langPrefix = lang === 'fr' ? '/fr' : '';
  const keys = ['cx', 'ops', 'tech', 'growth'];
  const carouselItems = keys.map((k, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: t('home.whatido.' + k + '.title'),
    body: t('home.whatido.' + k + '.body'),
  }));
  return (
    <section id="services" style={{ paddingBottom: 56 }}>
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t('home.whatido.eyebrow')}</div>
            <h2 className="h-section"><T id="home.whatido.heading" /></h2>
          </div>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '38ch' }}>
            {t('home.whatido.lede')}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid var(--line)' }} className="services-grid">
          {keys.map((k, i) => (
            <div key={k} className="service-card reveal" data-d={(i % 4) + 1} style={{
              padding: '40px 32px 40px 0',
              borderBottom: '1px solid var(--line)',
              borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
              paddingLeft: i % 2 === 0 ? 0 : 40,
              paddingRight: i % 2 === 0 ? 40 : 0,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background .3s',
            }}>
              <div style={{ marginBottom: 36 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.025em', fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.1, marginBottom: 16, textWrap: 'balance' }}>
                {t('home.whatido.' + k + '.title')}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '42ch' }}>{t('home.whatido.' + k + '.body')}</p>
            </div>
          ))}
        </div>
        <MobileCarousel items={carouselItems} ariaLabel={t('home.whatido.eyebrow')} />
        <div style={{ marginTop: 56, textAlign: 'center' }} className="reveal" data-d="3">
          <a href={`${langPrefix}/services/`} className="btn btn--ghost" style={{ borderColor: 'var(--ink)', fontSize: 15 }}>
            {t('home.whatido.cta')} <span className="arr">→</span>
          </a>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .services-grid { display: none !important; }
          }
          .service-card:hover h3 { color: var(--accent); }
        `}</style>
      </div>
    </section>
  );
}

/* ============ FEATURED CASE STUDY ============ */
export function FeaturedCaseStudy() {
  const t = useT();
  const { lang } = useLang();
  const langPrefix = lang === 'fr' ? '/fr' : '';
  return (
    <section id="work">
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t('home.work.eyebrow')}</div>
            <h2 className="h-section">{t('home.work.heading')}</h2>
          </div>
        </div>

        <a href={`${langPrefix}/case-study-company-x/`} className="case-card reveal" style={{
          display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
          border: '1px solid var(--line)', borderRadius: 10,
          overflow: 'hidden', background: 'var(--bg-2)',
          transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s',
        }}>
          <div className="case-visual" style={{
            position: 'relative',
            minHeight: 480,
            background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in oklch, var(--accent) 70%, #000) 100%)',
            color: 'var(--accent-ink)',
            padding: 48,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {/* striped placeholder bg */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(244,241,236,0.04) 0 2px, transparent 2px 14px)',
            }}/>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.65)' }}>
              <span>{t('cs.eyebrow')}</span>
              <span>2022 — 2024</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
                <Stat big="266%" small={t('cs.stat.profit.label')} />
                <Stat big="~99%" small={t('cs.stat.theft.label')} />
              </div>
            </div>
          </div>
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 480 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px, 2.8vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 24, textWrap: 'balance' }}>
                {t('home.work.card.title')}
              </h3>
              <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 18 }}>
                <T id="home.work.card.problem" />
              </p>
              <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                <T id="home.work.card.work" />
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>{t('home.work.card.readmore')}</span>
              <span className="arr-pill" aria-hidden>→</span>
            </div>
          </div>
        </a>
        <style>{`
          .case-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(20,17,13,0.18); }
          @media (max-width: 860px) {
            .case-card { grid-template-columns: 1fr !important; }
            .case-visual { min-height: 320px !important; padding: 32px !important; }
            .case-card > div:last-child { padding: 32px !important; min-height: auto !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Stat({ big, small }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(40px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.035em' }}>{big}</div>
      <div style={{ fontSize: 12, marginTop: 6, color: 'rgba(244,241,236,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{small}</div>
    </div>
  );
}

/* ============ FOOTER ============ */
export function Footer({ onTalk, hideCta = false }) {
  const t = useT();
  const { lang } = useLang();
  const langPrefix = lang === 'fr' ? '/fr' : '';
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bg)', padding: hideCta ? '40px 0' : '120px 0 40px', position: 'relative' }}>
      <div className="wrap">
        {!hideCta && (
        <div className="reveal" style={{ marginBottom: 88 }}>
          <h2 className="h-display footer-cta-h2" style={{ fontSize: 'clamp(56px, 10vw, 168px)', color: 'var(--bg)', marginBottom: 40 }}>
            <T id="footer.cta.heading" />
          </h2>
          <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '20px 32px' }}>
            {t('footer.cta.button')} <span className="arr">→</span>
          </button>
        </div>
        )}
        <div style={{
          paddingTop: 40,
          borderTop: '1px solid rgba(244,241,236,0.15)',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40,
          fontSize: 14,
        }} className="foot-grid">
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Michael Rurka</div>
            <div style={{ color: 'rgba(244,241,236,0.55)', maxWidth: '28ch' }}>
              <T id="footer.tagline" />
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(244,241,236,0.4)', marginBottom: 14 }}>{t('footer.col.site')}</div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
              <li><a href={`${langPrefix}/services/`} style={{ color: 'rgba(244,241,236,0.85)' }}>{t('nav.services')}</a></li>
              <li><a href={`${langPrefix}/about/`} style={{ color: 'rgba(244,241,236,0.85)' }}>{t('nav.about')}</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(244,241,236,0.4)', marginBottom: 14 }}>{t('footer.col.reach')}</div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
              <li><a href="mailto:michaelrurka91@gmail.com" style={{ color: 'rgba(244,241,236,0.85)' }}>michaelrurka91@gmail.com</a></li>
              <li><a href="https://www.linkedin.com/in/michaelrurka/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(244,241,236,0.85)' }}>{t('footer.linkedin')}</a></li>
            </ul>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.45)', textAlign: 'right' }}>
            <div>© {new Date().getFullYear()} Michael Rurka</div>
            <div style={{ marginTop: 4 }}>{t('footer.location')}</div>
          </div>
        </div>
        <style>{`
          .footer-cta-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent-ink); opacity: 0.55; }
          @media (max-width: 860px) { .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } .foot-grid > div:last-child { text-align: left !important; } }
        `}</style>
      </div>
    </footer>
  );
}

