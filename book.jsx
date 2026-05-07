/* =================================================================
   BOOK PAGE — michaelrurka.com/book
   Free intro call: Google Calendar embed + Montreal/Laurentides note
   ================================================================= */
import React from 'react';
import { useT, useLang, usePageTitle, T } from './i18n.jsx';
import { useReveal, NavBar } from './components.jsx';
import { Footer } from './sections.jsx';

/* ---------- Hero ---------- */
function BookHero() {
  const t = useT();
  return (
    <section style={{ padding: 'clamp(140px, 16vh, 200px) 0 40px' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 28 }}>
          <div className="eyebrow">{t('book.hero.eyebrow')}</div>
        </div>

        <h1 className="h-display book-h1 reveal" data-d="1" style={{ fontSize: 'clamp(56px, 9vw, 144px)', marginBottom: 40, maxWidth: '14ch', lineHeight: 0.95 }}>
          <T id="book.hero.h1" />
        </h1>

        <div className="book-intro-grid">
          <p className="reveal" data-d="2" style={{ fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.45, color: 'var(--ink-2)', maxWidth: '50ch', letterSpacing: '-0.005em' }}>
            {t('book.hero.lede')}
          </p>
        </div>

        <div className="reveal" data-d="3" style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--line)', maxWidth: 1100 }}>
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16, textWrap: 'balance' }}>
            {t('book.local.heading')}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: '60ch' }}>
            {t('book.local.body')}
          </p>
        </div>

        <style>{`
          .book-h1 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
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
  const t = useT();
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
            <div className="eyebrow">{t('book.cal.eyebrow')}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('book.cal.tz')}
            </div>
          </div>
          <iframe
            id="book-cal-iframe"
            title={t('book.cal.iframe_title')}
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2gfDwN6nPv36opTNXaDrt6q1ItuiCqmxtGV5h9W7PNL6MawPVxdmN5zf0Pv1KtoRIRS4aQNu-h?gv=true"
            style={{ border: 0, width: '100%', height: 720, background: '#fff', borderRadius: 2 }}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- Page App ---------- */
export default function BookApp() {
  useReveal();
  const { lang, setLang } = useLang();
  usePageTitle('meta.book.title');

  // CTAs everywhere lead here. On this page, "Let's talk" buttons just scroll to the calendar.
  const onTalk = () => {
    const cal = document.getElementById('book-cal-iframe');
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

