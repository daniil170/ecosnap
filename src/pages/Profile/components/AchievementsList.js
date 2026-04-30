import React from "react";
import { Trophy, ChevronUp, ChevronDown } from "lucide-react";
import { ACHIEVEMENTS_LIST } from "../../../data/achievements";

const AchievementsList = ({
  userData,
  setSelectedAch,
  showAllAch,
  setShowAllAch,
}) => {
  const visibleAchievements = showAllAch
    ? ACHIEVEMENTS_LIST
    : ACHIEVEMENTS_LIST.slice(0, 6);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-extrabold flex items-center gap-2 uppercase tracking-tight text-orange-400">
          <Trophy size={24} /> Коллекция наград
        </h3>
        <button
          onClick={() => setShowAllAch(!showAllAch)}
          className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1"
        >
          {showAllAch ? (
            <>
              <ChevronUp size={16} /> Свернуть
            </>
          ) : (
            <>
              <ChevronDown size={16} /> Показать все ({ACHIEVEMENTS_LIST.length})
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-300">
        {visibleAchievements.map((ach) => {
          const isLocked = !userData.achievements?.includes(ach.id);
          return (
            <button
              key={ach.id}
              onClick={() => setSelectedAch(ach)}
              className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                isLocked
                  ? "bg-slate-50 border-transparent opacity-30 grayscale"
                  : "bg-white border-emerald-100 shadow-md hover:scale-105"
              }`}
            >
              <span className="text-5xl">{ach.icon}</span>
              <span className="text-[10px] font-black uppercase text-center text-slate-700 leading-tight">
                {ach.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsList;