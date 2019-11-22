import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import ja from "./locales/ja";

export async function initializeI18n(){
  i18n.languages = ["en", "ja"];

  await i18n
    .use(initReactI18next)
    .init({
      resources: {...{en}, ...{ja}}, // Object.assign({}, {en}, {ja}),
      fallbackLng: "en",
      debug: false,

      interpolation: {
        escapeValue: false, // not needed for react!!
      },

      defaultNS: "general",

      // react i18next special options (optional)
      react: {
        wait: true,
        /*
           If you use i18n.changeLanguage() so let i18next re-render child-component, then uncomment the line below.
           When i18n.changeLanguage() is called, `languageChanged` event is emitted and if `bindI18n: "languageChanged"
           is active, react-i18next component will trigger re-render.
         */
        // bindI18n: "languageChanged loaded",
        
        /*
           If you dynamically add/remove i18n resource, then you should uncomment the line below.
           When you only need fixed i18n resource, you don't need bindStore setting.
         */
        // bindStore: "added removed",
        
        nsMode: "default",
      },
    });
}

export default i18n;
