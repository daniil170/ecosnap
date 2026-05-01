import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Zap, LogOut, Package, Sparkles } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { getScanRewardsForLevel } from "../../../services/gamification";
import { getLeagueProgress } from "../../../services/leagueSystem";
import { useLanguage } from "../../../context/LanguageContext";

const Sidebar = ({
  user,
  userData = {},
  onOpenLeague,
  onOpenDigitalInventory,
  onOpenRegularInventory,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const myInventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);
  const digitalCount = myInventory.filter(
    (item) => item.category === "digital",
  ).length;
  const regularCount = myInventory.length - digitalCount;
  const currentLevel = userData.level || 1;
  const nextLevel = currentLevel + 1;
  const currentRewards = getScanRewardsForLevel(currentLevel);
  const nextRewards = getScanRewardsForLevel(nextLevel);
  const league = getLeagueProgress(userData);

  return (
    <div className="space-y-4 p-4">
      {/* Карточка — В бой за чистоту */}
      <div
        onClick={() => navigate("/scanner")}
        className="rounded-3xl p-5 cursor-pointer"
        style={{ background: "#1a2535" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
          style={{ background: "#1db97e" }}
        >
          <Camera size={20} color="#fff" />
        </div>
        <h2 className="text-white font-black text-lg leading-tight mb-1">
          {t("sidebar.fight")}
        </h2>
        <p className="text-sm leading-snug" style={{ color: "#8fa3b8" }}>
          {t("sidebar.fightDesc")}{" "}
          <span className="text-white font-bold">
            +{currentRewards.ecoScore} {t("profile.ecoScore")}
          </span>{" "}
          {t("common.and")}{" "}
          <span style={{ color: "#1db97e" }} className="font-bold">
            +{currentRewards.ozone} O3
          </span>{" "}
          {t("common.perScan")}.
        </p>
        <p className="text-xs mt-2" style={{ color: "#b3c2d1" }}>
          {t("sidebar.nextLevel")} ({nextLevel}): +{nextRewards.ecoScore}{" "}
          {t("profile.ecoScore")} {t("common.and")} +{nextRewards.ozone} O3{" "}
          {t("common.perScan")}.
        </p>
      </div>

      {/* Карточка — Лига Мастеров */}
      <div className="rounded-3xl p-5" style={{ background: "#1db97e" }}>
        <p className="font-black text-white text-base italic mb-0.5">
          {t("sidebar.league")}
        </p>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "#0e7a52" }}
        >
          {t("sidebar.leagueDesc")}
        </p>
        <div
          className="rounded-2xl flex items-center justify-between px-4 py-3 mb-4"
          style={{ background: "rgba(255,255,255,0.25)" }}
        >
          <span className="text-white font-bold text-sm uppercase tracking-widest">
            {t("sidebar.yourLeague")}
          </span>
          <span className="text-white font-black text-lg">
            {league.currentLeague.icon} {league.currentLeague.name}
          </span>
        </div>
        <div
          className="rounded-2xl flex items-center justify-between px-4 py-3 mb-4"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <span className="text-white font-bold text-sm uppercase tracking-widest">
            {t("sidebar.ecoScoreLeague")}
          </span>
          <span className="text-white font-black text-xl">
            {league.score.toLocaleString()}
          </span>
        </div>
        <p
          className="text-[11px] leading-snug mb-3"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {t("sidebar.leagueInfo")}
        </p>
        <button
          onClick={onOpenLeague}
          className="w-full rounded-2xl py-3 font-black text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
          style={{
            background: "#fff",
            color: "#1db97e",
            letterSpacing: "0.12em",
          }}
        >
          {t("sidebar.openLeagues")}
        </button>
      </div>

      {/* Карточка — Маркетплейс */}
      <div
        onClick={() => navigate("/shop")}
        className="rounded-3xl p-5 cursor-pointer relative overflow-hidden"
        style={{ background: "#f57c20" }}
      >
        <div
          className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />
        <div
          className="absolute right-8 -bottom-10 w-20 h-20 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div className="flex items-start justify-between mb-3 relative">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <Zap size={20} color="#fff" fill="#fff" />
          </div>
          <div className="text-right">
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {t("sidebar.balance")}
            </p>
            <p className="text-white font-black text-2xl leading-tight">
              {(userData.ozone || 0).toLocaleString()} ОЗ
            </p>
          </div>
        </div>
        <div className="relative">
          <h3 className="text-white font-black text-lg leading-tight">
            {t("sidebar.marketplace")}
          </h3>
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {t("sidebar.exchange")}
          </p>
        </div>
      </div>

      {/* Карточка — Цифровой инвентарь */}
      <button
        onClick={onOpenDigitalInventory}
        className="w-full rounded-3xl p-5 relative overflow-hidden transition-all hover:-translate-y-1 active:scale-95 text-left"
        style={{ background: "#6366f1" }}
      >
        <div
          className="absolute -bottom-4 -left-4 rotate-12"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <Package size={100} />
        </div>
        <div className="relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <Package size={20} color="#fff" />
          </div>
          <h3 className="text-white font-black text-lg leading-tight italic mb-0.5">
            {t("sidebar.digitalGoods")}
          </h3>
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {t("sidebar.activatable")}: {digitalCount}
          </p>
        </div>
      </button>

      {/* Карточка — Обычные товары */}
      <button
        onClick={onOpenRegularInventory}
        className="w-full rounded-3xl p-5 relative overflow-hidden transition-all hover:-translate-y-1 active:scale-95 text-left"
        style={{ background: "#0ea5e9" }}
      >
        <div
          className="absolute -bottom-5 -left-4 rotate-12"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <Sparkles size={100} />
        </div>
        <div className="relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <Package size={20} color="#fff" />
          </div>
          <h3 className="text-white font-black text-lg leading-tight italic mb-0.5">
            {t("sidebar.regularGoods")}
          </h3>
          <p
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {t("sidebar.collection")}: {regularCount}
          </p>
        </div>
      </button>

      {/* Выход */}
      <button
        onClick={() => {}}
        className="w-full flex items-center justify-center gap-2 transition-colors text-sm font-bold py-2"
        style={{ color: "#94a3b8" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
      >
        <LogOut size={16} /> {t("sidebar.logout")}
      </button>
    </div>
  );
};

export default Sidebar;
