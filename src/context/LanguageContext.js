import React, { createContext, useState, useContext, useEffect } from "react";
import { translations, detectLanguage } from "../locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => detectLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ t
  const t = (key) => {
    // Получаем текущий словарь для выбранного языка
    const currentDict = translations[language];

    // Проверяем, есть ли такой ключ напрямую в объекте
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }

    // Если ключ не найден, возвращаем сам ключ, чтобы вы видели, чего не хватает
    return key;
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
