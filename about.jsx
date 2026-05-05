/* =================================================================
   ABOUT PAGE — michaelrurka.com/about
   ================================================================= */

const { useState: useStateAbout, useEffect: useEffectAbout } = React;

/* ---------- Hero / consolidated bio ---------- */
function AboutHero() {
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">About</div>
        </div>

        <h1 className="h-display reveal" data-d="1" style={{ fontSize: 'clamp(56px, 8.5vw, 132px)', marginBottom: 56, maxWidth: '18ch' }}>
          I help operators<br/>get the growth layer<br/>their business <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>deserves</em>.
        </h1>

        <div className="about-bio-grid">
          <div className="reveal" data-d="2" style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>The short version</div>
          </div>
          <div>
            <p className="reveal" data-d="2" style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.4, marginBottom: 28, color: 'var(--ink)', letterSpacing: '-0.01em', fontFamily: 'var(--display)', fontWeight: 500, textWrap: 'pretty' }}>
              I'm Michael. I've spent <span className="years-in-tech">13</span> years hands-on in tech — designing customer experiences, building product strategy, and shipping software inside high-growth startups across North America.
            </p>
            <p className="reveal" data-d="2" style={{ fontSize: 'clamp(22px, 2vw, 30px)', lineHeight: 1.4, marginBottom: 28, color: 'var(--ink)', letterSpacing: '-0.01em', fontFamily: 'var(--display)', fontWeight: 500, textWrap: 'pretty' }}>
              Now I work independently with owner-operators who are profitable and ready to grow, but don't have the in-house capability to make it happen.
            </p>
            <p className="reveal" data-d="3" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 22 }}>
              My engagements range from scoped consulting to retained partnerships to equity arrangements — depending on the fit. I only work with two or three clients at a time, so fit matters: I want to be deep in the work, not spread thin across it. The businesses I'm drawn to have real customers, real cash flow, and meaningful upside still on the table — usually through better operations, smarter systems, and growth strategies they just haven't had the right partner to pursue yet.
            </p>
            <p className="reveal" data-d="4" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', marginBottom: 22 }}>
              I work in English and French — comfortable running engagements, presentations, and discovery sessions in either.
            </p>
            <p className="reveal" data-d="4" style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)' }}>
              Outside of work: I'm obsessed with my garden, feeding the bees, and strolling in nature 🌱
            </p>
          </div>
        </div>

        <style>{`
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
  const timeline = [
    {
      co: 'HiringBranch', period: '2024 — 2026', role: 'Director of Product',
      note: 'Led full platform redesign and rebuild; drove transformation to empowered product model.',
      tag: 'Series A',
    },
    {
      co: 'Amori', period: '2024 — 2025', role: 'Co-Founder · Advisory',
      note: 'Co-founded; advised on tech stack, GTM, analytics.',
      tag: 'Co-founded',
    },
    {
      co: 'Company X (anonymous)', period: '2022 — 2025', role: 'Product Consultant',
      note: '~99% reduction in theft. 266% YoY gross profit growth. End-to-end custom operating system.',
      tag: 'Consulting',
    },
    {
      co: 'RenoRun', period: '2019 — 2022', role: 'Lead Designer → Product Manager',
      note: 'Seed → $142M Series B. Led design system, ecom build, supply/pricing product strategy.',
      tag: 'Series B · $142M',
    },
    {
      co: 'Nurx', period: '2015 — 2018', role: 'Lead Designer',
      note: 'Seed (Y Combinator) → $36M Series B. Designed full app, operations console, scaled from 1 to 14+ states. Acquired by Thirty Madison in 2022 — which was acquired by Remedy Meds in 2025.',
      tag: 'YC · Series B · $36M',
    },
  ];

  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>Career</div>
          <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)', marginBottom: 28 }}>
            Where I've been.
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '60ch', lineHeight: 1.55 }}>
            Five companies. Just over $200M in venture financing raised by the products and teams I helped build. Now putting that experience to work for owner-operators.
          </p>
        </div>

        <div style={{ borderTop: '1px solid var(--line)' }}>
          {timeline.map((t, i) => (
            <React.Fragment key={i}>
              <div className="career-row reveal" data-d={(i % 3) + 1} style={{
                display: 'grid',
                gridTemplateColumns: '140px 1.4fr 1.2fr 1fr',
                alignItems: 'baseline',
                padding: '32px 0',
                borderBottom: '1px solid var(--line)',
                gap: 28,
              }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {t.period}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(22px, 2vw, 30px)', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 8 }}>
                    {t.co}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{t.role}</div>
                </div>
                <div style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '46ch' }}>
                  {t.note}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-3)', border: '1px solid var(--line)', padding: '6px 10px', borderRadius: 999 }}>
                    {t.tag}
                  </span>
                </div>
              </div>
              {t.milestone && (
                <div className="career-milestone reveal" style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  gap: 28,
                  padding: '14px 0 18px',
                  borderBottom: '1px solid var(--line)',
                  background: 'var(--bg-2)',
                }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 0, alignSelf: 'center' }}>
                    ↳ Milestone
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--ink-2)', fontStyle: 'italic', alignSelf: 'center' }}>
                    {t.milestone}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 32, fontSize: 13, color: 'var(--ink-3)', textAlign: 'right', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Earlier roles omitted for relevance
        </div>

        <style>{`
          @media (max-width: 980px) {
            .career-row {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              padding: 28px 0 !important;
            }
            .career-row > div:last-child { text-align: left !important; }
            .career-milestone { grid-template-columns: 1fr !important; padding: 12px 16px !important; gap: 6px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */
function AboutClose({ onTalk }) {
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
          <div className="eyebrow" style={{ marginBottom: 20 }}>Let's talk</div>
          <h2 className="h-display" style={{ fontSize: 'clamp(44px, 7vw, 96px)', marginBottom: 28 }}>
            Real customers.<br/>Real cash flow.<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>Real upside.</em>
          </h2>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '46ch', margin: '0 auto 32px', lineHeight: 1.5 }}>
            If that sounds like your business — and you're ready to grow without the overhead of a full in-house team — let's talk.
          </p>
          <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 17, padding: '18px 28px' }}>
            Book a free intro call <span className="arr">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function AboutApp() {
  const [lang, setLang] = useStateAbout(() => {
    try { return localStorage.getItem('mr_lang') || 'en'; } catch { return 'en'; }
  });
  useEffectAbout(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('mr_lang', lang); } catch {}
  }, [lang]);
  useReveal();

  // Dynamic years-in-tech
  useEffectAbout(() => {
    const now = new Date();
    let yrs = now.getFullYear() - 2013;
    if (now.getMonth() < 6) yrs -= 1;
    document.querySelectorAll('.years-in-tech').forEach(el => el.textContent = yrs);
  });

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

ReactDOM.createRoot(document.getElementById('root')).render(<AboutApp />);
