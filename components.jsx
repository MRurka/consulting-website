/* Shared small components */
const { useState, useEffect, useRef, useMemo } = React;

/* ============ HOOKS ============ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids.join('|')]);
  return active;
}

/* ============ LANG SWITCH ============ */
function LangSwitch({ lang, setLang, large = false }) {
  const other = lang === 'en' ? 'fr' : 'en';

  // Mobile overlay version
  if (large) {
    return (
      <button type="button" onClick={() => setLang(other)} aria-label={`Switch to ${other.toUpperCase()}`} style={{
        display: 'inline-flex', alignItems: 'center',
        background: 'var(--bg-2)', borderRadius: 999,
        padding: 4, fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.08em',
        color: 'inherit', cursor: 'pointer',
      }}>
        {['en', 'fr'].map(l => (
          <span key={l} style={{
            padding: '10px 20px', borderRadius: 999, textTransform: 'uppercase',
            background: lang === l ? 'var(--ink)' : 'transparent',
            color: lang === l ? 'var(--bg)' : 'var(--ink-2)',
            transition: 'background .25s, color .25s', fontWeight: 500,
          }}>{l}</span>
        ))}
      </button>
    );
  }

  // Default: segmented pill
  return (
    <button type="button" onClick={() => setLang(other)} aria-label={`Switch to ${other.toUpperCase()}`} style={{
      display: 'inline-flex', alignItems: 'center',
      background: 'rgba(125,125,125,0.14)', borderRadius: 999, padding: 3,
      fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'inherit', cursor: 'pointer',
    }}>
      {['en','fr'].map(l => (
        <span key={l} style={{
          padding: '6px 12px', borderRadius: 999, fontWeight: 600,
          background: lang === l ? 'var(--bg)' : 'transparent',
          color: 'inherit',
          opacity: lang === l ? 1 : 0.6,
          transition: 'background .25s, opacity .25s',
          minWidth: 32, textAlign: 'center',
        }}>{l.toUpperCase()}</span>
      ))}
    </button>
  );
}

/* ============ NAV ============ */
function NavBar({ onTalk, lang, setLang, current = 'home' }) {
  const y = useScrollY();
  const [open, setOpen] = useState(false);
  const scrolled = y > 40;

  // Cross-page nav: Services + About are top-level pages.
  // On home, "Michael Rurka" wordmark scrolls to top; on other pages it links home.
  const links = [
    { label: 'Services', href: 'services.html', key: 'services' },
    { label: 'About',    href: 'about.html',    key: 'about' },
  ];

  const wordmarkProps = current === 'home'
    ? { href: '#top', onClick: (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false); } }
    : { href: 'index.html' };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60,
        padding: scrolled ? '14px 0' : '24px 0',
        background: scrolled ? 'rgba(244,241,236,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all .35s ease',
        color: 'var(--nav-ink, var(--ink))',
      }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a {...wordmarkProps} style={{
            fontFamily: 'var(--display)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: 18,
          }}>
            Michael&nbsp;Rurka<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {links.map(l => (
              <a key={l.key} href={l.href} className={`nav-a ${current === l.key ? 'is-current' : ''}`}>{l.label}</a>
            ))}
            <LangSwitch lang={lang} setLang={setLang} />
            <button onClick={onTalk} className="btn btn--primary" style={{ padding: '11px 20px', fontSize: 14 }}>
              Let's talk <span className="arr">→</span>
            </button>
          </nav>

          <button className="hamburger" aria-label="Menu" onClick={() => setOpen(true)}
            style={{ display: 'none', width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <path d="M0 1h22M0 13h22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 80,
        background: 'var(--bg)',
        transform: open ? 'translateY(0)' : 'translateY(-101%)',
        transition: 'transform .55s cubic-bezier(.7,0,.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div className="wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 22px' }}>
          <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 18 }}>
            Michael&nbsp;Rurka<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close" style={{ width: 44, height: 44 }}>
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M2 2l16 16M18 2L2 18" stroke="currentColor" strokeWidth="1.5"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 22px', gap: 6 }}>
          {links.map(l => (
            <a key={l.key} href={l.href}
               style={{ fontFamily: 'var(--display)', fontSize: 'clamp(48px, 12vw, 96px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, padding: '12px 0', borderBottom: '1px solid var(--line)', opacity: current === l.key ? 0.4 : 1 }}>
              {l.label}
            </a>
          ))}
          <button onClick={() => { setOpen(false); onTalk(); }} className="btn btn--primary" style={{ marginTop: 28, alignSelf: 'flex-start', fontSize: 17, padding: '16px 24px' }}>
            Let's talk <span className="arr">→</span>
          </button>
          <div style={{ marginTop: 32 }}>
            <LangSwitch lang={lang} setLang={setLang} large />
          </div>
        </div>
      </div>

      <style>{`
        .nav-a { font-size: 14px; color: inherit; opacity: .82; transition: opacity .2s; position: relative; }
        .nav-a:hover { opacity: 1; }
        .nav-a.is-current { opacity: 1; }
        .nav-a.is-current::after { content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px; background: currentColor; }
        .nav-a:not(.is-current)::after { content: ""; position: absolute; left: 0; right: 100%; bottom: -4px; height: 1px; background: currentColor; transition: right .35s ease; }
        .nav-a:not(.is-current):hover::after { right: 0; }
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .hamburger { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}

/* ============ Calendly Modal ============ */
function CalendlyModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(20,17,13,0.55)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
      animation: 'fadein .25s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: 'var(--bg)',
        maxWidth: 540, width: '100%',
        borderRadius: 6,
        padding: 'clamp(28px, 4vw, 48px)',
        position: 'relative',
        animation: 'rise .35s cubic-bezier(.2,.7,.2,1)',
      }}>
        <button onClick={onClose} aria-label="Close" style={{
          position: 'absolute', top: 18, right: 18, width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Free intro call</div>
        <h3 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 52px)', marginBottom: 16 }}>30 minutes,<br/>no pitch.</h3>
        <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 28 }}>
          You tell me what's going on in the business, I tell you if I think I can help. If I can't, I'll say so.
        </p>
        <div style={{
          background: 'var(--bg-2)',
          border: '1px dashed var(--line)',
          borderRadius: 4,
          padding: '40px 24px',
          textAlign: 'center',
          marginBottom: 24,
        }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>[ Calendly embed ]</div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>Inline calendar would render here</div>
        </div>
        <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>
          Prefer email? <a href="mailto:michaelrurka91@gmail.com" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink-3)' }}>michaelrurka91@gmail.com</a>
        </div>
      </div>
      <style>{`
        @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
}

Object.assign(window, { useReveal, useScrollY, useActiveSection, NavBar, CalendlyModal, LangSwitch });
