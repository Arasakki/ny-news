import { ReactNode, createContext } from "react";
import LanguageServiceImpl from "../../services/language/LanguageServiceImpl";
import ILanguageService from "../../services/language/ILanguageService";

const LanguageContext = createContext<ILanguageService | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const languageService = new LanguageServiceImpl();
  return (
    <LanguageContext.Provider value={languageService}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
