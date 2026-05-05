/* "How" section — dark forest block */
function HowSection() {
  const t = useT();
  const now = new Date();
  let yrs = now.getFullYear() - 2013;
  if (now.getMonth() < 6) yrs -= 1;
  return (
    <section style={{
      background: 'var(--accent, #1d3a2f)',
      color: '#f4f1ec',
      padding: 'clamp(120px, 16vh, 180px) 0 clamp(120px, 16vh, 180px)',
      position: 'relative',
      borderTop: '1px solid var(--line)',
    }}>
      <div className="wrap">
        <div className="reveal" style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 36, color: 'rgba(244,241,236,0.6)' }}>{t('home.how.eyebrow')}</div>
          <h2 className="how-h2" style={{
            fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-0.03em',
            fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 1.0, marginBottom: 48, textWrap: 'balance',
          }}>
            <T id="home.how.heading" />
          </h2>
          <p style={{
            fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.5,
            color: 'rgba(244,241,236,0.85)', maxWidth: '52ch', margin: '0 auto 56px', textWrap: 'pretty',
          }}>
            <T id="home.how.lede" vars={{ n: yrs }} />
          </p>
        </div>
        <div className="reveal" data-d="2" style={{ marginTop: 80 }}>
          <HomeLogos theme="dark" />
        </div>
      </div>
      <style>{`
        .how-h2 em { font-family: var(--serif); font-style: italic; font-weight: 400; }
      `}</style>
    </section>
  );
}

window.HowSection = HowSection;
