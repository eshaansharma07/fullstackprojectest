import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/http.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("eventsphere_theme") || "dark");
  const [language, setLanguage] = useState(localStorage.getItem("eventsphere_language") || "en");
  const [meta, setMeta] = useState({ announcements: [], categories: [], faq: [] });

  useEffect(() => {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("eventsphere_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("eventsphere_language", language);
  }, [language]);

  useEffect(() => {
    const loadMeta = async () => {
      const { data } = await api.get("/public/meta");
      setMeta(data.data);
    };

    loadMeta().catch(() => {});
  }, []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      meta,
      refreshMeta: async () => {
        const { data } = await api.get("/public/meta");
        setMeta(data.data);
      }
    }),
    [theme, language, meta]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
