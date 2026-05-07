import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nProvider } from '../i18n.jsx';
import ServicesApp from '../services.jsx';

const initial = window.__I18N__ || { lang: 'en', dict: {} };
hydrateRoot(
  document.getElementById('root'),
  <I18nProvider initialLang={initial.lang} initialDict={initial.dict}>
    <ServicesApp />
  </I18nProvider>
);
