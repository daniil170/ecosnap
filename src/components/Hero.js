import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Sparkles,
  GlassWater,
  Camera,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Hero = ({ onAuthClick, onAboutClick, user }) => {
  const { t } = useLanguage();
  const isLoggedIn = !!user;

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1000px] h-[600px] bg-emerald-50/50 dark:bg-emerald-900/20 rounded-full blur-3xl -z-10 transition-colors duration-300" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          {/* Статус системы */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] md:text-xs font-bold uppercase mx-auto lg:mx-0 transition-colors duration-300 ${
              isLoggedIn
                ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-100 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400"
                : "bg-red-50 dark:bg-red-900/30 border-red-100 dark:border-red-700 text-red-600 dark:text-red-400"
            }`}
          >
            <span className="relative flex h-2 w-2">
              {isLoggedIn && (
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${isLoggedIn ? "bg-emerald-500 dark:bg-emerald-400" : "bg-red-500 dark:bg-red-400"}`}
              ></span>
            </span>
            {isLoggedIn ? t("hero.loggedInTagline") : t("hero.tagline")}
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight transition-colors duration-300">
            {user ? t("hero.greeting") : t("hero.title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 dark:from-emerald-400 to-teal-600 dark:to-teal-400">
              {user ? t("hero.dashboard") : t("hero.cta")}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            {user ? (
              <>
                <Link
                  to="/scanner"
                  className="w-full sm:w-auto bg-emerald-600 dark:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50 dark:hover:bg-emerald-500"
                >
                  <Camera size={18} /> {t("scanner.takePhoto")}
                </Link>
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 size={18} /> {t("profile.edit")}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={onAuthClick}
                  className="w-full sm:w-auto bg-emerald-600 dark:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50 dark:hover:bg-emerald-500"
                >
                  <Sparkles size={18} /> {t("hero.signup")}
                </button>
                <button
                  onClick={onAboutClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  {t("footer.about")} <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Карточка PET 01 */}
        <div className="relative group">
          <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/20 dark:border-slate-700/30 shadow-2xl transition-colors duration-300">
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-[2rem] h-[350px] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 dark:bg-emerald-400/40 animate-scan z-20" />
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl mb-4 transition-colors duration-300">
                <GlassWater
                  size={64}
                  className="text-emerald-500 dark:text-emerald-400"
                />
              </div>
              <div className="bg-white/90 dark:bg-slate-800/90 px-4 py-1 rounded-full border border-slate-100 dark:border-slate-600 font-bold text-slate-800 dark:text-slate-200 transition-colors duration-300">
                {t("scanner.plastic")}
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-slate-800/80 p-4 rounded-2xl flex justify-between items-center border border-white dark:border-slate-700 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold transition-colors duration-300">
                    {t("scanner.grade")}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-300 transition-colors duration-300">
                    +20 {t("profile.ecoScore")}
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden transition-colors duration-300">
                  <div className="h-full bg-emerald-500 dark:bg-emerald-400 w-2/3 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
