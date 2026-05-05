/* App entry — composes everything */
function App() {
  const { lang, setLang } = useLang();
  usePageTitle('meta.home.title');
  useReveal();

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
