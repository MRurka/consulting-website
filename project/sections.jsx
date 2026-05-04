/* Big sections — hero, marquee, services, calculator, case study, work grid, footer */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

/* ============ HERO ============ */
function Hero({ tweaks, onTalk, scrollY }) {
  const h1Map = {
    D1: <>Scalable operations<br/>and growth strategy<br/>for owner-led<br/>businesses in Canada.</>,
    D2: <>Helping Canadian<br/>operators scale<br/>what's already<br/>working.</>,
    D3: <>You've built a real business.<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>Now what?</em></>,
  };

  const layout = tweaks.heroLayout;
  const yIn = scrollY * 0.18;

  // Hold the hero invisible until the portrait + fonts are decoded, then fade the whole section in.
  const [heroReady, setHeroReady] = React.useState(false);
  React.useEffect(() => {
    let cancelled = false;
    const imgP = new Promise((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = 'assets/michael.jpg';
    });
    const fontsP = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    Promise.all([imgP, fontsP]).then(() => {
      if (!cancelled) requestAnimationFrame(() => setHeroReady(true));
    });
    return () => { cancelled = true; };
  }, [layout]);

  const heroFade = {
    opacity: heroReady ? 1 : 0,
    transition: 'opacity 0.7s cubic-bezier(.2,.7,.2,1)',
  };

  if (layout === 'fullbleed') {
    return (
      <section id="top" style={{
        minHeight: '100vh',
        position: 'relative',
        padding: 0,
        overflow: 'hidden',
        color: '#f4f1ec',
        ['--nav-ink']: '#f4f1ec',
        ...heroFade,
      }}>
        {/* Image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(assets/michael.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '70% 30%',
          transform: `translateY(${yIn}px) scale(1.06)`,
          willChange: 'transform',
          filter: 'saturate(0.85) contrast(1.02)',
        }}/>
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(20,17,13,0.55) 0%, rgba(20,17,13,0.25) 28%, rgba(20,17,13,0.15) 55%, rgba(20,17,13,0.85) 100%)',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(20,17,13,0.45) 0%, rgba(20,17,13,0.0) 55%)',
        }}/>

        {/* Foreground content */}
        <div className="wrap" style={{
          position: 'relative', zIndex: 2,
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          paddingTop: 140, paddingBottom: 64,
        }}>
          <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <span className="live-dot" aria-hidden/>
            <span className="eyebrow" style={{ color: 'rgba(244,241,236,0.85)' }}>Available — June &amp; July 2026</span>
          </div>

          <h1 className="h-display reveal in" style={{
            fontSize: 'clamp(48px, 8.4vw, 130px)',
            maxWidth: '16ch',
            color: '#f4f1ec',
          }}>
            {h1Map[tweaks.h1Variant] || h1Map.D1}
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr auto',
            gap: 48, alignItems: 'end',
            marginTop: 28,
          }} className="hero-foot">
            <p style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', maxWidth: '44ch', color: 'rgba(244,241,236,0.9)', lineHeight: 1.4, fontFamily: 'var(--display)', fontWeight: 400, letterSpacing: '-0.01em' }}>
              Grow it, streamline it, or finally step back from it. Whatever the move is, I can help you get there. Through consulting, retainers, or equity partnerships — whatever the fit calls for.
            </p>
            <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 16, padding: '18px 28px', justifySelf: 'end' }}>
              Book a free intro call <span className="arr">→</span>
            </button>
          </div>

          {/* Bottom meta strip */}
          <div style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: '1px solid rgba(244,241,236,0.18)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontSize: 12, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'rgba(244,241,236,0.7)',
          }} className="hero-meta">
            <span>Based in Montreal · Working across Canada and Latin America</span>
            <span>(01 / Independent operator-investor)</span>
            <span>↓ Scroll</span>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .hero-foot { grid-template-columns: 1fr !important; gap: 28px !important; }
            .hero-foot .btn { justify-self: start !important; }
            .hero-meta { flex-direction: column; align-items: flex-start; gap: 8px; }
          }
        `}</style>
      </section>
    );
  }

  if (layout === 'split') {
    return (
      <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', ...heroFade }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 64, alignItems: 'stretch' }} >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <span className="live-dot" aria-hidden/>
              <span className="eyebrow">Available — June &amp; July 2026</span>
            </div>
            <h1 className="h-display reveal in" style={{ fontSize: 'clamp(44px, 6.8vw, 104px)' }}>
              {h1Map[tweaks.h1Variant] || h1Map.D1}
            </h1>
            <div style={{ marginTop: 48 }}>
              <p style={{ fontSize: 'clamp(22px, 1.9vw, 28px)', maxWidth: '40ch', color: 'var(--ink)', marginBottom: 28, fontFamily: 'var(--display)', fontWeight: 400, lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                Grow it, streamline it, or finally step back from it. Whatever the move is, I can help you get there.
              </p>
              <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 16, padding: '16px 26px' }}>
                Book a free intro call <span className="arr">→</span>
              </button>
            </div>
          </div>
          <div style={{
            backgroundImage: 'url(assets/michael.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '60% 30%',
            minHeight: 560,
            borderRadius: 10,
          }}/>
        </div>
      </section>
    );
  }

  // portrait-dominant
  return (
    <section id="top" style={{ paddingTop: 100, paddingBottom: 80, position: 'relative', ...heroFade }}>
      <div className="wrap">
        <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }}/>
          <span className="eyebrow">Operator's growth partner — based in Montreal</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <h1 className="h-display reveal in" style={{ fontSize: 'clamp(56px, 11vw, 180px)' }}>
            {h1Map[tweaks.h1Variant] || h1Map.D1}
          </h1>
        </div>
        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 56,
          alignItems: 'start',
        }} className="dom-grid">
          <div style={{
            backgroundImage: 'url(assets/michael.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: '60% 30%',
            aspectRatio: '3/4',
            borderRadius: 10,
          }}/>
          <div style={{ paddingTop: 24 }}>
            <p style={{ fontSize: 'clamp(20px, 1.7vw, 26px)', color: 'var(--ink-2)', lineHeight: 1.45, marginBottom: 32, maxWidth: '38ch' }}>
              Grow it, streamline it, or finally step back from it. Whatever the move is, I can help you get there.
            </p>
            <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 16, padding: '18px 28px' }}>
              Book a free intro call <span className="arr">→</span>
            </button>
          </div>
        </div>
        <style>{`@media (max-width: 860px) { .dom-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ MARQUEE ============ */
function HomeLogos({ theme = 'light' }) {
  const NurxLogo = (
    <svg viewBox="0 0 1022 332" xmlns="http://www.w3.org/2000/svg" aria-label="Nurx" style={{ height: '0.78em', width: 'auto', display: 'block' }}>
      <path d="M331.221 5.33703V0H229.443V5.33703C262.878 22.2683 267.234 34.4146 267.234 116.801V231.701H263.369L65.1521 0H0V5.33703C31.9626 22.7591 33.4349 25.2129 32.9441 118.273L32.5761 256.545C31.0423 299.548 24.4167 304.149 0 317.461V322.798H101.777V317.461C68.3422 300.53 63.9865 288.384 63.9865 205.997V68.8293L68.0355 73.1848L68.5263 73.6755L292.939 332H298.767L298.276 118.273C297.786 25.2129 299.258 22.7591 331.221 5.33703ZM560.48 236.056V95.9438H486.8V101.772C513.916 109.072 517.843 109.072 517.843 183.177V231.639C517.843 272.863 495.082 295.132 455.329 295.132C424.286 295.132 403.489 282.985 403.489 246.669V95.9438H329.319V101.281C356.435 108.581 360.361 108.581 360.361 182.686V261.698C360.361 309.67 394.778 329.546 442.752 329.546C461.648 329.546 468.948 326.663 482.506 322.737L514.039 284.948H517.904L518.395 322.737H592.074V317.4C564.958 310.161 560.541 310.161 560.541 235.995L560.48 236.056ZM711.704 93.0606L681.153 135.205H675.324V91.0976H669.987L598.761 106.618V111.955C630.295 119.684 632.687 124.531 632.196 187.103V237.038C632.196 307.83 629.313 309.732 601.154 317.523V322.86H707.778V318.013C679.189 311.204 674.834 309.793 674.834 266.177V193.483C674.834 146.001 698.576 129.009 727.164 129.009C745.078 129.009 751.397 135.818 760.108 141.585L764.464 139.622L763.482 88.7051C750.906 88.7051 722.256 90.6682 711.643 93.0606H711.704ZM966.178 258.324L920.105 205.016L964.215 152.197C989.92 121.647 1002.99 109.072 1015.62 100.79V95.9438H926.424V100.79C944.338 106.618 948.693 111.955 948.693 121.647C948.693 129.377 943.356 138.64 926.853 158.945L903.111 187.532L900.657 185.14L877.897 157.534C860.474 136.677 856.057 130.42 856.057 120.727C856.057 110.053 866.241 104.225 878.817 100.851V96.0052H773.605V100.851C788.635 110.053 799.801 122.69 831.763 159.988L871.517 206.979L831.763 254.951C796.856 297.585 783.298 311.204 770.66 318.443V322.798H863.235V318.443C844.83 313.596 839.002 308.259 839.002 298.567C839.002 288.874 845.321 279.182 854.033 267.526L888.449 223.91L918.51 258.324C936.424 278.691 943.233 288.874 943.233 298.076C943.233 306.296 938.878 314.087 919.492 318.443V322.798H1021.27V318.443C1013.97 312.124 1000.41 297.095 965.994 258.324H966.178Z" fill="currentColor"></path>
    </svg>
  );
  const HiringBranchLogo = (
    <svg viewBox="0 0 118 36" xmlns="http://www.w3.org/2000/svg" aria-label="HiringBranch" style={{ height: '0.92em', width: 'auto', display: 'block' }}>
      <path d="M110.229 19.4922V25.5754H110.297C111.137 24.3542 112.089 23.7437 113.677 23.7437C116.081 23.7437 117.692 25.5528 117.692 28.0856V35.6613H114.607V28.5379C114.607 27.2941 113.881 26.4121 112.588 26.4121C111.227 26.4121 110.229 27.4976 110.229 29.0806V35.6613H107.145V19.4922H110.229Z" fill="currentColor"></path>
      <path d="M100.108 36C96.4334 36 94.1426 33.3316 94.1426 29.8716C94.1426 26.4116 96.4108 23.7432 99.9491 23.7432C102.966 23.7432 104.826 25.4845 105.234 27.9946H102.217C102.013 26.977 101.219 26.2081 100.085 26.2081C98.2253 26.2081 97.2727 27.6328 97.2727 29.8716C97.2727 32.0652 98.1573 33.5351 100.04 33.5351C101.287 33.5351 102.172 32.8793 102.376 31.5677H105.347C105.143 34.0326 103.215 36 100.108 36Z" fill="currentColor"></path>
      <path d="M84.8233 24.0598V25.6428H84.8914C85.6852 24.399 86.7513 23.7432 88.339 23.7432C90.7433 23.7432 92.3537 25.5523 92.3537 28.0851V35.6608H89.2689V28.5374C89.2689 27.2936 88.5431 26.4116 87.2503 26.4116C85.8894 26.4116 84.8914 27.4971 84.8914 29.0801V35.6608H81.8066V24.0598H84.8233Z" fill="currentColor"></path>
      <path d="M76.8288 35.6612C76.6473 35.435 76.5339 34.8923 76.4659 34.3722H76.4205C75.8308 35.2541 74.9916 35.9325 72.9956 35.9325C70.614 35.9325 68.9355 34.6888 68.9355 32.3821C68.9355 29.8267 71.0223 29.0126 73.608 28.6508C75.5359 28.3794 76.4205 28.2211 76.4205 27.3392C76.4205 26.5024 75.7628 25.9597 74.4699 25.9597C73.0183 25.9597 72.3151 26.4798 72.2244 27.5879H69.4799C69.5706 25.5526 71.0903 23.7661 74.4926 23.7661C77.9856 23.7661 79.3918 25.3265 79.3918 28.0402V33.9425C79.3918 34.8244 79.5279 35.3446 79.8001 35.5481V35.6612H76.8288ZM73.7441 33.7842C75.5133 33.7842 76.4886 32.6987 76.4886 31.568V29.8267C75.9442 30.1433 75.105 30.3242 74.3338 30.5051C72.7234 30.867 71.9295 31.2288 71.9295 32.3143C71.9295 33.3998 72.6554 33.7842 73.7441 33.7842Z" fill="currentColor"></path>
      <path d="M64.401 24.06V25.9144H64.469C65.1722 24.6027 65.966 23.9243 67.327 23.9243C67.6672 23.9243 67.8713 23.9469 68.0528 24.0148V26.7059H67.9847C65.966 26.5023 64.5144 27.5652 64.5144 30.0075V35.6611H61.4297V24.06H64.401Z" fill="currentColor"></path>
      <path d="M46.3398 35.6613V19.4922H53.598C55.3445 19.4922 56.6827 19.9219 57.522 20.6681C58.4065 21.4596 58.8148 22.432 58.8148 23.6984C58.8148 25.3493 57.7941 26.4121 56.2745 26.9323V27.0001C58.0663 27.5202 59.2911 29.0128 59.2911 31.0028C59.2911 32.518 58.8148 33.5582 57.8622 34.3723C56.9322 35.1864 55.5033 35.6613 53.7795 35.6613H46.3398ZM49.6287 28.4248V32.9476H53.4166C55.0043 32.9476 55.9569 32.0657 55.9569 30.754C55.9569 29.2163 54.8228 28.4248 53.3258 28.4248H49.6287ZM49.6287 26.0051H53.1897C54.6187 26.0051 55.594 25.3266 55.594 24.0602C55.594 22.8617 54.7094 22.1607 53.2578 22.1607H49.6287V26.0051Z" fill="currentColor"></path>
      <path d="M99.4685 20.4831C96.2931 20.4831 94.3424 19.1262 94.0249 16.8648H97.0869C97.3364 17.5884 97.9942 18.1538 99.4232 18.1538C101.17 18.1538 102.009 17.3171 102.009 15.7341V14.4677H101.941C101.26 15.2366 100.376 15.8245 98.9015 15.8245C96.3157 15.8245 93.7754 13.7893 93.7754 10.2841C93.7754 6.8241 95.8621 4.60791 98.8107 4.60791C100.262 4.60791 101.328 5.17326 102.032 6.14567H102.077V4.92451H105.048V15.6436C105.048 17.2718 104.527 18.3799 103.665 19.1714C102.689 20.076 101.192 20.4831 99.4685 20.4831ZM99.4232 13.3596C101.374 13.3596 102.168 11.9349 102.168 10.2162C102.168 8.52016 101.26 7.07285 99.4005 7.07285C97.8354 7.07285 96.7921 8.29402 96.7921 10.2388C96.7921 12.2063 97.8354 13.3596 99.4232 13.3596Z" fill="currentColor"></path>
      <path d="M84.4581 4.92451V6.5075H84.5261C85.32 5.26372 86.386 4.60791 87.9738 4.60791C90.378 4.60791 91.9884 6.41704 91.9884 8.94983V16.5256H88.9037V9.40211C88.9037 8.15834 88.1779 7.27638 86.885 7.27638C85.5241 7.27638 84.5261 8.36186 84.5261 9.94485V16.5256H81.4414V4.92451H84.4581Z" fill="currentColor"></path>
      <path d="M75.9141 16.5261V4.925H78.9988V16.5261H75.9141ZM75.9141 3.11586V0.356934H78.9988V3.11586H75.9141Z" fill="currentColor"></path>
      <path d="M70.4811 4.92475V6.77911H70.5491C71.2523 5.46749 72.0461 4.78906 73.407 4.78906C73.7473 4.78906 73.9514 4.81168 74.1328 4.87952V7.57061H74.0648C72.0461 7.36708 70.5945 8.42995 70.5945 10.8723V16.5258H67.5098V4.92475H70.4811Z" fill="currentColor"></path>
      <path d="M61.9844 16.5261V4.925H65.0691V16.5261H61.9844ZM61.9844 3.11586V0.356934H65.0691V3.11586H61.9844Z" fill="currentColor"></path>
      <path d="M46.3398 16.5261V0.356934H49.6287V6.6889H56.0023V0.356934H59.2911V16.5261H56.0023V9.4026H49.6287V16.5261H46.3398Z" fill="currentColor"></path>
      <path fillRule="evenodd" clipRule="evenodd" d="M4.56505 29.4984C17.4384 27.5362 27.6187 17.3862 29.5868 4.55128C29.6408 4.19891 29.5389 3.88988 29.2796 3.61889C28.9994 3.32609 28.5411 3.10068 27.9886 3.10068L5.05373 3.10067C3.9803 3.10067 3.1101 3.96827 3.1101 5.03851L3.1101 27.905C3.1101 28.4558 3.33618 28.9128 3.62987 29.1921C3.90166 29.4507 4.21162 29.5523 4.56505 29.4984ZM5.03503 32.5634C2.27614 32.9839 0.000290622 30.6876 0.000290866 27.905L0.000292871 5.03851C0.000293115 2.25589 2.26279 0.000131723 5.05373 0.000131966L27.9886 0.000133965C30.7795 0.000134209 33.0827 2.26921 32.6609 5.01986C30.4873 19.1947 19.2523 30.3962 5.03503 32.5634Z" fill="currentColor"></path>
      <path fillRule="evenodd" clipRule="evenodd" d="M31.061 7.06171C18.7241 8.94222 8.96799 18.6693 7.08187 30.9694C7.03008 31.3071 7.12776 31.6033 7.37628 31.863C7.64483 32.1436 8.08402 32.3596 8.61348 32.3596H30.5927C31.6214 32.3596 32.4554 31.5281 32.4554 30.5025V8.58876C32.4554 8.06088 32.2387 7.623 31.9572 7.35525C31.6968 7.10747 31.3997 7.01008 31.061 7.06171ZM30.6106 4.12449C33.2546 3.72148 35.4356 5.92208 35.4356 8.58876V30.5025C35.4356 33.1692 33.2674 35.3309 30.5927 35.3309H8.61348C5.93883 35.3309 3.73164 33.1564 4.13586 30.5204C6.2189 16.9361 16.9858 6.20132 30.6106 4.12449Z" fill="currentColor"></path>
    </svg>
  );
  const items = [
    { kind: 'logo', node: NurxLogo, key: 'nurx' },
    'RenoRun',
    { kind: 'logo', node: HiringBranchLogo, key: 'hiringbranch' },
    'APM Montreal',
  ];
  const isDark = theme === 'dark';
  const dotColor = isDark ? 'rgba(244,241,236,0.28)' : 'var(--line)';
  const textColor = isDark ? 'rgba(244,241,236,0.55)' : 'var(--ink-3)';
  const maskFade = 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)';
  return (
    <div style={{
      overflow: 'hidden', position: 'relative',
      maskImage: maskFade, WebkitMaskImage: maskFade,
    }}>
      <div className="marquee-track">
        {[...items, ...items, ...items].map((it, i) => {
          const isLogo = typeof it === 'object' && it.kind === 'logo';
          return (
            <span key={i} style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 'clamp(22px, 2.4vw, 34px)',
              color: textColor,
              letterSpacing: '-0.02em',
              paddingRight: 56,
              whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center', gap: 56,
            }}>
              {isLogo ? it.node : it}
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: dotColor }}/>
            </span>
          );
        })}
      </div>
      <style>{`
        .marquee-track { display: inline-flex; animation: marquee 38s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @media (max-width: 720px) { .marquee-track { animation-duration: 22s; } }
      `}</style>
    </div>
  );
}

window.HomeLogos = HomeLogos;

/* ============ WHAT I DO ============ */
function WhatIDo() {
  const items = [
    { num: '01', title: 'Customer Experience', body: "Your customers have options. If finding you, booking with you, or paying you feels like friction — they'll find someone easier. Let's make sure every touchpoint works the way it should." },
    { num: '02', title: 'Operations & Process', body: "You're spending time on things that shouldn't need you. Approvals, follow-ups, manual steps that made sense when you were smaller — they're costing you now. Let's find them and fix them." },
    { num: '03', title: 'Technology', body: "You've probably got tools that don't talk to each other, or a gap you're filling with a spreadsheet. Let's sort out what you actually need, set it up properly, and make sure your team actually uses it." },
    { num: '04', title: 'Growth', body: "You know there's more on the table — you just haven't had the bandwidth to go after it. Pricing, retention, new markets. Let's find the levers worth pulling and go pull them." },
  ];
  return (
    <section id="services">
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, gap: 32, flexWrap: 'wrap' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>What I do</div>
            <h2 className="h-section">What most operators<br/>need three people for.</h2>
          </div>
          <p style={{ fontSize: 18, color: 'var(--ink-2)', maxWidth: '38ch' }}>
            Strategy and execution. Design and development. The full picture — without the headcount.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid var(--line)' }} className="services-grid">
          {items.map((it, i) => (
            <div key={i} className="service-card reveal" data-d={(i % 4) + 1} style={{
              padding: '40px 32px 40px 0',
              borderBottom: '1px solid var(--line)',
              borderRight: i % 2 === 0 ? '1px solid var(--line)' : 'none',
              paddingLeft: i % 2 === 0 ? 0 : 40,
              paddingRight: i % 2 === 0 ? 40 : 0,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background .3s',
            }}>
              <div style={{ marginBottom: 36 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>{it.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '-0.025em', fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.1, marginBottom: 16, textWrap: 'balance' }}>
                {it.title}
              </h3>
              <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '42ch' }}>{it.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, textAlign: 'center' }} className="reveal" data-d="3">
          <a href="services.html" className="btn btn--ghost" style={{ borderColor: 'var(--ink)', fontSize: 15 }}>
            See how engagements work <span className="arr">→</span>
          </a>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .services-grid { grid-template-columns: 1fr !important; }
            .services-grid .service-card { border-right: none !important; padding: 32px 0 !important; }
          }
          .service-card:hover h3 { color: var(--accent); }
        `}</style>
      </div>
    </section>
  );
}

/* ============ CALCULATOR PLACEHOLDER ============ */
function CalculatorPlaceholder({ onTalk }) {
  return (
    <section style={{ padding: '0', margin: '0 0 110px' }}>
      <div className="wrap">
        <div style={{
          background: 'var(--bg-2)',
          color: 'var(--ink)',
          borderRadius: 12,
          padding: 'clamp(48px, 6vw, 96px)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 64,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid var(--line)',
        }} className="calc-card reveal">
          {/* decorative grid */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(20,17,13,0.05) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}/>
          <div style={{ position: 'relative' }}>
            <div className="eyebrow" style={{ marginBottom: 22 }}>See what's possible · Coming soon</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(36px, 5.4vw, 78px)', marginBottom: 28 }}>
              How much are you<br/>leaving on the table?
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.2vw, 19px)', color: 'var(--ink-2)', lineHeight: 1.5, maxWidth: '46ch' }}>
              Pick your vertical, your biggest challenge, and see what fixing it is typically worth. Launching with V1 in the coming weeks.
            </p>
          </div>

          {/* mock interface — the only filled element */}
          <div style={{ position: 'relative' }} className="calc-mock">
            <div style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              border: '1px solid var(--accent)',
              borderRadius: 12,
              padding: 28,
              fontFamily: 'var(--mono)',
              fontSize: 13,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 22, color: 'rgba(244,241,236,0.55)' }}>
                <span>Step 03 of 04</span>
                <span>RESTAURANTS</span>
              </div>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.55)', marginBottom: 14 }}>Your annual revenue</div>
              <div style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
                {['$500K','$1M','$2M','$5M+'].map((v, i) => (
                  <div key={v} style={{
                    flex: 1, padding: '14px 6px', textAlign: 'center',
                    border: '1px solid rgba(244,241,236,0.22)',
                    borderLeft: i ? 'none' : '1px solid rgba(244,241,236,0.22)',
                    background: i === 1 ? 'rgba(244,241,236,0.94)' : 'transparent',
                    color: i === 1 ? 'var(--accent)' : 'inherit',
                    fontWeight: i === 1 ? 600 : 400,
                    borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : 0,
                  }}>{v}</div>
                ))}
              </div>
              <div style={{ paddingTop: 24, borderTop: '1px solid rgba(244,241,236,0.22)' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.55)', marginBottom: 14 }}>Typical annual lift</div>
                <div style={{ fontFamily: 'var(--display)', fontSize: 'clamp(36px, 4.6vw, 64px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  $80K <span style={{ opacity: 0.4 }}>—</span> $180K
                </div>
                <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(244,241,236,0.55)' }}>
                  Customer retention · Online ordering ops
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) { .calc-card { grid-template-columns: 1fr !important; gap: 40px !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ============ FEATURED CASE STUDY ============ */
function FeaturedCaseStudy() {
  return (
    <section id="work">
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Featured engagement</div>
            <h2 className="h-section">Selected work.</h2>
          </div>
          <a href="#work" style={{ display: 'none', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--ink-2)', borderBottom: '1px solid var(--line)', paddingBottom: 4 }}>
            See everything <span>→</span>
          </a>
        </div>

        <a href="case-study-company-x.html" className="case-card reveal" style={{
          display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 0,
          border: '1px solid var(--line)', borderRadius: 10,
          overflow: 'hidden', background: 'var(--bg-2)',
          transition: 'transform .35s cubic-bezier(.2,.7,.2,1), box-shadow .35s',
        }}>
          <div className="case-visual" style={{
            position: 'relative',
            minHeight: 480,
            background: 'linear-gradient(135deg, var(--accent) 0%, color-mix(in oklch, var(--accent) 70%, #000) 100%)',
            color: 'var(--accent-ink)',
            padding: 48,
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            overflow: 'hidden',
          }}>
            {/* striped placeholder bg */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'repeating-linear-gradient(45deg, rgba(244,241,236,0.04) 0 2px, transparent 2px 14px)',
            }}/>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.65)' }}>
              <span>Case study</span>
              <span>2022 — 2024</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
                {['Cash-based services', 'Anonymous', 'Product Consulting'].map(t => (
                  <span key={t} style={{ padding: '5px 10px', border: '1px solid rgba(244,241,236,0.3)', borderRadius: 999, fontSize: 11, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 28 }}>
                <Stat big="266%" small="YoY gross profit growth" />
                <Stat big="~99%" small="Reduction in theft" />
              </div>
            </div>
          </div>
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 480 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(28px, 2.8vw, 40px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 24, textWrap: 'balance' }}>
                A cash business that now runs without its owner in the room.
              </h3>
              <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 18 }}>
                <strong style={{ color: 'var(--ink)' }}>The problem:</strong> A profitable services business that only worked when the owner was physically present — service slipped, revenue softened, and theft was a constant tax.
              </p>
              <p style={{ fontSize: 17, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                <strong style={{ color: 'var(--ink)' }}>The work:</strong> 2+ years embedded as product consultant. Designed and shipped a custom operating system end-to-end — order management, finance, scheduling, payroll, loyalty — then led the rebuild onto custom code once the playbook was proven.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>Read the full case study</span>
              <span className="arr-pill" aria-hidden>→</span>
            </div>
          </div>
        </a>
        <style>{`
          .case-card:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -30px rgba(20,17,13,0.18); }
          @media (max-width: 860px) {
            .case-card { grid-template-columns: 1fr !important; }
            .case-visual { min-height: 320px !important; padding: 32px !important; }
            .case-card > div:last-child { padding: 32px !important; min-height: auto !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

function Stat({ big, small }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(40px, 4.4vw, 64px)', lineHeight: 1, letterSpacing: '-0.035em' }}>{big}</div>
      <div style={{ fontSize: 12, marginTop: 6, color: 'rgba(244,241,236,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--mono)' }}>{small}</div>
    </div>
  );
}

/* ============ ABOUT STRIP ============ */
function AboutStrip({ onTalk }) {
  const timeline = [
    { co: 'HiringBranch', role: 'Director of Product', period: "'24–'26", note: 'Platform redesign & rebuild' },
    { co: 'DieWell', role: 'Co-Founder (advisory)', period: "'24–'25", note: 'Stack, GTM, analytics' },
    { co: 'Company X', role: 'Product Consultant', period: "'22–'24", note: '99% theft↓ · 266% profit↑' },
    { co: 'RenoRun', role: 'Lead Designer → PM', period: "'19–'22", note: 'Seed → $142M Series B' },
    { co: 'Nurx', role: 'Design Lead', period: "'15–'18", note: 'Seed → $36M Series B (YC)' },
  ];
  return (
    <section id="about">
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }} className="about-grid">
          <div className="reveal" style={{ position: 'sticky', top: 120 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>About</div>
            <h2 className="h-section" style={{ fontSize: 'clamp(40px, 5.2vw, 76px)', marginBottom: 32 }}>
              I help operators<br/>get the growth layer<br/>their business deserves.
            </h2>
            <button onClick={onTalk} className="btn btn--primary" style={{ fontSize: 15 }}>
              Let's work together <span className="arr">→</span>
            </button>
          </div>
          <div>
            <p className="reveal" style={{ fontSize: 'clamp(19px, 1.5vw, 24px)', lineHeight: 1.5, marginBottom: 40, color: 'var(--ink)', letterSpacing: '-0.005em' }}>
              I've spent <span className="years-in-tech">13</span> years hands-on in tech — designing customer experiences, building product strategy, and shipping software inside some of Canada's fastest-growing startups.
            </p>
            <p className="reveal" data-d="1" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 20 }}>
              Now I work independently with owner-operators across Canada who are profitable and ready to grow, but don't have the in-house capability to make it happen. My engagements range from scoped consulting to retained partnerships to equity arrangements — depending on what the fit calls for.
            </p>
            <p className="reveal" data-d="2" style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--ink-2)', marginBottom: 0 }}>
              The businesses I find most interesting are the ones with real customers, real cash flow, and real upside that hasn't been touched by modern operations or technology yet. That's where I work.
            </p>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) {
            .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .about-grid > div:first-child { position: static !important; }
            .tl-row { grid-template-columns: 70px 1fr !important; grid-template-rows: auto auto; }
            .tl-row > span:nth-child(3), .tl-row > span:nth-child(4) { grid-column: 2; text-align: left !important; font-size: 12px; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer({ onTalk, hideCta = false }) {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bg)', padding: hideCta ? '40px 0' : '120px 0 40px', position: 'relative' }}>
      <div className="wrap">
        {!hideCta && (
        <div className="reveal" style={{ marginBottom: 88 }}>
          <div className="eyebrow" style={{ color: 'rgba(244,241,236,0.5)', marginBottom: 28, visibility: 'hidden', height: 0, marginBottom: 0 }}></div>
          <h2 className="h-display" style={{ fontSize: 'clamp(56px, 10vw, 168px)', color: 'var(--bg)', marginBottom: 40 }}>
            Your business<br/>runs. <em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-ink)', opacity: 0.55 }}>Let's make<br/>it scale.</em>
          </h2>
          <button onClick={onTalk} className="btn" style={{ background: 'var(--bg)', color: 'var(--ink)', fontSize: 17, padding: '20px 32px' }}>
            Book a free intro call <span className="arr">→</span>
          </button>
        </div>
        )}
        <div style={{
          paddingTop: 40,
          borderTop: '1px solid rgba(244,241,236,0.15)',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 40,
          fontSize: 14,
        }} className="foot-grid">
          <div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Michael Rurka</div>
            <div style={{ color: 'rgba(244,241,236,0.55)', maxWidth: '28ch' }}>
              Operator's growth partner.<br/>Based in Montreal, working across Canada and Latin America.
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(244,241,236,0.4)', marginBottom: 14 }}>Site</div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
              <li><a href="services.html" style={{ color: 'rgba(244,241,236,0.85)' }}>Services</a></li>
              <li><a href="about.html" style={{ color: 'rgba(244,241,236,0.85)' }}>About</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{ color: 'rgba(244,241,236,0.4)', marginBottom: 14 }}>Reach me</div>
            <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
              <li><a href="mailto:hello@michaelrurka.com" style={{ color: 'rgba(244,241,236,0.85)' }}>hello@michaelrurka.com</a></li>
              <li><a href="#" style={{ color: 'rgba(244,241,236,0.85)' }}>LinkedIn ↗</a></li>
            </ul>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.45)', textAlign: 'right' }}>
            <div>© 2026</div>
            <div style={{ marginTop: 4 }}>Montreal · 45.5°N</div>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) { .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } .foot-grid > div:last-child { text-align: left !important; } }
        `}</style>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, Marquee, WhatIDo, CalculatorPlaceholder, FeaturedCaseStudy, AboutStrip, Footer });
