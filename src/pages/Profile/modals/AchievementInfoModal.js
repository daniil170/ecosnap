import React from "react";
import { X, Trophy, Lock, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

const AchievementInfoModal = ({ achievement, unlocked, onClose }) => {
  const { t } = useLanguage();

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 transition-colors duration-300">
            <Trophy
              className="text-orange-400 dark:text-orange-300 transition-colors duration-300"
              size={22}
            />{" "}
            {t("achievements.Title")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-300"
          >
            <X
              size={22}
              className="text-slate-400 dark:text-slate-500 transition-colors duration-300"
            />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 p-6 text-center transition-colors duration-300">
          <div className="text-6xl mb-4">{achievement.icon}</div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white transition-colors duration-300">
            {t(achievement.nameKey)}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-3 transition-colors duration-300">
            {t(achievement.descKey)}
          </p>

          <div className="mt-5">
            {unlocked ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                <CheckCircle2 size={14} /> {t("achievements.statusReceived")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-colors duration-300">
                <Lock size={14} /> {t("achievements.statusClosed")}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/20 p-4 transition-colors duration-300">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 transition-colors duration-300">
            {t("achievements.howToLabel")}
          </p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-300">
            {t(achievement.howToKey)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementInfoModal;
