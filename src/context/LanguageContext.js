import React, { createContext, useState, useContext, useEffect } from "react";
import { translations, detectLanguage } from "../locales/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => detectLanguage());

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const currentDict = translations[language] || translations.en;

    // 1. Прямой поиск (для большинства ваших ключей)
    if (currentDict[key]) {
      return currentDict[key];
    }

    // 2. Обработка специального вложенного объекта (profile.rewardTable)
    // Если ключ содержит точку и прямой поиск не дал результата
    if (key.includes(".")) {
      const [parent, child] = key.split(".");
      if (currentDict[parent] && currentDict[parent][child]) {
        return currentDict[parent][child];
      }
    }

    // Если ничего не найдено, возвращаем сам ключ
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
