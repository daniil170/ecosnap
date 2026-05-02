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

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1000px] h-[600px] bg-emerald-50/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold uppercase mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {user ? t("hero.loggedInTagline") : t("hero.tagline")}
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight">
            {user ? t("hero.greeting") : t("hero.title")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
              {user ? t("hero.dashboard") : t("hero.cta")}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            {user ? (
              <>
                <Link
                  to="/scanner"
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-200"
                >
                  <Camera size={18} /> {t("scanner.takePhoto")}
                </Link>
                <Link
                  to="/profile"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <BarChart3 size={18} /> {t("profile.edit")}
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={onAuthClick}
                  className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-200"
                >
                  <Sparkles size={18} /> {t("hero.signup")}
                </button>
                <button
                  onClick={onAboutClick}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  {t("footer.about")} <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Карточка PET 01 */}
        <div className="relative group">
          <div className="bg-white/40 backdrop-blur-2xl p-4 rounded-[2.5rem] border border-white/20 shadow-2xl">
            <div className="bg-slate-50 rounded-[2rem] h-[350px] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 animate-scan z-20" />
              <div className="bg-white p-6 rounded-3xl shadow-xl mb-4">
                <GlassWater size={64} className="text-emerald-500" />
              </div>
              <div className="bg-white/90 px-4 py-1 rounded-full border border-slate-100 font-bold text-slate-800">
                {t("scanner.plastic")}
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/80 p-4 rounded-2xl flex justify-between items-center border border-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                    {t("scanner.grade")}
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    +20 {t("profile.ecoScore")}
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-2/3" />
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
