import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Добавили Link и useNavigate
import { Menu, X, LogOut, User, Globe } from "lucide-react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useLanguage } from "../context/LanguageContext";

const Navbar = ({ onAuthClick, user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useLanguage();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // После выхода кидаем на главную
  };

  const languageLabels = { ru: "Русский", en: "English", de: "Deutsch" };

  return (
    <nav className="fixed top-0 w-full z-[80] border-b border-slate-100 bg-white/80 backdrop-blur-xl px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Логотип — теперь это ссылка на главную */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            EcoSnap
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-emerald-600 transition-colors">
            {t("nav.profile")}
          </Link>

          {/* Переключатель языков */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <Globe size={18} />
              <span>{languageLabels[language]}</span>
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-10 right-0 bg-white border border-slate-100 rounded-lg shadow-lg overflow-hidden">
                {["ru", "en", "de"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                      setIsLangMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                      language === lang
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {languageLabels[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              {/* Ссылка на профиль */}
              <Link
                to="/profile"
                className="flex items-center gap-2 text-slate-900 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all"
              >
                <User size={16} className="text-emerald-500" />
                <span className="max-w-[120px] truncate">
                  {user.email.split("@")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
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
