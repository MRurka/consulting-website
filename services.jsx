/* =================================================================
   SERVICES PAGE — michaelrurka.com/services
   Lead with the differentiator: outcome-first, not delivery-first.
   ================================================================= */

const { useState: useStateSvc, useEffect: useEffectSvc } = React;

/* ---------- Hero ---------- */
function ServicesHero({ onTalk }) {
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">Services</div>
        </div>
        <h1 className="h-display reveal" data-d="1" style={{ fontSize: 'clamp(64px, 10vw, 168px)', marginBottom: 36 }}>
          Here's how<br/>we work <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>together</em>.
        </h1>
      </div>
    </section>
  );
}

/* ---------- Philosophy: outcome vs delivery ---------- */
function Philosophy() {
  const rows = [
    { left: 'Scope a deliverable — website, app, strategy doc',  right: 'Scope an outcome — more customers, lower churn, faster ops' },
    { left: 'Deliver the thing, invoice, move on',                right: 'Stay until the outcome is real — measure, adjust, iterate' },
    { left: "You maintain whatever gets built",                   right: "You own the result — the tool is a means, not the point" },
    { left: 'Fixed scope, regardless of whether it works',        right: 'We choose the best path together, not the most billable one' },
  ];
  return (
    <section style={{ padding: '40px 0 110px', background: 'var(--accent)', color: 'var(--accent-ink)' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64, paddingTop: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 18, color: 'rgba(244,241,236,0.55)' }}>(01) The philosophy</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(44px, 6.4vw, 96px)', maxWidth: '14ch' }}>
            <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>Outcome</em>-first.<br/>Not delivery-first.
          </h2>
        </div>

        <div className="phil-table">
          <div className="phil-head">
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(244,241,236,0.5)' }}>
              Most consultants
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-ink)' }}>
              How I work
            </span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="phil-row reveal" data-d={(i % 3) + 1}>
              <div className="phil-cell phil-cell--left">
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(244,241,236,0.4)', marginRight: 8 }}>0{i + 1}</span>
                {r.left}
              </div>
              <div className="phil-cell phil-cell--right">
                <span style={{ marginRight: 12, color: 'rgba(244,241,236,0.5)' }}>→</span>
                {r.right}
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
            "I won't take your money to build a website, platform, or app if I don't believe it will deliver the outcome you're after. Tech is a lever. The outcome is the point."
          </p>
        </div>

        <style>{`
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
function Engagements({ onTalk }) {
  const models = [
    {
      label: 'Consulting',
      head: 'Scoped and clean.',
      body: 'Day or week rates. Best for a specific problem or something specific to ship. Low commitment, fast clarity. A great starting point that often leads to deeper work.',
    },
    {
      label: 'Retainer + % of impact',
      head: 'Skin in the game.',
      body: 'I embed with your team. My upside is tied to the results we create together. Medium-term, fully accountable.',
    },
    {
      label: 'Retainer + equity',
      head: 'Full partnership.',
      body: "Long-horizon alignment. For operators ready to go deep and build something together — where I'm sharing in the upside alongside you.",
    },
  ];
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>(02) Engagement models</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
              Three ways to<br/>work together.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', maxWidth: '38ch' }}>
            We pick whichever shape fits the work. Most engagements start small and grow. I only work with two or three clients at a time — so fit matters before format.
          </p>
        </div>

        <div className="engage-grid">
          {models.map((m, i) => (
            <div key={i} className="engage-card reveal" data-d={(i % 3) + 1}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-3)', marginBottom: 28 }}>
                <span style={{ marginRight: 10 }}>0{i + 1}</span> {m.label}
              </div>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px, 2.8vw, 40px)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 20, textWrap: 'balance' }}>
                {m.head}
              </div>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                {m.body}
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
  const items = [
    {
      num: '01', title: 'Customer Experience Design',
      body: 'How your customers find you, book with you, pay you, and come back. I redesign the experience end-to-end so it works for you and feels right for them.',
      bullets: ['Customer journey & onboarding', 'Booking, ordering, payment flows', 'Site & storefront design', 'Brand expression in product'],
    },
    {
      num: '02', title: 'Operations & Process',
      body: 'Where is the friction? Where are you paying for something that could run itself? I map it, redesign it, and help automate what is costing you time and money.',
      bullets: ['Process mapping & teardown', 'Workflow redesign', 'Automation (no/low-code first)', 'Team handoffs & ownership'],
    },
    {
      num: '03', title: 'Software & Tech Implementation',
      body: 'The right tools, connected properly, actually adopted by the team. Selection, configuration, implementation — no bloat, no platform you regret in 18 months.',
      bullets: ['Tool selection (POS, CRM, ops)', 'Stack architecture', 'Custom build when justified', 'Training & adoption'],
    },
    {
      num: '04', title: 'Growth & Expansion Strategy',
      body: 'Pricing, retention, new markets, new revenue lines. Data-backed decisions, not gut-feel. We measure what is working, double down, and cut what is not.',
      bullets: ['Pricing & packaging', 'Retention & lifecycle', 'New revenue lines', 'Geographic expansion'],
    },
  ];
  return (
    <section style={{ padding: '0 0 110px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>(03) What I actually do</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            Four capabilities,<br/>one operator.
          </h2>
        </div>

        <div className="cap-grid">
          {items.map((it, i) => (
            <div key={i} className="cap-card reveal" data-d={(i % 4) + 1}>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{it.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.025em', fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.1, marginBottom: 18, textWrap: 'balance' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                {it.body}
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

/* ---------- How an engagement works (4 steps) ---------- */
function Process() {
  const steps = [
    {
      n: '01', title: 'Free 30-min intro call',
      body: 'You describe the business and the problem. I ask questions. No pitch.',
      out: 'A clear sense of fit',
    },
    {
      n: '02', title: 'Written proposal',
      body: 'A set of approaches, not a fixed deliverable. We choose the path together based on what is most likely to produce the outcome.',
      out: 'Defined success metric',
    },
    {
      n: '03', title: 'We execute',
      body: 'I come in and do the work, alongside your team or independently depending on what is needed.',
      out: 'Real changes shipped',
    },
    {
      n: '04', title: 'We measure and adjust',
      body: 'We define success upfront, track it, and adjust the approach if something is not working. Outcomes do not happen on the first try. That is normal. We stay in it.',
      out: 'Outcome delivered',
    },
  ];
  return (
    <section style={{ padding: '0 0 110px', background: 'var(--bg-2)' }}>
      <div className="wrap" style={{ paddingTop: 110 }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>(04) How a typical engagement works</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            Four steps.<br/>No surprises.
          </h2>
        </div>

        <div className="proc-grid">
          {steps.map((s, i) => (
            <div key={i} className="proc-step reveal" data-d={(i % 4) + 1}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 'clamp(64px, 8vw, 120px)', letterSpacing: '-0.05em', lineHeight: 0.85, color: 'var(--accent)' }}>
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Next →
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14, textWrap: 'balance' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 22 }}>
                {s.body}
              </p>
              <div style={{ paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)' }} />
                Outcome · {s.out}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .proc-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
          }
          .proc-step {
            padding: 32px 28px;
            background: var(--bg);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            min-height: 320px;
          }
          @media (max-width: 980px) { .proc-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 600px) { .proc-grid { grid-template-columns: 1fr; gap: 16px; } }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Good fit / Not a fit ---------- */
function FitCheck() {
  const fit = [
    'You own or operate the business',
    'Revenue is real, and so are the problems',
    "You've outgrown the tools and processes you started with",
    "You know something's being left on the table, but don't know where to start",
  ];
  const notFit = [
    'Pre-revenue or idea-stage',
    'Looking for a full-time hire',
    'Pure SaaS startups (not my focus right now)',
    'Looking for someone to just build or execute',
  ];
  return (
    <section style={{ padding: '110px 0' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>(04) Fit check</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
            Honest before<br/>the call.
          </h2>
        </div>

        <div className="fit-grid">
          <div className="fit-col reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink)' }}>Good fit</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 18 }}>
              {fit.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 17, color: 'var(--ink)', lineHeight: 1.45 }}>
                  <span style={{ marginTop: 8, width: 16, flexShrink: 0, height: 1, background: 'var(--accent)' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="fit-col reveal" data-d="2">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'transparent', border: '1px solid var(--ink-3)' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)' }}>Not a fit</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 18 }}>
              {notFit.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 17, color: 'var(--ink-3)', lineHeight: 1.45 }}>
                  <span style={{ marginTop: 8, width: 16, flexShrink: 0, height: 1, background: 'var(--ink-3)' }} />
                  {f}
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
          <div className="eyebrow" style={{ marginBottom: 20, color: 'rgba(244,241,236,0.5)' }}>Let's talk</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28, color: 'var(--bg)' }}>
            Sound like<br/>a fit?
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(244,241,236,0.78)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            30 minutes, no pitch. You tell me what's going on in the business. I tell you if I can help.
          </p>
          <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '18px 28px' }}>
            Book a free intro call <span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function ServicesAppRoot() {
  const [lang, setLang] = useStateSvc(() => {
    try { return localStorage.getItem('mr_lang') || 'en'; } catch { return 'en'; }
  });
  useEffectSvc(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('mr_lang', lang); } catch {}
  }, [lang]);
  useReveal();

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="services" />
      <main>
        <ServicesHero onTalk={onTalk} />
        <Philosophy />
        <Engagements onTalk={onTalk} />
        <Capabilities />
        <FitCheck />
        <ServicesClose onTalk={onTalk} />
      </main>
      <Footer onTalk={onTalk} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ServicesAppRoot />);
