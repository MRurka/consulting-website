/* =================================================================
   ABOUT PAGE — michaelrurka.com/about
   ================================================================= */

/* ---------- Hero / consolidated bio ---------- */
function AboutHero() {
  const t = useT();
  const now = new Date();
  let yrs = now.getFullYear() - 2013;
  if (now.getMonth() < 6) yrs -= 1;
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">{t('about.hero.eyebrow')}</div>
        </div>

        <h1 className="h-display about-h1 reveal" data-d="1" style={{ fontSize: 'clamp(56px, 8.5vw, 132px)', marginBottom: 56, maxWidth: '18ch' }}>
          <T id="about.hero.h1" />
        </h1>

        <div className="about-bio-grid">
          <div className="reveal" data-d="2" style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{t('about.hero.aside')}</div>
          </div>
          <div>
            <p className="reveal" data-d="2" style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.4, marginBottom: 28, color: 'var(--ink)', letterSpacing: '-0.01em', fontFamily: 'var(--display)', fontWeight: 500, textWrap: 'pretty' }}>
              <T id="about.hero.p1" vars={{ n: yrs }} />
            </p>
            <p className="reveal" data-d="2" style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.4, marginBottom: 28, color: 'var(--ink)', letterSpacing: '-0.01em', fontFamily: 'var(--display)', fontWeight: 500, textWrap: 'pretty' }}>
              {t('about.hero.p2')}
            </p>
            <p className="reveal" data-d="3" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 22 }}>
              {t('about.hero.p3')}
            </p>
            <p className="reveal" data-d="4" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 22 }}>
              {t('about.hero.p4')}
            </p>
            <p className="reveal" data-d="4" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              {t('about.hero.p5')}
            </p>
          </div>
        </div>

        <style>{`
          .about-h1 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
          .about-bio-grid {
            display: grid;
            grid-template-columns: 0.7fr 1.6fr;
            gap: 80px;
            align-items: start;
          }
          @media (max-width: 980px) {
            .about-bio-grid { grid-template-columns: 1fr; gap: 28px; }
            .about-bio-grid > div:first-child { position: static !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Career timeline ---------- */
function AboutCareer() {
  const t = useT();
  const items = [
    { key: 'hb',     period: '2024 — 2026' },
    { key: 'amori',  period: '2024 — 2025' },
    { key: 'cox',    period: '2022 — 2025' },
    { key: 'rr',     period: '2019 — 2022' },
    { key: 'nurx',   period: '2015 — 2018' },
  ];

  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t('about.career.eyebrow')}</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)', marginBottom: 28 }}>
            {t('about.career.heading')}
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '60ch', lineHeight: 1.55 }}>
            {t('about.career.lede')}
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {items.map((it, i) => (
            <div key={it.key} className="career-row reveal" data-d={(i % 3) + 1} style={{
              display: 'grid',
              gridTemplateColumns: '140px 1.4fr 1.2fr 1fr',
              alignItems: 'baseline',
              padding: '32px 0',
              borderBottom: '1px solid var(--line)',
              gap: 28,
            }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                {it.period}
              </span>
              <div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(22px, 2vw, 30px)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
                  {t('about.career.' + it.key + '.co')}
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{t('about.career.' + it.key + '.role')}</div>
              </div>
              <div style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '46ch' }}>
                {t('about.career.' + it.key + '.note')}
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', border: '1px solid var(--line)', padding: '6px 10px', borderRadius: 999 }}>
                  {t('about.career.' + it.key + '.tag')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 32, fontSize: 13, color: 'var(--ink-3)', textAlign: 'right', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {t('about.career.footnote')}
        </div>

        <style>{`
          @media (max-width: 980px) {
            .career-row {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              padding: 28px 0 !important;
            }
            .career-row > div:last-child { text-align: left !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */
function AboutClose({ onTalk }) {
  const t = useT();
  return (
    <section style={{ padding: '80px 0 140px' }}>
      <div className="wrap">
        <div className="reveal" style={{
          background: 'var(--bg-2)',
          borderRadius: 12,
          padding: 'clamp(48px, 6vw, 96px)',
          textAlign: 'center',
          border: '1px solid var(--line)',
        }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>{t('about.close.eyebrow')}</div>
          <h2 className="h-display about-close-h2" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28 }}>
            <T id="about.close.heading" />
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            {t('about.close.lede')}
          </p>
          <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 17, padding: '18px 28px' }}>
            {t('home.hero.cta')} <span className="arr">→</span>
          </button>
        </div>
        <style>{`
          .about-close-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent); }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function AboutApp() {
  const { lang, setLang } = useLang();
  useReveal();

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="about" />
      <main>
        <AboutHero />
        <AboutCareer />
        <AboutClose onTalk={onTalk} />
      </main>
      <Footer onTalk={onTalk} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<I18nProvider><AboutApp /></I18nProvider>);
