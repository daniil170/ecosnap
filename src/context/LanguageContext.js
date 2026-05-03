import React, { createContext, useState, useContext, useEffect } from "react";
import { translations, detectLanguage } from "../locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => detectLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Универсальная функция для получения перевода.
   * Поддерживает любую глубину вложенности через точку (например: "a.b.c")
   */
  const t = (key) => {
    const currentDict = translations[language] || translations.en;

    // 1. Сначала пробуем найти ключ как есть (для плоских ключей типа "nav.profile")
    if (currentDict[key] !== undefined) {
      return currentDict[key];
    }

    // 2. Если не нашли, пробуем разбить по точке (для вложенных ключей типа "achievements.streak_10.name")
    const keys = key.split(".");
    const value = keys.reduce((acc, k) => {
      return acc && acc[k] !== undefined ? acc[k] : undefined;
    }, currentDict);

    // Если значение найдено — возвращаем его, если нет — сам ключ
    return value !== undefined ? value : key;
  };

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage должен использоваться внутри LanguageProvider",
    );
  }
  return context;
};
