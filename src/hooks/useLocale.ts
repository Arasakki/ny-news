import { useContext } from "react";
import ILanguageService from "../services/language/ILanguageService";
import LanguageContext from "./context/LanguageContext";

export default function useLocale(): ILanguageService {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLocale must be used within a LanguageProvider");
  }
  return context;
}
