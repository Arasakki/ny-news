import i18n from "i18next";
import ILanguageService, { Locale } from "./ILanguageService";

export default class LanguageServiceImpl implements ILanguageService {
  private locale: Locale;

  constructor() {
    this.locale = {
      localeFull: "en-US",
      localeShort: "en",
      translation: {},
    };
  }

  public async loadTranslations() {
    try {
      const translationModule = await import(
        `../../configs/locales/${this.locale.localeShort}.json`
      );
      this.locale.translation = translationModule.default;

      await i18n.init({
        resources: {
          [this.locale.localeShort]: {
            translation: this.locale.translation,
          },
        },
        lng: this.locale.localeShort,
        fallbackLng: this.locale.localeShort,
        interpolation: {
          escapeValue: false,
        },
        debug: false,
        returnObjects: false,
      });
    } catch (error) {
      console.error("Ошибка загрузки переводов:", error);
    }
  }

  public translate = (key: string, options?: any): string =>
    i18n.t(key, options) as string;

  public getCurrentLocale = () => this.locale;
}
