import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import es from './locales/es.json';
import en from './locales/en.json';

const resources = {
  es: {
    translation: es
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es', // idioma por defecto español
    fallbackLng: 'es',
    
    interpolation: {
      escapeValue: false // react already does escaping
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;