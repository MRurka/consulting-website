/* =================================================================
   BOOK PAGE — michaelrurka.com/book
   Free intro call: Google Calendar embed + Montreal/Laurentides note
   ================================================================= */

const { useState: useStateBook, useEffect: useEffectBook } = React;

/* ---------- Hero ---------- */
function BookHero() {
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 40px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">Book a free intro call</div>
        </div>

        <h1 className="h-display reveal" data-d="1" style={{ fontSize: 'clamp(56px, 9vw, 144px)', marginBottom: 40, maxWidth: '14ch', lineHeight: 0.95 }}>
          30 minutes,<br/>no <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>pitch</em>.
        </h1>

        <div className="book-intro-grid">
          <p className="reveal" data-d="2" style={{ fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.45, color: 'var(--ink-2)', maxWidth: '50ch', letterSpacing: '-0.005em' }}>
            You tell me what's going on in the business. I tell you if I think I can help. If I can't, I'll say so — and where possible, point you to someone who can.
          </p>
        </div>

        <div className="reveal" data-d="3" style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--line)', maxWidth: 1100 }}>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16, textWrap: 'balance' }}>
            Based in Montréal or the Laurentides?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch' }}>
            For owner-operators in the area, I'm happy to do the discovery session in person — at your office, your shop, or wherever the work actually happens. Walking the floor tells me more in 30 minutes than a video call does in an hour. Mention it when you book and we'll set it up.
          </p>
        </div>

        <style>{`
          .book-intro-grid {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 56px;
            align-items: end;
            max-width: 1100px;
          }
          @media (max-width: 860px) {
            .book-intro-grid { grid-template-columns: 1fr; gap: 32px; align-items: start; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- Calendar embed ---------- */
function BookCalendar() {
  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="wrap">
        <div className="reveal" style={{
          background: '#fff',
          border: '1px solid var(--line)',
          borderRadius: 4,
          padding: 'clamp(16px, 2vw, 28px)',
        }}>
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12 }}>
            <div className="eyebrow">Pick a time</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              All times shown in your local timezone
            </div>
          </div>
          <iframe
            title="Schedule a call"
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2gfDwN6nPv36opTNXaDrt6q1ItuiCqmxtGV5h9W7PNL6MawPVxdmN5zf0Pv1KtoRIRS4aQNu-h?gv=true"
            style={{ border: 0, width: '100%', height: 720, background: '#fff', borderRadius: 2 }}
            frameBorder="0"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
function BookApp() {
  useReveal();
  const [lang, setLang] = useStateBook(() => {
    try { return localStorage.getItem('mr_lang') || 'en'; } catch { return 'en'; }
  });

  useEffectBook(() => {
    try { localStorage.setItem('mr_lang', lang); } catch {}
  }, [lang]);

  // CTAs everywhere lead here. On this page, "Let's talk" buttons just scroll to the calendar.
  const onTalk = () => {
    const cal = document.querySelector('iframe[title="Schedule a call"]');
    if (cal) {
      const top = cal.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="book" />
      <main>
        <BookHero />
        <BookCalendar />
      </main>
      <Footer onTalk={onTalk} hideCta={true} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<BookApp />);
