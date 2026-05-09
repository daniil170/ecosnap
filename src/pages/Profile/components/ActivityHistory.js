import React from "react";
import { History, Camera, Zap, Award, Recycle } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

const localeMap = {
  ru: "ru-RU",
  en: "en-US",
  de: "de-DE",
};

const ActivityHistory = ({ activityHistory }) => {
  const { t, language } = useLanguage();
  const locale = localeMap[language] || "en-US";
  // Функция для выбора иконки в зависимости от типа активности
  const getActivityIcon = (type) => {
    switch (type) {
      case "scan": return <Camera size={18} className="text-emerald-500" />;
      case "achievement": return <Award size={18} className="text-yellow-500" />;
      case "recycle": return <Recycle size={18} className="text-blue-500" />;
      default: return <Zap size={18} className="text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <h3 className="text-xl font-extrabold flex items-center gap-2 uppercase tracking-tight text-slate-800 mb-6">
        <History size={24} className="text-slate-400" /> {t("activityHistory.title")}
      </h3>

      {activityHistory && activityHistory.length > 0 ? (
        <div className="space-y-4">
          {activityHistory.map((act, index) => {
            const formattedDate =
              new Date(act.date).toLocaleDateString(locale) +
              " " +
              new Date(act.date).toLocaleTimeString(locale, {
                hour: "2-digit",
                minute: "2-digit",
              });
            return (
              <div 
                key={index} 
                className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="p-3 bg-slate-100 rounded-xl">
                  {getActivityIcon(act.type)}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{act.description}</p>
                  <p className="text-xs text-slate-400">{formattedDate}</p>
                </div>
                <div className="font-black text-emerald-500">
                  +{act.ecoScore ?? act.xp ?? 0} ECO
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400">
          <p>{t("activityHistory.empty")}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;