import React from "react";
import { X, Trophy, Lock, CheckCircle2 } from "lucide-react";
import { getAchievementHowTo } from "../../../data/achievements";

const AchievementInfoModal = ({ achievement, unlocked, onClose }) => {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Trophy className="text-orange-400" size={22} /> Награда
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={22} className="text-slate-400" />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 text-center">
          <div className="text-6xl mb-4">{achievement.icon}</div>
          <h3 className="text-2xl font-black text-slate-900">{achievement.title}</h3>
          <p className="text-slate-500 mt-3">{achievement.desc}</p>
          <div className="mt-5">
            {unlocked ? (
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                <CheckCircle2 size={14} /> Уже получена
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-200 text-slate-600 px-4 py-1.5 text-xs font-black uppercase tracking-wider">
                <Lock size={14} /> Пока закрыта
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
            Как получить
          </p>
          <p className="mt-2 text-sm text-slate-700">
            {getAchievementHowTo(achievement.id)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementInfoModal;
