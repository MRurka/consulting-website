/* App entry — composes everything for the home page */
import React from 'react';
import { useLang } from './i18n.jsx';
import { useReveal, NavBar } from './components.jsx';
import { Hero, WhatIDo, FeaturedCaseStudy, Footer } from './sections.jsx';
import { HowSection } from './how.jsx';
import { usePageTitle } from './i18n.jsx';

export default function App() {
  const { lang, setLang } = useLang();
  usePageTitle('meta.home.title');
  useReveal();

  const onTalk = () => { window.location.href = (lang === 'fr' ? '/fr' : '') + '/book/'; };

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
