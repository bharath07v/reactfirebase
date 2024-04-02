import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18NextXhrBackend from "i18next-xhr-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const fallBackLanguage = ["en"]; //default language set to en by i18n
const availableLanguage = ["en", "es", "fr"];

i18n
  .use(I18NextXhrBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    //lng: 'es', // Set the default language here
    //fallbackLng: 'en', // Fallback language in case the desired language is not available
    fallBackLanguage,
    debug: false, //true Enable debug logs (optional)
    whitelist: availableLanguage,
  });

export default i18n;
