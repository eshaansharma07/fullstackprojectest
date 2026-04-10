import { useApp } from "../context/AppContext.jsx";
import { translations } from "../i18n/translations.js";

export function useTranslation() {
  const { language } = useApp();
  const t = (key) => translations[language]?.[key] || translations.en[key] || key;
  return { t, language };
}
