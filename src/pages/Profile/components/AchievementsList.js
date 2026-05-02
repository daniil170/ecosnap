import React from "react";
import { Trophy, ChevronUp, ChevronDown } from "lucide-react";
import { ACHIEVEMENTS_LIST } from "../../../data/achievements";
import { useLanguage } from "../../../context/LanguageContext";

const AchievementsList = ({
  userData,
  setSelectedAch,
  showAllAch,
  setShowAllAch,
}) => {
  const { t } = useLanguage();
  const unlockedIds = new Set(userData.achievements || []);
  const orderedAchievements = [...ACHIEVEMENTS_LIST].sort((a, b) => {
    const aUnlocked = unlockedIds.has(a.id);
    const bUnlocked = unlockedIds.has(b.id);
    if (aUnlocked === bUnlocked) return 0;
    return aUnlocked ? -1 : 1;
  });

  const visibleAchievements = showAllAch
    ? orderedAchievements
    : orderedAchievements.slice(0, 6);

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-extrabold flex items-center gap-2 uppercase tracking-tight text-orange-400">
          <Trophy size={24} /> {t("achievements.collection")}
        </h3>
        <button
          onClick={() => setShowAllAch(!showAllAch)}
          className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1"
        >
          {showAllAch ? (
            <>
              <ChevronUp size={16} /> {t("achievements.hide")}
            </>
          ) : (
            <>
              <ChevronDown size={16} /> {t("achievements.showAll")} ({ACHIEVEMENTS_LIST.length})
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-300">
        {visibleAchievements.map((ach) => {
          const isLocked = !unlockedIds.has(ach.id);
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