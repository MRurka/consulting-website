/* =================================================================
   CASE STUDY — Company X (anonymous, cash-services business)
   Page-only sections; mounts a CaseStudyApp using shared NavBar/Footer.
   ================================================================= */

const { useState: useStateCS, useEffect: useEffectCS } = React;

/* ---------- Hero ---------- */
function CSHero() {
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 60px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span className="eyebrow">Case study · 2022 — 2024</span>
        </div>

        <h1 className="h-display reveal" data-d="1" style={{ fontSize: 'clamp(56px, 8.5vw, 132px)', marginBottom: 36, maxWidth: '18ch' }}>
          A cash business that<br/>now runs <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>without</em><br/>its owner in the room.
        </h1>

        <div className="cs-meta-grid reveal" data-d="2">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Client</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>Anonymous</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>Cash-based services business</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Engagement</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>Product Consulting</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>2+ years, ongoing iteration</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Approach</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>Custom build</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>App-builder stack · pre-AI era</div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Capabilities</div>
            <div style={{ fontSize: 17, fontWeight: 500 }}>Design · Software · Ops · Growth</div>
            <div style={{ fontSize: 14, color: 'var(--ink-3)', marginTop: 4 }}>End-to-end</div>
          </div>
        </div>
        <style>{`
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
  const stats = [
    { big: '266%', label: 'YoY gross profit growth', sub: 'Profit, not revenue. Year one.' },
    { big: '~99%', label: 'Reduction in theft',      sub: 'Once everything was tracked.' },
    { big: '1 mo', label: 'To first MVP',            sub: 'Discovery → planning → live.' },
    { big: '6 mo', label: 'Owner can be away',       sub: 'Without service degrading.' },
  ];

  return (
    <section style={{ padding: '60px 0 110px' }}>
      <div className="wrap">
        <div className="reveal cs-stats-panel" data-d="1">
          <div className="cs-stats-panel-header">
            <div className="eyebrow" style={{ color: 'var(--accent)' }}>What changed</div>
          </div>
          <div className="cs-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="cs-stat">
                <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(40px, 4.6vw, 68px)', letterSpacing: '-0.04em', lineHeight: 0.9, color: 'var(--accent)', marginBottom: 14 }}>{s.big}</div>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(15px, 1.2vw, 18px)', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{s.sub}</div>
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
  const symptoms = [
    'Whenever the owner left town, service degraded',
    'Revenue shrank during every absence',
    'Theft was a constant tax on the business',
    'A patchwork of paper, spreadsheets, and unfinished software',
    'No buy-it-now product on the market fit how the business actually ran',
  ];
  return (
    <section style={{ padding: '0 0 110px' }}>
      <div className="wrap">
        <div className="cs-twocol">
          <div className="reveal" style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>(01) The starting point</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              A healthy<br/>business with<br/>a <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>fragile</em><br/>backbone.
            </h2>
          </div>
          <div>
            <p className="reveal" style={{ fontSize: 'clamp(20px, 1.6vw, 24px)', lineHeight: 1.45, marginBottom: 28, color: 'var(--ink)', fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-0.01em' }}>
              The business was profitable. The owner was experienced. But the operation only worked when he was physically present.
            </p>
            <p className="reveal" data-d="1" style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 32 }}>
              It's a cash-based services business — the kind that has been around for decades, with real customers and steady demand. Strong years had happened. But every time he stepped away for travel, even for a few weeks, things slowly came apart. Service quality slipped. Revenue softened. He'd come home and spend weeks pulling it back together.
            </p>

            <div className="reveal" data-d="2" style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginBottom: 32 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Symptoms we mapped</div>
              <ul style={{ listStyle: 'none', display: 'grid', gap: 14 }}>
                {symptoms.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 16, color: 'var(--ink)', lineHeight: 1.5 }}>
                    <span style={{ marginTop: 9, width: 14, flexShrink: 0, height: 1, background: 'var(--accent)' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
        <style>{`
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
  return (
    <section style={{ padding: '40px 0 110px', background: 'var(--accent)', color: 'var(--accent-ink)' }}>
      <div className="wrap" style={{ paddingTop: 80 }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18, color: 'rgba(244,241,236,0.55)' }}>(02) The approach</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 6vw, 88px)', maxWidth: '20ch' }}>
            Why we chose to <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-ink)' }}>build</em>,<br/>not <span style={{ color: 'var(--bg-1)' }}>buy</span>.
          </h2>
        </div>

        <div className="cs-buyvbuild">
          <div className="reveal">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)', marginBottom: 20 }}>
              The buy path
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)', marginBottom: 18, fontWeight: 500, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 4 }}>
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6.5 6.5l9 9M15.5 6.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span>We surveyed the market. Every off-the-shelf tool we found either solved 30–50% of the problem, or it asked the business to bend around the software.</span>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)' }}>
              Because of the specifics of how this operation runs, no SaaS product could scale to the long-term need without major compromise. The cost of bending the business to fit the tool would have been higher than the cost of building.
            </p>
          </div>

          <div className="reveal" data-d="2">
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)', marginBottom: 20 }}>
              The build path
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)', marginBottom: 18, fontWeight: 500, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 4 }}>
                <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.4" />
                <path d="M6 11.5l3.5 3.5L16 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Build something custom on a sophisticated app-builder stack — fast enough to ship in weeks, flexible enough to evolve for years. <em style={{ fontStyle: 'normal', opacity: 0.7, fontWeight: 400 }}>(This was pre-AI — no shortcuts; just deliberate design and disciplined iteration)</em></span>
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(244,241,236,0.78)' }}>
              The app-builder layer let us avoid the cost of a full custom engineering team while keeping the freedom to design exactly what the business needed. The owner kept ownership. We kept the iteration speed.
            </p>
          </div>
        </div>

        <style>{`
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
  const phases = [
    {
      tag: 'Weeks 1–4',
      title: 'Discovery, planning, MVP',
      body: 'Mapped the business end-to-end and identified the biggest levers, plus the foundational pieces that had to be right for the next two years — particularly data design and integrity. We started where the lifeblood was: order tracking and the movement of money — by who, when, and for what. The first MVP shipped in one month.',
      out: 'First MVP live · 30 days',
    },
    {
      tag: 'Months 2–6',
      title: 'Stop the leak',
      body: 'Closed the gaps theft was hiding in — every transaction, adjustment, and shift now visible and reconciled. For the first time, the business had reliable cash-flow visibility without guesswork or hours per day on paper and spreadsheets.',
      out: 'Theft drops sharply',
    },
    {
      tag: 'Months 6–12',
      title: 'Run the business from the system',
      body: 'Order management, payroll, customer loyalty, finance history, and scheduling — moved off of side tools and into one place. Layered in service ratings and a rewards program for top performers, which lifted both retention and the level of service the team delivered.',
      out: '266% YoY gross profit · Year 1',
    },
    {
      tag: 'Year 2 → today',
      title: 'Graduating to custom code',
      body: 'After two years on the app-builder stack, we had validated every business case, workflow, and automation. We always knew the long game would be a custom-coded core for scalability cases the app builder couldn’t cover — we just wanted certainty before taking that bet. With the playbook proven, I designed and led a developer team to rebuild the core platform on custom code. The business runs on it today, and is still thriving.',
      out: 'Custom platform live · still in use',
    },
  ];

  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>(03) The work</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            One month to MVP.<br/>Two years of <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>compounding</em>.
          </h2>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {phases.map((p, i) => (
            <div key={i} className="cs-phase reveal" data-d={(i % 4) + 1}>
              <div className="cs-phase-tag">
                <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: 'var(--accent)' }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)' }}>
                  {p.tag}
                </span>
              </div>
              <div className="cs-phase-body">
                <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(26px, 2.6vw, 38px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 24, maxWidth: '52ch' }}>
                  {p.body}
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-2)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)' }} />
                  Outcome · {p.out}
                </div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
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
  const surfaces = [
    { n: '01', title: 'Order management', body: 'Every order, every adjustment, every status — captured and visible.' },
    { n: '02', title: 'Payroll', body: 'Hours, rates, and pay flowing through the same system that runs operations.' },
    { n: '03', title: 'Customer loyalty', body: 'Repeat-customer program tuned over time, built into the daily flow.' },
    { n: '04', title: 'Finance history', body: 'Years of clean transactional history — no more reconstructing from receipts.' },
    { n: '05', title: 'Analytics dashboards', body: 'The owner sees what is happening today, this week, this quarter — without asking anyone.' },
    { n: '06', title: 'Smart scheduling', body: 'Built to reduce no-shows and optimize utilization — fewer empty slots, fewer last-minute scrambles.' },
    { n: '07', title: 'Staff performance', body: 'Service ratings, rewards for top performers, and clear baselines that surface who needs coaching.' },
  ];
  return (
    <section style={{ padding: '0 0 110px', background: 'var(--bg-2)' }}>
      <div className="wrap" style={{ paddingTop: 110 }}>
        <div className="reveal" style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>(04) The system today</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              Seven surfaces.<br/>One operating layer.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '34ch' }}>
            What started as a single MVP now runs nearly every part of the business.
          </p>
        </div>

        <div className="cs-surfaces">
          {surfaces.map((s, i) => (
            <div key={i} className="cs-surface reveal" data-d={(i % 3) + 1}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.n}</span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(20px, 1.7vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12, textWrap: 'balance' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55 }}>{s.body}</p>
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
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56, maxWidth: 900 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>(05) The outcome</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 104px)', textWrap: 'balance' }}>
            The business runs<br/>whether he's there<br/>or <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>not.</em>
          </h2>
        </div>

        <div className="cs-outcome-grid">
          <p className="reveal" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', lineHeight: 1.55, color: 'var(--ink-2)' }}>
            One year in, gross profit had grown 266% — not revenue, profit. Theft had effectively disappeared because every cash movement was reconciled in the system. With service ratings, rewards for top performers, and clear coaching baselines, retention climbed and the level of service rose with it.
          </p>
          <p className="reveal" data-d="1" style={{ fontSize: 'clamp(18px, 1.4vw, 22px)', lineHeight: 1.55, color: 'var(--ink-2)' }}>
            Two years in, the owner can leave the business for months without anything changing. The system holds. The team holds. Revenue holds. He travels, returns, and the business is exactly where he left it — sometimes better.
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
            "I don't deliver software. I deliver businesses that don't fall apart when the owner walks out of the room."
          </p>
        </div>

        <style>{`
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
          <div className="eyebrow" style={{ marginBottom: 20, color: 'rgba(244,241,236,0.5)' }}>(06) Sound familiar?</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28, color: 'var(--bg)' }}>
            If your business<br/>only works when<br/>you're in the room —<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>let's talk.</em>
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(244,241,236,0.78)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            30 minutes, no pitch. You tell me what's going on. I tell you if I think I can help.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '18px 28px' }}>
              Book a free intro call <span className="arr">→</span>
            </button>
            <a href="services.html" className="btn btn--ghost" style={{ borderColor: 'rgba(244,241,236,0.5)', color: 'var(--bg)', fontSize: 16, padding: '18px 24px' }}>
              How engagements work <span className="arr">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function CaseStudyApp() {
  const { lang, setLang } = useLang();
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
