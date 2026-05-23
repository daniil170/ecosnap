// EcoSlider.jsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const EcoSlider = ({ userData }) => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  const currentXP = userData?.ecoScore || 0;
  const level = userData?.level || 1;
  const xpPerLevel = 100;
  const scansLeft = Math.ceil((xpPerLevel - (currentXP % xpPerLevel)) / 10);

  const slides = [
    {
      id: 1,
      icon: "🌱",
      content: `${t("slider.progress.prefix")} ${level + 1} ${t("slider.progress.suffix")} ${scansLeft} ${t("slider.progress.scans")}`,
      gradient:
        "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10",
      border: "border-emerald-200/50 dark:border-emerald-700/50",
    },
    {
      id: 2,
      icon: "💡",
      content: t("slider.tip.1"),
      gradient:
        "from-green-400/20 to-emerald-500/20 dark:from-green-400/10 dark:to-emerald-500/10",
      border: "border-green-200/50 dark:border-green-700/50",
    },
    {
      id: 3,
      icon: "🌍",
      content: t("slider.fact.1"),
      gradient:
        "from-sky-400/20 to-indigo-500/20 dark:from-sky-400/10 dark:to-indigo-500/10",
      border: "border-sky-200/50 dark:border-sky-700/50",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="w-full py-4 select-none">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          Eco Insights
        </h3>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === i
                  ? "w-6 bg-emerald-500 dark:bg-emerald-400"
                  : "w-1.5 bg-slate-200 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>

      <div
        onClick={() => setIndex((index + 1) % slides.length)}
        className={`relative h-28 rounded-3xl border transition-all duration-700 cursor-pointer overflow-hidden
          ${slides[index].border} bg-gradient-to-br ${slides[index].gradient} backdrop-blur-md p-5 flex items-center gap-4 shadow-sm hover:shadow-md active:scale-[0.98] group`}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-white/90 dark:bg-slate-800/90 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-white/50 dark:border-slate-700/50 group-hover:scale-110 transition-transform duration-500">
          {slides[index].icon}
        </div>

        <div className="flex-1 overflow-hidden">
          <p
            key={index}
            className="text-slate-700 dark:text-slate-300 font-medium leading-tight text-sm sm:text-base animate-slide-in"
          >
            {slides[index].content}
          </p>
        </div>

        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/20 dark:bg-white/10 rounded-full blur-2xl" />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EcoSlider;
