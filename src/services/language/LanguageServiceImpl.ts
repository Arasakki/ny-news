import i18n from "i18next";
import ILanguageService, { Locale } from "./ILanguageService";

export default class LanguageServiceImpl implements ILanguageService {
  private enTranslation: Record<
    string,
    string
  > = require("../../configs/locales/en.json");

  private currentLocale: Locale = {
    localeFull: "en-US",
    localeShort: "en",
    translation: this.enTranslation,
  };

  constructor() {
    i18n.init({
      resources: {
        [this.currentLocale.localeShort]: {
          translation: this.currentLocale.translation,
        },
      },
      lng: this.currentLocale.localeShort,
      fallbackLng: this.currentLocale.localeShort,
      interpolation: {
        escapeValue: false,
      },
      debug: false,
    });
  }

  public getCurrentLocale(): Locale {
    return this.currentLocale;
  }

  public translate = i18n.t;
}
