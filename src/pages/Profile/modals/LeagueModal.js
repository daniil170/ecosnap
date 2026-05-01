import React from "react";
import { X, Trophy, ArrowUpRight } from "lucide-react";
import { ECO_LEAGUES, getLeagueProgress } from "../../../services/leagueSystem";

const LeagueModal = ({ userData, onClose }) => {
  const {
    score,
    currentLeague,
    nextLeague,
    progressPct,
    pointsToNext,
  } = getLeagueProgress(userData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
            <Trophy className="text-emerald-500" /> Лиги EcoSnap
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={22} className="text-slate-400" />
          </button>
        </div>

        <div
          className={`rounded-3xl p-5 bg-gradient-to-r ${currentLeague.color} text-white mb-5`}
        >
          <p className="text-xs uppercase tracking-widest font-black opacity-80">
            Текущая лига
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl">{currentLeague.icon}</span>
            <div>
              <p className="text-xl font-black">{currentLeague.name}</p>
              <p className="text-sm opacity-90">{currentLeague.desc}</p>
            </div>
          </div>
          <p className="mt-4 text-sm font-bold">Эко-счёт: {score.toLocaleString()}</p>
          {nextLeague ? (
            <>
              <div className="mt-3 h-2.5 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-bold opacity-90">
                До {nextLeague.name}: {pointsToNext.toLocaleString()} очков
              </p>
            </>
          ) : (
            <p className="mt-2 text-xs font-bold opacity-90">
              Максимальная лига достигнута. Ты легенда экосистемы!
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
                    ? "border-emerald-300 bg-emerald-50"
                    : isUnlocked
                      ? "border-slate-200 bg-white"
                      : "border-slate-100 bg-slate-50 opacity-75"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{league.icon}</span>
                    <div>
                      <p className="font-bold text-slate-800">{league.name}</p>
                      <p className="text-xs text-slate-500">{league.desc}</p>
                    </div>
                  </div>
                  {isCurrent && <ArrowUpRight size={16} className="text-emerald-500" />}
                </div>
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-slate-500">
                  Порог: {league.minScore.toLocaleString()} очков
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
