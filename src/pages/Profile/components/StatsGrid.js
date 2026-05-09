import React from "react";
import { TrendingUp, Zap, Camera } from "lucide-react";
import { LEVEL_REWARDS, getScanRewardsForLevel } from "../../../services/gamification";
import { getItemById } from "../../../data/shopItems";
import { calculateEcoScore } from "../../../services/leagueSystem";
import { useLanguage } from "../../../context/LanguageContext";

const StatsGrid = ({ userData }) => {
  const { t } = useLanguage();
  const currentLevel = userData.level || 1;
  const nextReward = LEVEL_REWARDS.find((reward) => reward.level > currentLevel);
  const nextRewardItem =
    nextReward?.items?.length ? getItemById(nextReward.items[0]) : null;
  const levelPreview = [1, 5, 10, 15, 20, 30, 50].map((level) => ({
    level,
    ...getScanRewardsForLevel(level),
  }));

  const stats = [
    {
      label: t("profile.ecoScore"),
      val: calculateEcoScore(userData),
      icon: <TrendingUp size={20} />,
      col: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: t("profile.ozone"),
      val: userData.ozone,
      icon: <Zap size={20} />,
      col: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: t("profile.scans"),
      val: userData.scannedItems,
      icon: <Camera size={20} />,
      col: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 ${s.bg} ${s.col} rounded-xl flex items-center justify-center mb-4`}
            >
              {s.icon}
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              {s.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {s.val}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-indigo-100 rounded-[2rem] p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500">
          {t("profile.levelReward")}
        </p>
        {nextReward ? (
          <p className="mt-2 text-sm font-bold text-slate-700">
            {t("profile.nextLevel")} {nextReward.level}: +{nextReward.ozone} O3
            {nextRewardItem ? ` + ${t("common.edit")} "${t(nextRewardItem.nameKey)}"` : ""}
          </p>
        ) : (
          <p className="mt-2 text-sm font-bold text-slate-700">
            {t("profile.allRewards")}
          </p>
        )}
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-5">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
          {t("profile.scanRewards")}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest">
                <th className="text-left pb-2">{t("profile.rewardTable.level")}</th>
                <th className="text-left pb-2">{t("profile.rewardTable.ecoScore")}</th>
                <th className="text-left pb-2">{t("profile.rewardTable.ozone")}</th>
              </tr>
            </thead>
            <tbody>
              {levelPreview.map((row) => (
                <tr
                  key={row.level}
                  className={`${row.level === currentLevel ? "bg-emerald-50" : ""}`}
                >
                  <td className="py-2 font-bold text-slate-800">{row.level}</td>
                  <td className="py-2 text-slate-700">+{row.ecoScore}</td>
                  <td className="py-2 text-slate-700">+{row.ozone}</td>
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