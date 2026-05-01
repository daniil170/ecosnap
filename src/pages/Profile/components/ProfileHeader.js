import React from "react";
import { Settings, MapPin, Flame, Leaf, Sparkles } from "lucide-react";
import { gradientMap } from "../../../data/gradients";
import { calculateEcoScore } from "../../../services/leagueSystem";
import { useLanguage } from "../../../context/LanguageContext";

const ProfileHeader = ({ userData, user, onEdit }) => {
  const { t } = useLanguage();
  const isGreenTheme = userData.activeTheme === "green";
  const hasAnimatedAvatar = userData.avatarEffect === "animated";
  const hasTrail = userData.trailEffect === "leaves";
  const hasStickerPack = userData.stickerPacks?.includes("eco_pack");
  const hasGoldFrame = userData.profileFrame === "gold";
  const ecoScore = calculateEcoScore(userData);

  const avatarBg =
    gradientMap[userData.photoGradient] ||
    gradientMap["from-emerald-500 to-teal-600"];

  return (
    <div className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden
      ${isGreenTheme ? "bg-gradient-to-r from-emerald-50 via-teal-50 to-lime-50 border-emerald-200" : ""}
      ${userData.profileBackground === "animated_space"
        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        : ""}`}
    >
      {hasTrail && (
        <>
          <div className="pointer-events-none absolute inset-0">
            <Leaf className="absolute left-4 top-6 text-emerald-400/60 w-4 h-4 animate-pulse" />
            <Leaf className="absolute left-16 top-16 text-lime-400/60 w-3 h-3 animate-bounce" />
            <Leaf className="absolute right-16 top-10 text-emerald-300/60 w-4 h-4 animate-pulse" />
            <Leaf className="absolute right-8 top-28 text-lime-300/60 w-3 h-3 animate-bounce" />
            <Leaf className="absolute left-1/3 bottom-6 text-emerald-400/60 w-4 h-4 animate-pulse" />
            <Leaf className="absolute right-1/4 bottom-4 text-lime-400/60 w-3 h-3 animate-bounce" />
          </div>
        </>
      )}

      <div className="relative flex-shrink-0">
        <div
          className={`w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl p-1 ${hasAnimatedAvatar ? "animate-pulse" : ""} ${hasGoldFrame ? "ring-4 ring-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.45)]" : ""}`}
          style={{ background: avatarBg }}
        >
          <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            {userData.photoURL ? (
              <img src={userData.photoURL} className="w-full h-full object-cover" alt="Avatar" />
            ) : (
              <span className="text-white text-5xl font-bold drop-shadow-sm">
                {(userData.firstName || user?.email)?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
        {hasAnimatedAvatar && (
          <div className="pointer-events-none absolute -inset-2 rounded-[2.8rem] border-2 border-cyan-300/60 animate-ping" />
        )}
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3.5 py-1.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5">
          <Flame size={18} className="fill-white" />
          <span className="font-bold text-md">{userData.streak}</span>
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <h1 className={`text-3xl font-extrabold tracking-tight ${
          userData.nicknameColor === "rainbow"
            ? "bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent"
            : "text-slate-900"
        }`}>
          {userData.firstName} {userData.lastName}
        </h1>

        <div className="flex gap-2 mt-2 flex-wrap justify-center md:justify-start">
          {userData.badges?.includes("recycle") && (
            <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full font-bold">♻️ Эко</span>
          )}
          {userData.badges?.includes("founder") && (
            <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-bold">👑 Founder</span>
          )}
        </div>

        {userData.title && (
          <div className="mt-1 text-xs font-black uppercase text-emerald-500">{userData.title}</div>
        )}

        {hasStickerPack && (
          <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
              Стикеры:
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-bold">
              <Sparkles size={12} /> Eco Pack
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 justify-center md:justify-start text-emerald-600 font-bold text-sm mt-1">
          <span>@{userData.displayName || "eco_hero"}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin size={14} /> {userData.city || t("profile.notSpecified")}, {userData.country || t("profile.earth")}
          </span>
        </div>

        <div className="mt-6 max-w-md mx-auto md:mx-0">
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2 px-1 tracking-widest">
            <span>{t("profile.level")} {userData.level}</span>
            <span>{ecoScore % 100} / 100 ECO</span>
          </div>
          <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50 p-0.5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              style={{ width: `${Math.min(ecoScore % 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onEdit}
        className={`p-4 hover:bg-slate-50 rounded-2xl border transition-all active:scale-95 shadow-sm ${isGreenTheme ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-100"}`}
      >
        <Settings className="text-slate-400" size={24} />
      </button>
    </div>
  );
};

export default ProfileHeader;