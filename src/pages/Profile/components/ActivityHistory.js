import React, { useState } from "react";
import {
  History,
  Camera,
  Zap,
  Award,
  Recycle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

const localeMap = {
  ru: "ru-RU",
  en: "en-US",
  de: "de-DE",
};

const ActivityHistory = ({ activityHistory }) => {
  const { t, language } = useLanguage();
  const locale = localeMap[language] || "en-US";

  const [visibleCount, setVisibleCount] = useState(5);

  const getActivityIcon = (type) => {
    switch (type) {
      case "scan":
        return (
          <Camera
            size={18}
            className="text-emerald-500 dark:text-emerald-400"
          />
        );
      case "achievement":
        return (
          <Award size={18} className="text-yellow-500 dark:text-yellow-400" />
        );
      case "recycle":
        return (
          <Recycle size={18} className="text-blue-500 dark:text-blue-400" />
        );
      default:
        return <Zap size={18} className="text-slate-400 dark:text-slate-500" />;
    }
  };

  const toggleVisibility = () => {
    // Если видим все элементы, сворачиваем до 5. Если нет — показываем все.
    if (visibleCount >= activityHistory.length) {
      setVisibleCount(5);
    } else {
      setVisibleCount(activityHistory.length);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <h3 className="text-xl font-extrabold flex items-center gap-2 uppercase tracking-tight text-slate-800 dark:text-white mb-6">
        <History size={24} className="text-slate-400 dark:text-slate-500" />
        {t("activityHistory.title")}
      </h3>

      {activityHistory && activityHistory.length > 0 ? (
        <div className="space-y-4">
          <div
            className={`space-y-4 overflow-y-auto pr-2 custom-scrollbar ${activityHistory.length > 5 ? "max-h-[400px]" : ""}`}
          >
            {activityHistory.slice(0, visibleCount).map((act, index) => {
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
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-2xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-600 duration-300"
                >
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl transition-colors duration-300">
                    {getActivityIcon(act.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {act.description}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {formattedDate}
                    </p>
                  </div>
                  <div className="font-black text-emerald-500 dark:text-emerald-400">
                    +{act.ecoScore ?? act.xp ?? 0} ECO
                  </div>
                </div>
              );
            })}
          </div>

          {/* Кнопка теперь работает в обе стороны */}
          {activityHistory.length > 5 && (
            <button
              onClick={toggleVisibility}
              className="w-full flex items-center justify-center gap-2 py-3 mt-4 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-50 dark:bg-slate-900/30 rounded-2xl transition-all hover:scale-[1.01]"
            >
              {visibleCount >= activityHistory.length
                ? t("activityHistory.showLess") || "Свернуть"
                : t("activityHistory.showMore") || "Показать все"}
              {visibleCount >= activityHistory.length ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
          <p>{t("activityHistory.empty")}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;
