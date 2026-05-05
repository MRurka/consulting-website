/* App entry — composes everything */
const { useEffect: useEffectA } = React;

function App() {
  const { lang, setLang } = useLang();
  useReveal();

  // Years-in-tech dynamic value
  useEffectA(() => {
    const now = new Date();
    let yrs = now.getFullYear() - 2013;
    if (now.getMonth() < 6) yrs -= 1;
    document.querySelectorAll('.years-in-tech').forEach(el => el.textContent = yrs);
  }, []);

  const onTalk = () => { window.location.href = 'book.html'; };

  return (
    <>
      <NavBar onTalk={onTalk} lang={lang} setLang={setLang} current="home" />
      <main>
        <Hero onTalk={onTalk} />
        <HowSection />
        <WhatIDo />
        <FeaturedCaseStudy />
      </main>
      <Footer onTalk={onTalk} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<I18nProvider><App /></I18nProvider>);
