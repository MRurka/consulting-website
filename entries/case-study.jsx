import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nProvider } from '../i18n.jsx';
import CaseStudyApp from '../case-study-company-x.jsx';

const initial = window.__I18N__ || { lang: 'en', dict: {} };
hydrateRoot(
  document.getElementById('root'),
  <I18nProvider initialLang={initial.lang} initialDict={initial.dict}>
    <CaseStudyApp />
  </I18nProvider>
);
