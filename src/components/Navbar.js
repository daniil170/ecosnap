import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Globe, Sun, Moon } from "lucide-react"; // Добавили Sun и Moon
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext"; // Импортируем контекст темы

const Navbar = ({ onAuthClick, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme(); // Достаем текущую тему и функцию переключения

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const languageLabels = { ru: "Русский", en: "English", de: "Deutsch" };

  return (
    <nav className="fixed top-0 w-full z-[80] border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-6 py-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200 dark:shadow-none">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            EcoSnap
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            to="/"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            {t("nav.profile")}
          </Link>

          {/* Кнопка переключения темы */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
            aria-label="Переключить тему"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Переключатель языков */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Globe size={18} />
              <span>{languageLabels[language]}</span>
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-10 right-0 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden w-32">
                {["ru", "en", "de"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                      language === lang
                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4 pl-2">
              {/* Ссылка на профиль */}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <User size={16} className="text-emerald-500" />
                <span className="max-w-[120px] truncate">
                  {user.email.split("@")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="ml-2 bg-slate-900 dark:bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-xl shadow-slate-200 dark:shadow-none"
            >
              {t("auth.login")}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
