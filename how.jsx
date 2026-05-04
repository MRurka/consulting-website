/* "How" section — dark forest block */
function HowSection() {
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
          <div className="eyebrow" style={{ marginBottom: 36, color: 'rgba(244,241,236,0.6)' }}>(How)</div>
          <h2 style={{
            fontFamily: 'var(--display)', fontWeight: 500, letterSpacing: '-0.03em',
            fontSize: 'clamp(44px, 6vw, 92px)', lineHeight: 1.0, marginBottom: 48, textWrap: 'balance',
          }}>
            Your operations<br/>and technology<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>partner.</em>
          </h2>
          <p style={{
            fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.5,
            color: 'rgba(244,241,236,0.85)', maxWidth: '52ch', margin: '0 auto 56px', textWrap: 'pretty',
          }}>
            <span className="years-in-tech" style={{ fontWeight: 600, color: '#f4f1ec' }}>13</span> years hands-on inside high-growth startups — designing customer experiences, shaping product strategy, and shipping software. I bring all of it to your business.
          </p>
        </div>
        <div className="reveal" data-d="2" style={{ marginTop: 80, paddingTop: 32, borderTop: '1px solid rgba(244,241,236,0.18)' }}>
          <HomeLogos theme="dark" />
        </div>
      </div>
    </section>
  );
}

window.HowSection = HowSection;
