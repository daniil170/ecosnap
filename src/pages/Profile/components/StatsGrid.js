// StatsGrid.jsx
import React from "react";
import { TrendingUp, Zap, Camera } from "lucide-react";
import {
  LEVEL_REWARDS,
  getScanRewardsForLevel,
} from "../../../services/gamification";
import { getItemById } from "../../../data/shopItems";
import { calculateEcoScore } from "../../../services/leagueSystem";
import { useLanguage } from "../../../context/LanguageContext";

const StatsGrid = ({ userData }) => {
  const { t } = useLanguage();
  const currentLevel = userData.level || 1;
  const nextReward = LEVEL_REWARDS.find(
    (reward) => reward.level > currentLevel,
  );
  const nextRewardItem = nextReward?.items?.length
    ? getItemById(nextReward.items[0])
    : null;
  const levelPreview = [1, 5, 10, 15, 20, 30, 50].map((level) => ({
    level,
    ...getScanRewardsForLevel(level),
  }));

  const stats = [
    {
      label: t("profile.ecoScore"),
      val: calculateEcoScore(userData),
      icon: <TrendingUp size={20} />,
      col: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: t("profile.ozone"),
      val: userData.ozone,
      icon: <Zap size={20} />,
      col: "text-orange-500 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      label: t("profile.scans"),
      val: userData.scannedItems,
      icon: <Camera size={20} />,
      col: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300"
          >
            <div
              className={`w-10 h-10 ${s.bg} ${s.col} rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}
            >
              {s.icon}
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
              {s.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {s.val}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-[2rem] p-5 transition-colors duration-300">
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
          {t("profile.levelReward")}
        </p>
        {nextReward ? (
          <p className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            {t("profile.nextLevel")} {nextReward.level}: +{nextReward.ozone} O3
            {nextRewardItem
              ? ` + ${t("common.edit")} "${t(nextRewardItem.nameKey)}"`
              : ""}
          </p>
        ) : (
          <p className="mt-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            {t("profile.allRewards")}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] p-5 transition-colors duration-300">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
          {t("profile.scanRewards")}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest">
                <th className="text-left pb-2">
                  {t("profile.rewardTable.level")}
                </th>
                <th className="text-left pb-2">
                  {t("profile.rewardTable.ecoScore")}
                </th>
                <th className="text-left pb-2">
                  {t("profile.rewardTable.ozone")}
                </th>
              </tr>
            </thead>
            <tbody>
              {levelPreview.map((row) => (
                <tr
                  key={row.level}
                  className={`${row.level === currentLevel ? "bg-emerald-50 dark:bg-emerald-900/20" : ""} transition-colors duration-300`}
                >
                  <td className="py-2 font-bold text-slate-800 dark:text-slate-200">
                    {row.level}
                  </td>
                  <td className="py-2 text-slate-700 dark:text-slate-300">
                    +{row.ecoScore}
                  </td>
                  <td className="py-2 text-slate-700 dark:text-slate-300">
                    +{row.ozone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsGrid;
