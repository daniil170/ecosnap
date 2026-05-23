import React from "react";
import { X, Trophy, ArrowUpRight } from "lucide-react";
import { ECO_LEAGUES, getLeagueProgress } from "../../../services/leagueSystem";
import { useLanguage } from "../../../context/LanguageContext";

const LeagueModal = ({ userData, onClose }) => {
  const { t } = useLanguage();
  const { score, currentLeague, nextLeague, progressPct, pointsToNext } =
    getLeagueProgress(userData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 w-full max-w-3xl shadow-2xl transition-colors duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2 transition-colors duration-300">
            <Trophy className="text-emerald-500 dark:text-emerald-400 transition-colors duration-300" />{" "}
            {t("leagues.title")}
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

        <div
          className={`rounded-3xl p-5 bg-gradient-to-r ${currentLeague.color} text-white mb-5 transition-colors duration-300`}
        >
          <p className="text-xs uppercase tracking-widest font-black opacity-80">
            {t("leagues.currentLeague")}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">{currentLeague.icon}</span>
            <div>
              <p className="text-xl font-black">{t(currentLeague.nameKey)}</p>
              <p className="text-sm opacity-90">{t(currentLeague.descKey)}</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-bold">
            {t("profile.ecoScore")}: {score.toLocaleString()}
          </p>
          {nextLeague ? (
            <>
              <div className="mt-3 h-2.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold opacity-90">
                {t("leagues.toNextLeague")} {t(nextLeague.nameKey)}:{" "}
                {pointsToNext.toLocaleString()} {t("leagues.points")}
              </p>
            </>
          ) : (
            <p className="mt-2 text-xs font-bold opacity-90">
              {t("leagues.maxReached")}
            </p>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-3 max-h-[45vh] overflow-y-auto pr-1">
          {ECO_LEAGUES.map((league) => {
            const isCurrent = league.id === currentLeague.id;
            const isUnlocked = score >= league.minScore;

            return (
              <div
                key={league.id}
                className={`rounded-2xl border p-4 transition-all ${
                  isCurrent
                    ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/30"
                    : isUnlocked
                      ? "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700/50"
                      : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-75"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{league.icon}</span>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-white transition-colors duration-300">
                        {t(league.nameKey)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                        {t(league.descKey)}
                      </p>
                    </div>
                  </div>
                  {isCurrent && (
                    <ArrowUpRight
                      size={16}
                      className="text-emerald-500 dark:text-emerald-400 transition-colors duration-300"
                    />
                  )}
                </div>
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 transition-colors duration-300">
                  {t("leagues.threshold")}: {league.minScore.toLocaleString()}{" "}
                  {t("leagues.points")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeagueModal;
