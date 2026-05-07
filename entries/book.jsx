import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nProvider } from '../i18n.jsx';
import BookApp from '../book.jsx';

const initial = window.__I18N__ || { lang: 'en', dict: {} };
hydrateRoot(
  document.getElementById('root'),
  <I18nProvider initialLang={initial.lang} initialDict={initial.dict}>
    <BookApp />
  </I18nProvider>
);
