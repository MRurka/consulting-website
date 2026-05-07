/* =================================================================
   SERVICES PAGE — michaelrurka.com/services
   Lead with the differentiator: outcome-first, not delivery-first.
   ================================================================= */
import React from 'react';
import { useT, useLang, usePageTitle, T } from './i18n.jsx';
import { useReveal, NavBar } from './components.jsx';
import { Footer } from './sections.jsx';

/* ---------- Hero ---------- */
function ServicesHero() {
  const t = useT();
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">{t('nav.services')}</div>
        </div>
        <h1 className="h-display services-h1 reveal" data-d="1" style={{ fontSize: 'clamp(64px, 10vw, 168px)', marginBottom: 36 }}>
          <T id="services.hero.h1" />
        </h1>
      </div>
      <style>{`
        .services-h1 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
      `}</style>
    </section>
  );
}

/* ---------- Philosophy: outcome vs delivery ---------- */
function Philosophy() {
  const t = useT();
  const rowKeys = ['scope', 'deliver', 'maintain', 'fixed'];
  return (
    <section style={{ padding: '40px 0 110px', background: 'var(--accent)', color: 'var(--accent-ink)' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64, paddingTop: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 18, color: 'rgba(244,241,236,0.55)' }}>{t('services.phil.eyebrow')}</div>
          <h2 className="h-section services-phil-h2" style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '14ch' }}>
            <T id="services.phil.heading" />
          </h2>
        </div>

        <div className="phil-table">
          <div className="phil-head">
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(244,241,236,0.5)' }}>
              {t('services.phil.col.consultants')}
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)' }}>
              {t('services.phil.col.me')}
            </span>
          </div>
          {rowKeys.map((k, i) => (
            <div key={k} className="phil-row reveal" data-d={(i % 3) + 1}>
              <div className="phil-cell phil-cell--left">
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,241,236,0.4)', marginRight: 8 }}>0{i + 1}</span>
                {t('services.phil.row.' + k + '.left')}
              </div>
              <div className="phil-cell phil-cell--right">
                <span style={{ marginRight: 12, color: 'rgba(244,241,236,0.5)' }}>→</span>
                {t('services.phil.row.' + k + '.right')}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{
          marginTop: 64,
          padding: 'clamp(40px, 5vw, 72px)',
          borderLeft: '3px solid var(--accent-ink)',
          maxWidth: 920,
        }}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 3.4vw, 52px)', lineHeight: 1.2, letterSpacing: '-0.015em', color: 'var(--accent-ink)' }}>
            {t('services.phil.quote')}
          </p>
        </div>

        <style>{`
          .services-phil-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
          .phil-table {
            border-top: 1px solid rgba(244,241,236,0.18);
          }
          .phil-head, .phil-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
            padding: 22px 0;
            border-bottom: 1px solid rgba(244,241,236,0.18);
          }
          .phil-head { padding: 16px 0; }
          .phil-cell {
            font-size: clamp(16px, 1.3vw, 19px);
            line-height: 1.45;
          }
          .phil-cell--left {
            color: rgba(244,241,236,0.45);
            text-decoration: line-through;
            text-decoration-color: rgba(244,241,236,0.3);
            text-decoration-thickness: 1px;
          }
          .phil-cell--right {
            color: var(--accent-ink);
            font-weight: 500;
          }
          @media (max-width: 760px) {
            .phil-head, .phil-row {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Engagement models ---------- */
function Engagements() {
  const t = useT();
  const keys = ['consulting', 'retainer', 'equity'];
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t('services.engage.eyebrow')}</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              <T id="services.engage.heading" />
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '38ch' }}>
            {t('services.engage.lede')}
          </p>
        </div>

        <div className="engage-grid">
          {keys.map((k, i) => (
            <div key={k} className="engage-card reveal" data-d={(i % 3) + 1}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 28 }}>
                <span style={{ marginRight: 10 }}>0{i + 1}</span> {t('services.engage.' + k + '.label')}
              </div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px, 2.8vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 20, textWrap: 'balance' }}>
                {t('services.engage.' + k + '.head')}
              </div>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                {t('services.engage.' + k + '.body')}
              </p>
            </div>
          ))}
        </div>
        <style>{`
          .engage-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-top: 1px solid var(--line);
          }
          .engage-card {
            display: flex;
            flex-direction: column;
            padding: 48px 36px 40px;
            border-bottom: 1px solid var(--line);
            border-right: 1px solid var(--line);
            min-height: 360px;
            background: var(--bg);
            transition: background .25s;
          }
          .engage-card:last-child { border-right: none; }
          @media (max-width: 980px) {
            .engage-grid { grid-template-columns: 1fr; }
            .engage-card { border-right: none; min-height: 0; padding: 36px 0; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- What I actually do (capabilities, expanded) ---------- */
function Capabilities() {
  const t = useT();
  const keys = ['cx', 'ops', 'tech', 'growth'];
  return (
    <section style={{ padding: '0 0 110px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t('services.cap.eyebrow')}</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            <T id="services.cap.heading" />
          </h2>
        </div>

        <div className="cap-grid">
          {keys.map((k, i) => (
            <div key={k} className="cap-card reveal" data-d={(i % 4) + 1}>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.025em', fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' }}>
                {t('services.cap.' + k + '.title')}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                {t('services.cap.' + k + '.body')}
              </p>
            </div>
          ))}
        </div>
        <style>{`
          .cap-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
            border-top: 1px solid var(--line);
          }
          .cap-card {
            padding: 40px 32px 40px 0;
            border-bottom: 1px solid var(--line);
            border-right: 1px solid var(--line);
            transition: background .25s;
          }
          .cap-card:nth-child(2n) { padding-left: 40px; padding-right: 0; border-right: none; }
          .cap-card:nth-child(2n+1) { padding-left: 0; padding-right: 40px; }
          .cap-card:hover h3 { color: var(--accent); }
          @media (max-width: 760px) {
            .cap-grid { grid-template-columns: 1fr !important; }
            .cap-card { border-right: none !important; padding: 32px 0 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Good fit / Not a fit ---------- */
function FitCheck() {
  const t = useT();
  const fitKeys = ['owner', 'revenue', 'outgrown', 'unsure'];
  const notFitKeys = ['prerev', 'fulltime', 'saas', 'execute'];
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t('services.fit.eyebrow')}</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            <T id="services.fit.heading" />
          </h2>
        </div>

        <div className="fit-grid">
          <div className="fit-col reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>{t('services.fit.good')}</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 18 }}>
              {fitKeys.map(k => (
                <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 17, color: 'var(--ink)', lineHeight: 1.45 }}>
                  <span style={{ marginTop: 8, width: 16, flexShrink: 0, height: 1, background: 'var(--accent)' }} />
                  {t('services.fit.good.' + k)}
                </li>
              ))}
            </ul>
          </div>

          <div className="fit-col reveal" data-d="2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'transparent', border: '1px solid var(--ink-3)' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)' }}>{t('services.fit.not')}</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 18 }}>
              {notFitKeys.map(k => (
                <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 17, color: 'var(--ink-3)', lineHeight: 1.45 }}>
                  <span style={{ marginTop: 8, width: 16, flexShrink: 0, height: 1, background: 'var(--ink-3)' }} />
                  {t('services.fit.not.' + k)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <style>{`
          .fit-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
          @media (max-width: 760px) {
            .fit-grid { grid-template-columns: 1fr; gap: 48px; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */
function ServicesClose({ onTalk }) {
  const t = useT();
  return (
    <section style={{ padding: '0 0 140px' }}>
      <div className="wrap">
        <div className="reveal" style={{
          background: 'var(--ink)',
          color: 'var(--bg)',
          borderRadius: 12,
          padding: 'clamp(48px, 6vw, 96px)',
          textAlign: 'center',
        }}>
          <div className="eyebrow" style={{ marginBottom: 20, color: 'rgba(244,241,236,0.5)' }}>{t('nav.cta')}</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28, color: 'var(--bg)' }}>
            <T id="services.close.heading" />
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(244,241,236,0.78)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            {t('services.close.lede')}
          </p>
          <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '18px 28px' }}>
            {t('home.hero.cta')} <span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
export default function ServicesAppRoot() {
  const { lang, setLang } = useLang();
  usePageTitle('meta.services.title');
  useReveal();

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="services" />
      <main>
        <ServicesHero />
        <Philosophy />
        <Engagements />
        <Capabilities />
        <FitCheck />
        <ServicesClose onTalk={onTalk} />
      </main>
      <Footer onTalk={onTalk} />
    </>
  );
}

