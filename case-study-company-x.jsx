/* =================================================================
   CASE STUDY — Company X (anonymous, cash-services business)
   Page-only sections; mounts a CaseStudyApp using shared NavBar/Footer.
   ================================================================= */

/* ---------- Hero ---------- */
function CSHero() {
  const t = useT();
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 60px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="eyebrow">{t('cs.hero.eyebrow')}</span>
        </div>

        <h1 className="h-display cs-h1 reveal" data-d="1" style={{ fontSize: 'clamp(56px, 8.5vw, 132px)', marginBottom: 36, maxWidth: '18ch' }}>
          <T id="cs.hero.h1" />
        </h1>

        <div className="cs-meta-grid reveal" data-d="2">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('cs.meta.client.label')}</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{t('cs.meta.client.value')}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{t('cs.meta.client.sub')}</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('cs.meta.engagement.label')}</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{t('cs.meta.engagement.value')}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{t('cs.meta.engagement.sub')}</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('cs.meta.approach.label')}</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{t('cs.meta.approach.value')}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{t('cs.meta.approach.sub')}</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>{t('cs.meta.cap.label')}</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>{t('cs.meta.cap.value')}</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>{t('cs.meta.cap.sub')}</div>
          </div>
        </div>
        <style>{`
          .cs-h1 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
          .cs-meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            padding-top: 36px;
            border-top: 1px solid var(--line);
          }
          @media (max-width: 860px) { .cs-meta-grid { grid-template-columns: repeat(2, 1fr); gap: 28px; } }
          @media (max-width: 480px) { .cs-meta-grid { grid-template-columns: 1fr; } }
        `}</style>
      </div>
    </section>
  );
}


/* ---------- Headline stats — framed section ---------- */
function CSStats() {
  const t = useT();
  const keys = ['profit', 'theft', 'mvp', 'away'];

  return (
    <section style={{ padding: '60px 0 110px' }}>
      <div className="wrap">
        <div className="reveal cs-stats-panel" data-d="1">
          <div className="cs-stats-panel-header">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>{t('cs.stats.eyebrow')}</div>
          </div>
          <div className="cs-stats-grid">
            {keys.map(k => (
              <div key={k} className="cs-stat">
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(40px, 4.6vw, 68px)', letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--accent)', marginBottom: 14 }}>{t('cs.stat.' + k + '.big')}</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(15px, 1.2vw, 18px)', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 6 }}>{t('cs.stat.' + k + '.label')}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{t('cs.stat.' + k + '.sub')}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .cs-stats-panel {
            background: var(--bg-2);
            border-radius: 10px;
            padding: 44px clamp(24px, 4vw, 56px) 48px;
            border-top: 3px solid var(--accent);
          }
          .cs-stats-panel-header {
            display: flex;
            align-items: center;
            gap: 24px;
            margin-bottom: 32px;
          }
          .cs-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 40px 36px;
          }
          @media (max-width: 860px) {
            .cs-stats-panel-header { flex-direction: column; align-items: flex-start; }
            .cs-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px 24px; }
          }
          @media (max-width: 480px) {
            .cs-stats-grid { grid-template-columns: 1fr; }
          }
        `}</style>
      </div>
    </section>
  );
}


/* ---------- Section: The starting point ---------- */
function CSStart() {
  const t = useT();
  const symptomKeys = ['away', 'shrank', 'theft', 'patchwork', 'nofit'];
  return (
    <section style={{ padding: '0 0 110px' }}>
      <div className="wrap">
        <div className="cs-twocol">
          <div className="reveal" style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>{t('cs.start.eyebrow')}</div>
            <h2 className="h-section cs-start-h2" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              <T id="cs.start.heading" />
            </h2>
          </div>
          <div>
            <p className="reveal" style={{ fontSize: 'clamp(20px, 1.6vw, 24px)', lineHeight: 1.45, marginBottom: 28, color: 'var(--ink)', fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-0.01em' }}>
              {t('cs.start.p1')}
            </p>
            <p className="reveal" data-d="1" style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 32 }}>
              {t('cs.start.p2')}
            </p>

            <div className="reveal" data-d="2" style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginBottom: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>{t('cs.start.sympt.eyebrow')}</div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
                {symptomKeys.map(k => (
                  <li key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 16, color: 'var(--ink)', lineHeight: 1.5 }}>
                    <span style={{ marginTop: 9, width: 14, flexShrink: 0, height: 1, background: 'var(--accent)' }} />
                    {t('cs.start.sympt.' + k)}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        <style>{`
          .cs-start-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent); }
          .cs-twocol {
            display: grid;
            grid-template-columns: 1fr 1.4fr;
            gap: 80px;
            align-items: start;
          }
          @media (max-width: 980px) {
            .cs-twocol { grid-template-columns: 1fr; gap: 36px; }
            .cs-twocol > div:first-child { position: static !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Section: Why custom ---------- */
function CSWhyCustom() {
  const t = useT();
  return (
    <section style={{ padding: '40px 0 110px', background: 'var(--accent)', color: 'var(--accent-ink)' }}>
      <div className="wrap" style={{ paddingTop: 80 }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18, color: 'rgba(244,241,236,0.55)' }}>{t('cs.why.eyebrow')}</div>
          <h2 className="h-section cs-why-h2" style={{ fontSize: 'clamp(40px, 6vw, 88px)', maxWidth: '20ch' }}>
            <T id="cs.why.heading" />
          </h2>
        </div>

        <div className="cs-buyvbuild">
          <div className="reveal">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)', marginBottom: 20 }}>
              {t('cs.why.buy.label')}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)', marginBottom: 18, fontWeight: 500, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 4 }}>
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6.5 6.5l9 9M15.5 6.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span>{t('cs.why.buy.lead')}</span>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)' }}>
              {t('cs.why.buy.body')}
            </p>
          </div>

          <div className="reveal" data-d="2">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)', marginBottom: 20 }}>
              {t('cs.why.build.label')}
            </div>
            <p className="cs-why-build-lead" style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)', marginBottom: 18, fontWeight: 500, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 4 }}>
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6 11.5l3.5 3.5L16 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span><T id="cs.why.build.lead" /></span>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)' }}>
              {t('cs.why.build.body')}
            </p>
          </div>
        </div>

        <style>{`
          .cs-why-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent-ink); }
          .cs-why-build-lead em { font-style: normal; opacity: 0.7; font-weight: 400; }
          .cs-buyvbuild {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
            padding-top: 36px;
            border-top: 1px solid rgba(244,241,236,0.18);
          }
          @media (max-width: 860px) {
            .cs-buyvbuild { grid-template-columns: 1fr; gap: 40px; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Section: Timeline ---------- */
function CSTimeline() {
  const t = useT();
  const keys = ['mvp', 'leak', 'system', 'custom'];

  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t('cs.timeline.eyebrow')}</div>
          <h2 className="h-section cs-timeline-h2" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            <T id="cs.timeline.heading" />
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {keys.map((k, i) => (
            <div key={k} className="cs-phase reveal" data-d={(i % 4) + 1}>
              <div className="cs-phase-tag">
                <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: 'var(--accent)' }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)' }}>
                  {t('cs.timeline.' + k + '.tag')}
                </span>
              </div>
              <div className="cs-phase-body">
                <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(26px, 2.6vw, 38px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' }}>
                  {t('cs.timeline.' + k + '.title')}
                </h3>
                <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 24, maxWidth: '52ch' }}>
                  {t('cs.timeline.' + k + '.body')}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-2)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                  {t('cs.timeline.outcome_prefix')} · {t('cs.timeline.' + k + '.out')}
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .cs-timeline-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent); }
          .cs-phase {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 56px;
            padding: 48px 0;
            border-bottom: 1px solid var(--line);
            align-items: start;
          }
          .cs-phase-tag {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          @media (max-width: 860px) {
            .cs-phase { grid-template-columns: 1fr; gap: 24px; padding: 36px 0; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Section: What the system runs today ---------- */
function CSCapabilities() {
  const t = useT();
  const keys = ['order', 'payroll', 'loyalty', 'finance', 'analytics', 'sched', 'staff'];
  return (
    <section style={{ padding: '0 0 110px', background: 'var(--bg-2)' }}>
      <div className="wrap" style={{ paddingTop: 110 }}>
        <div className="reveal" style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>{t('cs.cap.eyebrow')}</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              <T id="cs.cap.heading" />
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '34ch' }}>
            {t('cs.cap.lede')}
          </p>
        </div>

        <div className="cs-surfaces">
          {keys.map((k, i) => (
            <div key={k} className="cs-surface reveal" data-d={(i % 3) + 1}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(20px, 1.7vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12, textWrap: 'balance' }}>
                {t('cs.cap.' + k + '.title')}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55 }}>{t('cs.cap.' + k + '.body')}</p>
            </div>
          ))}
        </div>
        <style>{`
          .cs-surfaces {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            border-top: 1px solid var(--line);
          }
          .cs-surface {
            padding: 36px 32px;
            background: var(--bg);
            border-right: 1px solid var(--line);
            border-bottom: 1px solid var(--line);
            transition: background .25s;
          }
          .cs-surface:nth-child(3n) { border-right: none; }
          .cs-surface:hover h3 { color: var(--accent); }
          @media (max-width: 860px) {
            .cs-surfaces { grid-template-columns: repeat(2, 1fr); }
            .cs-surface { border-right: 1px solid var(--line); }
            .cs-surface:nth-child(3n) { border-right: 1px solid var(--line); }
            .cs-surface:nth-child(2n) { border-right: none; }
          }
          @media (max-width: 480px) {
            .cs-surfaces { grid-template-columns: 1fr; }
            .cs-surface { border-right: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Section: Outcome / pull-quote ---------- */
function CSOutcome() {
  const t = useT();
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56, maxWidth: 900 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>{t('cs.outcome.eyebrow')}</div>
          <h2 className="h-display cs-outcome-h2" style={{ fontSize: 'clamp(48px, 7vw, 104px)', textWrap: 'balance' }}>
            <T id="cs.outcome.heading" />
          </h2>
        </div>

        <div className="cs-outcome-grid">
          <p className="reveal" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {t('cs.outcome.p1')}
          </p>
          <p className="reveal" data-d="1" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {t('cs.outcome.p2')}
          </p>
        </div>

        <div className="reveal" style={{
          marginTop: 80,
          padding: 'clamp(40px, 5vw, 72px)',
          background: 'var(--bg-2)',
          borderRadius: 12,
          borderLeft: '4px solid var(--accent)',
          maxWidth: 1000,
        }}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 3.4vw, 48px)', lineHeight: 1.25, letterSpacing: '-0.015em', color: 'var(--ink)' }}>
            {t('cs.outcome.quote')}
          </p>
        </div>

        <style>{`
          .cs-outcome-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; color: var(--accent); }
          .cs-outcome-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 56px;
          }
          @media (max-width: 860px) {
            .cs-outcome-grid { grid-template-columns: 1fr; gap: 28px; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Section: Closing CTA ---------- */
function CSClose({ onTalk }) {
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
          <div className="eyebrow" style={{ marginBottom: 20, color: 'rgba(244,241,236,0.5)' }}>{t('cs.close.eyebrow')}</div>
          <h2 className="h-display cs-close-h2" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28, color: 'var(--bg)' }}>
            <T id="cs.close.heading" />
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(244,241,236,0.78)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            {t('cs.close.lede')}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '18px 28px' }}>
              {t('home.hero.cta')} <span className="arr">→</span>
            </button>
            <a href="services.html" className="btn btn--ghost" style={{ borderColor: 'rgba(244,241,236,0.5)', color: 'var(--bg)', fontSize: 16, padding: '18px 24px' }}>
              {t('cs.close.cta_secondary')} <span className="arr">→</span>
            </a>
          </div>
        </div>
        <style>{`
          .cs-close-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function CaseStudyApp() {
  const { lang, setLang } = useLang();
  usePageTitle('meta.cs.title');
  useReveal();

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="" />
      <main>
        <CSHero />
        <CSStats />
        <CSStart />
        <CSWhyCustom />
        <CSTimeline />
        <CSCapabilities />
        <CSOutcome />
        <CSClose onTalk={onTalk} />
      </main>
      <Footer onTalk={onTalk} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<I18nProvider><CaseStudyApp /></I18nProvider>);
