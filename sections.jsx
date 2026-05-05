/* Big sections — hero, marquee, services, case study, work grid, footer */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

function availabilityLabel(now = new Date()) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (daysInMonth - day) < 15 ? 2 : 1;
  const m1 = new Date(year, month + offset, 1);
  const m2 = new Date(year, month + offset + 1, 1);
  const name = (d) => d.toLocaleString('en-US', { month: 'long' });
  return m1.getFullYear() === m2.getFullYear()
    ? `Available — ${name(m1)} & ${name(m2)} ${m2.getFullYear()}`
    : `Available — ${name(m1)} ${m1.getFullYear()} & ${name(m2)} ${m2.getFullYear()}`;
}

/* ============ HERO ============ */
function Hero({ onTalk }) {
  const h1 = <>You've built a real business.<br/><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400 }}>Now what?</em></>;

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
  }, []);

  const heroFade = {
    opacity: heroReady ? 1 : 0,
    transition: 'opacity 0.7s cubic-bezier(.2,.7,.2,1)',
  };

  return (
    <section id="top" style={{ paddingTop: 140, paddingBottom: 80, position: 'relative', ...heroFade }}>
      <div className="wrap hero-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 64, alignItems: 'stretch' }} >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="reveal in" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <span className="live-dot" aria-hidden/>
            <span className="eyebrow">{availabilityLabel()}</span>
          </div>
          <h1 className="h-display reveal in" style={{ fontSize: 'clamp(44px, 6.8vw, 104px)' }}>
            {h1}
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
        <div className="hero-split__image" style={{
          backgroundImage: 'url(assets/michael.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '60% 30%',
          aspectRatio: '3 / 4',
          minHeight: 560,
          borderRadius: 10,
        }}/>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .hero-split { grid-template-columns: 1fr !important; gap: 32px !important; }
          .hero-split__image { display: none !important; }
        }
      `}</style>
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
    <svg viewBox="0 0 118 36" xmlns="http://www.w3.org/2000/svg" aria-label="HiringBranch" style={{ height: '1.10em', width: 'auto', display: 'block' }}>
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
  const RenoRunLogo = (
    <svg viewBox="0 0 798 160" xmlns="http://www.w3.org/2000/svg" aria-label="RenoRun" style={{ height: '0.99em', width: 'auto', display: 'block', opacity: 0.55 }}>
      <path d="M44.9151 0.0316845C69.2153 -0.184562 94.1016 0.80097 118.343 0.140083C142.58 -0.520671 160.912 11.3504 161.064 37.3832L161.057 95.6606C161.062 100.024 161.041 104.531 161.069 108.803C161.168 123.655 162.522 136.77 150.982 148.122C143.398 155.583 133.283 159.07 122.637 159.119L63.5059 159.129C52.6158 159.13 40.6154 159.86 29.877 158.012C11.9087 154.92 0.192234 138.889 0.243202 121.042C0.296116 102.5 0.304822 83.9335 0.266639 65.3881C0.603645 47.1467 -3.37955 25.1101 10.9073 10.9663C19.0895 2.8487 28.35 0.241909 39.5703 0.130317C41.3514 0.0813455 43.1333 0.0487016 44.9151 0.0316845ZM97.4678 41.1274C92.6276 40.3307 65.6063 40.2129 61.2032 41.2338C57.6131 42.0665 54.7255 44.271 52.8037 47.394C51.7675 49.0781 51.0877 50.9469 50.6787 52.8764C49.3214 59.2845 41.8336 112.835 42.2862 115.221L42.752 115.788C45.433 115.364 60.3066 96.4856 62.8106 93.4331C73.2936 92.9863 83.6586 93.8346 94.0088 92.354C101.928 90.5389 108.522 86.3974 112.886 79.4213C116.605 73.5532 117.807 66.4379 116.222 59.6752C114.742 53.266 111.078 47.673 105.451 44.1625C103.019 42.6289 100.305 41.5968 97.4678 41.1274Z" fill="white"/>
      <path d="M62.8109 93.4333C73.294 92.9866 83.6587 93.8344 94.009 92.3537C103.5 98.3349 112.191 107.024 120.124 116.128C120.5 116.559 121 117.835 120.124 118.335C116.5 118.335 102.967 118.417 99.0002 118.335C95.9667 118.335 88.3779 118.524 87.0002 117.835C85.0002 116.835 73.0002 104.335 67.1383 97.9543C66.0963 96.9174 63.6881 94.0324 62.8109 93.4333Z" fill="#A5B3AA"/>
      <path d="M495.298 42.0537C550.653 37.0276 548.984 120.317 487.47 125.429C487.383 125.437 487.291 125.446 487.199 125.453C466.587 127.095 448.221 115.116 446.639 93.5644C445.725 81.1957 449.847 68.9826 458.069 59.6884C467.973 48.2673 480.267 43.1287 495.075 42.0742L495.298 42.0537ZM492.339 102.501C517.06 95.1199 516.798 62.179 490.526 64.6699C463.327 70.9951 466.224 107.275 492.339 102.501Z" fill="white"/>
      <path d="M210.34 43.6955C222.712 43.3885 251.987 42.2046 262.362 46.0822C268.282 48.2944 273.54 52.2493 276.176 58.1379C279.129 64.7325 278.449 73.0942 275.869 79.715C272.901 87.3313 266.997 93.7744 259.494 97.0695C261.266 101.066 273.32 120.141 271.886 122.786C268.842 124.28 260.468 123.776 256.721 123.743C253.067 123.793 249.411 123.778 245.758 123.695C243.461 120.701 236.43 106.617 235.014 102.954C231.391 102.79 227.273 102.923 223.608 102.964C222.9 108.191 222.192 116.995 220.131 121.81C219.868 122.424 218.655 123.665 218.067 123.655C213.747 123.583 200.113 124.632 196.998 122.706C196.387 119.374 201.42 92.9165 202.393 88.4455C205.513 74.1126 207.125 57.8567 210.34 43.6955ZM253.128 72.3517C254.206 61.5872 237.782 63.7556 230.922 63.8683C229.783 69.7739 228.673 75.6863 227.595 81.6037C233.66 81.6447 242.648 82.2454 248.056 79.7092C250.485 77.8276 252.801 75.61 253.128 72.3517Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M552.559 43.6871C566.453 43.2758 585.754 42.8973 599.387 44.7008C614.418 46.6889 622.757 61.4268 618.797 75.858C615.834 86.64 610.72 91.4743 601.327 97.3902C603.517 101.465 614.596 119.754 613.645 122.763C611.293 124.161 601.305 123.627 598.075 123.591L587.184 123.614C583.534 116.666 579.95 109.687 576.419 102.677C572.791 102.661 569.08 102.743 565.448 102.783C565.077 106.767 562.721 119.69 561.781 123.419C558.543 123.722 540.413 124.299 538.83 122.507C538.712 116.464 540.972 106.449 542.135 100.099L546.934 73.2174C548.354 65.4747 550.386 50.4962 552.559 43.6871ZM595.021 72.4723C596.078 61.3964 579.474 63.7053 572.358 63.7398C572.009 68.0936 570.474 77.2773 569.486 81.6422C575.771 81.6762 584.43 82.3485 589.968 79.5826C592.341 77.6464 594.702 75.7822 595.021 72.4723Z" fill="white" fillOpacity="0.7"/>
      <path d="M367.813 43.6652C373.674 43.5049 379.88 43.6137 385.768 43.6351C395.23 56.1152 403.867 69.8132 413.347 82.3972C415.174 71.118 418.006 54.4943 420.323 43.6739C424.125 43.5277 441.184 43.0927 443.658 44.349C444.13 48.428 439.484 71.4725 438.557 76.61L430.31 123.103C427.543 124.272 414.89 123.744 411.398 123.584C409.125 121.095 404.09 113.612 401.957 110.611L384.29 85.8255C382.896 93.6376 379.207 116.839 377.144 123.543C373.516 123.915 357.157 124.277 354.422 122.814C353.562 118.852 366.095 53.0235 367.813 43.6652Z" fill="white"/>
      <path d="M721.509 43.6277C727.34 43.5504 733.35 43.6303 739.193 43.6333C746.689 53.6646 753.595 64.312 760.925 74.4777C762.905 77.2183 764.627 80.1283 767.162 82.3959C768.176 73.3568 770.138 64.4609 771.69 55.5073C772.372 51.5795 772.975 47.6381 773.853 43.7477C777.415 43.4888 795.816 42.8464 797.529 44.9578C797.088 51.9419 793.849 66.4482 792.525 73.9328L787.761 100.418C786.48 107.842 785.37 115.575 783.696 122.888C781.895 124.133 768.088 123.656 764.902 123.622C755.951 111.992 746.3 97.7026 737.729 85.5373C735.845 96.2904 733.406 113.513 730.705 123.518C726.859 123.572 710.416 124.264 707.934 122.743C707.121 116.653 719.132 54.9222 721.509 43.6277Z" fill="white" fillOpacity="0.7"/>
      <path d="M632.277 43.6665C639.06 43.6028 647.412 43.2464 654.174 43.9403C657.295 44.2608 654.563 54.1344 654.174 56.3794C652.172 67.8503 649.183 79.6086 648.378 91.2328C647.679 106.898 668.82 106.456 675.049 94.9516C678.519 89.1949 678.681 82.7452 680.114 76.5034C682.536 65.9739 683.322 54.0453 686.063 43.7045C691.994 43.37 699.564 43.6765 705.666 43.3914C706.946 43.3316 708.109 43.9198 708.979 44.9084C710.229 47.7581 707.379 60.0588 706.675 64.1569C705.224 72.6987 703.489 82.9596 701.47 91.2481C698.559 102.359 691.845 114.272 681.373 119.769C659.852 131.066 624.588 127.027 623.736 96.7376C623.465 87.2757 625.646 79.3213 627.263 70.1848C628.828 61.3544 629.912 52.2441 632.277 43.6665Z" fill="white" fillOpacity="0.7"/>
      <path d="M293.055 43.6403C299.78 43.4517 352.099 43.0988 355.121 44.3521C355.986 47.4062 353.203 59.8182 352.411 63.3609C340.076 64.0456 325.754 63.5343 313.13 63.7059C312.876 66.7975 312.164 71.0664 311.737 74.2297C316.444 74.2271 341.234 73.666 343.81 75.1467C345.064 78.3218 342.315 89.4403 341.501 93.2944C333.31 93.8468 317.224 92.9752 308.443 93.68C308.172 93.9494 307.941 94.1787 307.75 94.3677C307.361 97.4598 306.928 100.546 306.452 103.626C318.611 103.953 332.818 103.191 344.7 103.995C344.672 109.426 343.021 118.198 341.746 123.457C335.592 124.027 282.916 124.23 279.563 122.89C278.7 117.696 291.199 53.9008 293.055 43.6403Z" fill="white"/>
    </svg>
  );
  const ApmLogo = (
    <svg viewBox="0 0 994 185" xmlns="http://www.w3.org/2000/svg" aria-label="APM Montreal" style={{ height: '1.1em', width: 'auto', display: 'block', opacity: 0.55 }}>
      <path d="M168.158 39.6308C171.04 30.1901 191.45 14.9611 199.97 10.436C208.988 5.68058 218.788 2.5899 228.901 1.31205C240.52 -0.0964936 252.934 0.246495 264.675 0.244633L311.895 0.245893L361.111 0.250673C377.491 0.236532 402.828 -0.842456 418 3.43007C442.955 10.4576 462.751 27.4491 475.177 50.1032C485.802 69.4748 487.861 98.7743 481.266 119.86C473.818 143.167 457.505 162.606 435.854 173.979C414.844 184.928 398.385 184.083 375.772 184.08L328.672 184.066L269.88 184.07C251.193 184.091 232.405 185.2 214.375 179.836C200.305 175.649 173.322 158.491 167.849 144.593L168.281 142.941C184.945 116.098 188.633 87.1949 177.273 57.5412C174.788 51.0542 171.037 45.7806 168.158 39.6308Z" fill="#FEFDFB" fillOpacity="0.4"/>
      <path d="M357.859 61.1737C363.999 61.2447 370.283 61.1546 376.435 61.1315C378.87 65.4712 381.272 71.9898 383.183 76.7562L393.002 101.266C394.504 96.4348 397.735 88.8962 399.655 83.9526C402.309 77.1145 405.659 67.5218 408.936 61.1858L428.213 61.3041C427.96 81.7571 428.187 102.738 428.183 123.231C423.704 123.11 418.782 123.24 414.27 123.267C414.154 115.666 414.256 107.809 414.256 100.187C414.192 93.8926 414.431 89.4512 415.061 83.2507C411.642 87.9497 401.533 115.529 398.177 123.235C394.297 123.167 391.772 123.164 387.928 123.55C383.177 114.71 375.577 94.7254 372.702 85.1352C371.616 90.3107 372.033 116.272 372.049 123.27L357.894 123.301C357.306 103.817 357.568 80.7391 357.859 61.1737Z" fill="#FEFDFB"/>
      <path d="M220.375 61.1477C230.186 61.1371 253.125 59.0131 258.974 66.2825C272.743 83.397 262.739 100.43 242.124 101.348L235.071 101.117L235.156 123.232L220.321 123.318L220.375 61.1477Z" fill="#FEFDFB"/>
      <path d="M235.02 73.3299C239.971 73.3199 244.798 72.925 248.906 76.2196C251.885 78.6078 250.858 83.015 248.647 85.5145C245.467 88.5014 239.983 87.5153 235.154 87.5897L235.02 73.3299Z" fill="#627769"/>
      <path d="M167.85 144.593C165.361 150.172 148.088 165.365 142.867 168.755C100.17 196.483 42.4945 184.751 14.6604 142.074C1.35066 121.233 -3.13666 95.9537 2.18625 71.8016C7.45605 48.0148 21.9659 27.3025 42.5157 14.2324C82.8546 -11.9385 141.701 -1.18841 168.005 39.669L168.158 39.6307C171.037 45.7805 174.788 51.0542 177.273 57.5411C188.633 87.1948 184.945 116.098 168.282 142.941L167.85 144.593Z" fill="white" fillOpacity="0.2"/>
      <path d="M168.005 39.6689L168.158 39.6306C171.037 45.7804 174.788 51.054 177.273 57.5409C188.633 87.1947 184.945 116.098 168.281 142.941C161.911 136.757 155.685 120.199 153.831 111.232C148.302 84.4789 153.821 62.2651 168.005 39.6689Z" fill="#30503D"/>
      <path d="M83.712 61.3486C89.0751 61.1831 95.1053 61.2993 100.52 61.2832C107.072 80.2195 116.128 104.672 123.617 123.194L107.882 123.191C107.016 120.411 104.382 111.073 102.068 110.093C94.7703 110.108 87.4726 110.084 80.1759 110.016C79.3521 113.776 77.4849 119.484 76.3615 123.322L61.2286 123.348C65.4209 109.007 72.756 92.8101 77.6388 78.5234C79.5131 73.0384 82.3341 66.8799 83.712 61.3486ZM92.6554 77.9551C89.9971 82.1986 86.2153 92.6734 84.9816 97.5381L91.1232 97.1318L98.3107 97.5322C96.4962 91.0005 94.405 84.4284 92.6554 77.9551Z" fill="#FEFDFB"/>
      <path d="M624.295 62.1802C641.937 60.9484 657.206 74.3328 658.302 91.993C659.403 109.654 645.91 124.828 628.253 125.793C610.782 126.749 595.81 113.424 594.724 95.9508C593.638 78.4772 606.844 63.399 624.295 62.1802ZM629.958 114.513C652.705 107.911 649.003 70.685 623.043 73.5186C617.259 75.4313 613.825 77.0451 610.817 83.0132C607.936 88.8062 607.443 95.5019 609.449 101.655C612.784 111.549 619.9 115.393 629.958 114.513Z" fill="white"/>
      <path d="M524.799 63.9801C530.673 63.9157 536.713 63.7496 542.562 64.1411C546.756 74.4227 550.327 84.9977 554.426 95.3186C555.049 96.8926 555.482 97.7391 557.031 98.2931C559.525 97.0612 569.337 68.7797 571.148 64.0898C574.743 63.7566 580.829 63.8875 584.61 63.8538C585.139 64.0782 586.652 64.5306 586.838 65.0096C588.392 68.9744 588.236 115.587 587.206 121.258C585.375 123.048 580.029 122.624 577.7 121.88C575.563 119.286 578.032 90.3771 576.649 87.3437C576.131 85.3968 575.679 83.3331 575.211 81.3645C571.917 91.9451 567.999 102.222 564.026 112.563C562.809 115.734 561.673 120.119 559.792 122.926C559.39 123.532 559.007 123.728 558.313 123.848C557.202 124.038 555.341 123.994 554.411 123.303C552.535 121.911 539.017 84.3687 538.534 80.6319C536.879 90.134 537.543 113.271 537.538 124.095C532.891 124.169 529.416 124.188 524.739 123.828C525.408 105.115 524.825 82.922 524.799 63.9801Z" fill="white"/>
      <path d="M786.172 63.9599C795.064 63.887 815.265 62.7804 822.608 65.9079C826.983 67.7486 830.418 71.2857 832.138 75.7099C834.11 80.7737 833.984 86.4153 831.786 91.3855C829.523 96.5273 826.189 99.2336 821.109 101.229C822.553 104.995 833.415 122.566 833.566 123.195C832.163 124.561 825.857 124.171 823.523 124.168C822.729 124.163 820.199 123.766 819.289 123.644C816.075 117.53 811.363 109.035 808.899 102.811C806.148 102.505 802.24 102.584 799.373 102.57L799.384 124.041C794.49 124.166 791.015 124.15 786.097 123.892L786.172 63.9599ZM799.192 91.6441C804.443 91.785 813.586 92.6551 817.901 89.8849C828.381 73.3453 808.833 75.1005 799.429 74.8192C799.399 79.2455 799.575 87.5329 799.192 91.6441Z" fill="white"/>
      <path d="M668.315 63.9433C682.427 63.5861 680.199 62.3602 688.316 73.4369C690.493 76.4079 707.245 100.696 708.296 101.225L708.945 100.742C709.498 97.737 709.126 89.6343 709.091 86.0313C709.061 78.6885 709.066 71.3456 709.116 64.0027C713.104 63.8055 717.977 63.9519 722.036 63.97L722.086 102.393C722.086 108.635 722.131 115 722.041 121.242C722.016 122.933 722.026 123.253 721.01 124.139C716.936 124.204 713.743 124.192 709.679 123.924C706.33 119.823 683.699 85.8708 682.145 85.4843C680.656 88.012 681.255 118.783 681.245 124.074C676.633 124.22 672.841 124.127 668.265 123.95L668.315 63.9433Z" fill="white"/>
      <path d="M912.961 63.9575C918.297 63.8921 923.044 63.8825 928.385 64.107C931.131 70.4011 950.453 119.628 950.941 123.324L950.357 123.795C946.968 124.618 940.455 124.08 936.935 123.59C936.145 120.298 935.054 116.929 934.053 113.681L928.883 113.664C922.355 113.68 913.313 113.36 907.067 114.057C905.739 117.015 904.431 120.878 903.295 123.982C898.2 124.296 894.177 124.044 889.113 123.772C894.263 115.127 909.596 67.0316 912.961 63.9575ZM910.406 102.403C914.188 102.444 918.07 102.535 921.842 102.517L930.125 102.473C928.722 98.3707 922.114 77.658 920.027 75.7302C918.407 80.25 912.227 98.7667 910.406 102.403Z" fill="white"/>
      <path d="M844.419 63.9424C854.915 63.9061 876.696 63.264 886.603 64.2352C886.422 67.3768 886.543 71.485 886.548 74.702C877.878 75.2183 866.054 74.8938 857.188 74.8973C856.967 78.7136 857.017 83.4454 856.952 87.3347C866.633 87.5158 876.334 87.1309 886.05 87.5717C885.748 90.514 885.889 94.9337 885.904 98.0108C879.905 98.6192 865.753 98.1849 859.23 98.201L857.746 98.3238C856.238 100.563 857.108 109.62 857.274 112.73C865.974 112.782 878.23 112.364 886.573 113.06C886.432 116.467 886.508 120.442 886.483 123.896C877.219 124.553 853.844 124.335 844.384 123.939L844.419 63.9424Z" fill="white"/>
      <path d="M730.47 63.9751C745.054 63.4799 763.174 63.8639 777.849 63.9771C777.894 67.7477 777.824 71.5188 777.633 75.2848C772.146 75.2491 766.367 75.3079 760.911 74.9824C760.383 84.7512 760.695 97.3255 760.7 107.336L760.669 124.086C755.927 124.165 752.296 124.177 747.523 123.855C747.639 107.596 747.619 91.3347 747.458 75.0755C741.649 75.1514 736.344 75.1655 730.54 74.9517L730.47 63.9751Z" fill="white"/>
      <path d="M955.789 63.961C959.933 63.8563 964.429 63.956 968.603 63.967C968.361 79.3537 968.271 97.3934 968.698 112.699C976.509 112.807 986.164 112.395 993.794 113.09C993.608 116.341 993.733 120.638 993.738 123.969C986.698 124.488 962.925 124.285 955.784 123.912L955.789 63.961Z" fill="white"/>
      <path d="M584.61 63.8538C586.411 63.9192 587.271 63.659 588.654 64.4803C589.257 67.2721 588.996 79.6088 588.991 83.3115L588.9 124.118C584.741 124.134 580.411 124.218 576.277 123.954C576.267 118.653 575.633 90.5451 576.649 87.3437C578.032 90.3771 575.563 119.286 577.7 121.88C580.029 122.624 585.375 123.048 587.205 121.258C588.236 115.587 588.392 68.9744 586.838 65.0096C586.652 64.5306 585.138 64.0782 584.61 63.8538Z" fill="white"/>
    </svg>
  );
  const items = [
    { kind: 'logo', node: NurxLogo, key: 'nurx' },
    { kind: 'logo', node: RenoRunLogo, key: 'renorun' },
    { kind: 'logo', node: HiringBranchLogo, key: 'hiringbranch' },
    { kind: 'logo', node: ApmLogo, key: 'apm' },
  ];
  const isDark = theme === 'dark';
  const dotColor = isDark ? 'rgba(244,241,236,0.28)' : 'var(--line)';
  const textColor = isDark ? 'rgba(244,241,236,0.55)' : 'var(--ink-3)';
  const maskFade = 'linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)';
  return (
    <div style={{
      overflow: 'hidden', position: 'relative',
      maskImage: maskFade, WebkitMaskImage: maskFade,
    }}>
      <div className="marquee-track">
        {[...items, ...items, ...items].map((it, i) => {
          const isLogo = typeof it === 'object' && it.kind === 'logo';
          return (
            <span key={i} className="marquee-item" style={{
              fontFamily: 'var(--display)',
              fontWeight: 600,
              fontSize: 'clamp(22px, 2.4vw, 34px)',
              color: textColor,
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              display: 'inline-flex', alignItems: 'center',
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
        .marquee-item { gap: 73px; padding-right: 73px; }
        @media (max-width: 720px) {
          .marquee-track { animation-duration: 22s; }
          .marquee-item { gap: 45px; padding-right: 45px; }
        }
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
    <section id="services" style={{ paddingBottom: 56 }}>
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
              <li><a href="mailto:michaelrurka91@gmail.com" style={{ color: 'rgba(244,241,236,0.85)' }}>michaelrurka91@gmail.com</a></li>
              <li><a href="#" style={{ color: 'rgba(244,241,236,0.85)' }}>LinkedIn ↗</a></li>
            </ul>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(244,241,236,0.45)', textAlign: 'right' }}>
            <div>© {new Date().getFullYear()}</div>
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

Object.assign(window, { Hero, Marquee, WhatIDo, FeaturedCaseStudy, AboutStrip, Footer });
