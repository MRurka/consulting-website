/* App entry — composes everything, mounts Tweaks panel */
const { useState: useStateA, useEffect: useEffectA } = React;

function App() {
  const TWEAK_DEFAULTS = window.__TWEAKS__ || {
    h1Variant: 'D1', accent: 'forest', heroLayout: 'fullbleed', typePairing: 'editorial', langStyle: 'minimal', calcLayout: 'inline', calcAesthetic: 'cream-on-green'
  };
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [scrollY, setScrollY] = useStateA(0);
  const [lang, setLang] = useStateA(() => {
    try { return localStorage.getItem('mr_lang') || 'en'; } catch { return 'en'; }
  });
  useEffectA(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('mr_lang', lang); } catch {}
  }, [lang]);
  useReveal();

  // Apply tweaks to <html>
  useEffectA(() => {
    document.documentElement.dataset.accent = tweaks.accent || 'forest';
    document.documentElement.dataset.type = tweaks.typePairing || 'editorial';
  }, [tweaks.accent, tweaks.typePairing]);

  // Hero parallax — track scroll
  useEffectA(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Years-in-tech dynamic value
  useEffectA(() => {
    const yrs = new Date().getFullYear() - 2013;
    document.querySelectorAll('.years-in-tech').forEach(el => el.textContent = yrs);
  }, [tweaks.h1Variant, tweaks.heroLayout]);

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} langStyle={tweaks.langStyle} current="home" />
      <main>
        <Hero tweaks={tweaks} onTalk={onTalk} scrollY={scrollY} />
        <HowSection />
        <WhatIDo />
        {/* <CalculatorSection tweaks={tweaks} onTalk={onTalk} /> */}
        <FeaturedCaseStudy />
      </main>
      <Footer onTalk={onTalk} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero">
          <TweakRadio label="H1 variant"
            value={tweaks.h1Variant}
            onChange={v => setTweak('h1Variant', v)}
            options={[
              { value: 'D1', label: 'D1 · Scalable ops' },
              { value: 'D2', label: 'D2 · Scale what works' },
              { value: 'D3', label: "D3 · Let's make it scale" },
            ]} />
          <TweakRadio label="Layout"
            value={tweaks.heroLayout}
            onChange={v => setTweak('heroLayout', v)}
            options={[
              { value: 'fullbleed', label: 'Full-bleed' },
              { value: 'split', label: 'Split' },
              { value: 'portrait', label: 'Portrait dom.' },
            ]} />
        </TweakSection>
        {false && <TweakSection label="Calculator">
          <TweakSelect label="Layout"
            value={tweaks.calcLayout}
            onChange={v => setTweak('calcLayout', v)}
            options={[
              { value: 'inline', label: 'A · Inline editorial (output anchored top)' },
              { value: 'split', label: 'B · Split (sticky output right)' },
              { value: 'stacked', label: 'C · Stacked story' },
              { value: 'spec', label: 'D · Document / spec card' },
            ]} />
          <TweakSelect label="Aesthetic"
            value={tweaks.calcAesthetic}
            onChange={v => setTweak('calcAesthetic', v)}
            options={[
              { value: 'cream-on-green', label: '1 · Cream on green' },
              { value: 'forest-on-cream', label: '2 · Forest on cream (inverted)' },
              { value: 'lab', label: '3 · Neutral lab' },
              { value: 'documentary', label: '4 · Documentary newsprint' },
            ]} />
        </TweakSection>}
        <TweakSection label="Lang switcher">
          <TweakSelect label="Style"
            value={tweaks.langStyle}
            onChange={v => setTweak('langStyle', v)}
            options={[
              { value: 'minimal', label: '1 · Minimal · EN · fr' },
              { value: 'segmented', label: '2 · Segmented pill' },
              { value: 'globe', label: '3 · Globe + code' },
              { value: 'slash', label: '4 · Slash · EN/FR' },
              { value: 'dot', label: '5 · Dot · EN ↔ FR' },
            ]} />
        </TweakSection>
        <TweakSection label="Style">
          <TweakSelect label="Accent color"
            value={tweaks.accent}
            onChange={v => setTweak('accent', v)}
            options={[
              { value: 'forest', label: 'Forest green' },
              { value: 'navy', label: 'Deep navy' },
              { value: 'orange', label: 'Burnt orange' },
              { value: 'ink', label: 'Off-black' },
              { value: 'cognac', label: 'Warm cognac' },
            ]} />
          <TweakSelect label="Type pairing"
            value={tweaks.typePairing}
            onChange={v => setTweak('typePairing', v)}
            options={[
              { value: 'editorial', label: 'Editorial · Archivo' },
              { value: 'serif-mix', label: 'Serif · Fraunces' },
              { value: 'quiet-sans', label: 'Quiet · Inter Tight' },
              { value: 'condensed', label: 'Condensed · Archivo Narrow' },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
