import { createContext, ReactNode, useEffect, useState } from "react";
import LanguageServiceImpl from "../../services/language/LanguageServiceImpl";
import ILanguageService from "../../services/language/ILanguageService";
import Loader from "../../components/loader";

const LanguageContext = createContext<ILanguageService | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageService, setLanguageService] =
    useState<ILanguageService | null>(null);

  useEffect(() => {
    const service = new LanguageServiceImpl();
    service
      .loadTranslations()
      .then(() => {
        setLanguageService(service);
      })
      .catch(() => {
        setLanguageService(service);
      });
  }, []);

  if (!languageService) {
    return <Loader />;
  }

  return (
    <LanguageContext.Provider value={languageService}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
