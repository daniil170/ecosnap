import React from "react";
import { TrendingUp, Zap, Camera } from "lucide-react";

const StatsGrid = ({ userData }) => {
  const stats = [
    {
      label: "Очки опыта",
      val: userData.xp,
      icon: <TrendingUp size={20} />,
      col: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Валюта O3",
      val: userData.ozone,
      icon: <Zap size={20} />,
      col: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Сканы",
      val: userData.scannedItems,
      icon: <Camera size={20} />,
      col: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
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
  );
};

export default StatsGrid;