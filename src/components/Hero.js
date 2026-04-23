import React from "react";
import { ChevronRight, Sparkles, GlassWater } from "lucide-react";

const Hero = ({ onAuthClick, onAboutClick }) => (
  <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-white">
    {/* Декоративные градиенты на фоне */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[1000px] h-[600px] bg-emerald-50/50 rounded-full blur-3xl -z-10" />

    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
      <div className="space-y-6 md:space-y-8 text-center lg:text-left">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          AI Сортировка v2.0
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
          Сортируй мусор <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
            с умом.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mx-auto lg:mx-0">
          Наведи камеру смартфона на любой предмет, и наш интеллект мгновенно
          подскажет правила утилизации. Спасай планету, получай награды.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
          <button
            onClick={onAuthClick}
            className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            Попробовать бесплатно
          </button>

          <button
            onClick={onAboutClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Узнать больше <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Visual Part (Interactive Card) */}
      <div className="relative group px-2 sm:px-0">
        <div className="relative z-10 bg-white/40 backdrop-blur-2xl p-3 md:p-4 rounded-[2.5rem] border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          <div className="bg-slate-50 rounded-[2rem] overflow-hidden border border-slate-100 relative h-[320px] md:h-[400px] flex flex-col items-center justify-center">
            {/* Эффект сканера (анимация в index.css) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 blur-sm animate-scan z-20" />

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-500">
                <div className="w-16 h-16 text-emerald-500 transform group-hover:rotate-12 transition-transform duration-500">
                  <GlassWater size={64} strokeWidth={1.5} />
                </div>
              </div>
              <div className="bg-white/90 backdrop-blur px-6 py-2 rounded-full border border-white shadow-sm inline-block">
                <span className="text-xs md:text-sm font-bold text-slate-800 tracking-wide">
                  Пластик (PET 01)
                </span>
              </div>
            </div>

            {/* Карточка награды внизу */}
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 flex justify-between items-center bg-white/50 p-3 md:p-4 rounded-2xl backdrop-blur-sm border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-yellow-100">
                  P
                </div>
                <div className="text-left">
                  <p className="text-[8px] md:text-[10px] uppercase font-bold text-slate-400 leading-none">
                    Награда
                  </p>
                  <p className="text-xs md:text-sm font-bold text-slate-800">
                    +15 XP
                  </p>
                </div>
              </div>
              <div className="h-1.5 md:h-2 w-16 md:w-24 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-2/3" />
              </div>
            </div>
          </div>
        </div>

        {/* Декоративные пятна */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/40 rounded-full blur-3xl animate-pulse hidden sm:block -z-10" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl animate-pulse hidden sm:block -z-10" />
      </div>
    </div>
  </section>
);

export default Hero;
