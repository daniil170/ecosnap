import React from "react";
import { Settings, MapPin, Flame } from "lucide-react";
import { gradientMap } from "../../../data/gradients";

const ProfileHeader = ({ userData, user, onEdit }) => {
  const avatarBg = userData.profileFrame === "gold"
    ? "#facc15"
    : (gradientMap[userData.photoGradient] || gradientMap["from-emerald-500 to-teal-600"]);

  return (
    <div className={`bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-10 relative
      ${userData.profileBackground === "animated_space"
        ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        : ""}`}
    >
      <div className="relative flex-shrink-0">
        <div
          className="w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl p-1"
          style={{ background: avatarBg }}
        >
          <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            {userData.photoURL ? (
              <img src={userData.photoURL} className="w-full h-full object-cover" alt="Avatar" />
            ) : (
              <span className="text-white text-5xl font-bold">
                {(userData.firstName || user?.email)?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>
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

        <div className="flex items-center gap-2 justify-center md:justify-start text-emerald-600 font-bold text-sm mt-1">
          <span>@{userData.displayName || "eco_hero"}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span className="flex items-center gap-1 text-slate-400">
            <MapPin size={14} /> {userData.city || "Не указан"}, {userData.country || "Земля"}
          </span>
        </div>

        <div className="mt-6 max-w-md mx-auto md:mx-0">
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2 px-1 tracking-widest">
            <span>Уровень {userData.level}</span>
            <span>{userData.xp % 100} / 100 XP</span>
          </div>
          <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50 p-0.5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
              style={{ width: `${Math.min(userData.xp % 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="p-4 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all active:scale-95 bg-white shadow-sm"
      >
        <Settings className="text-slate-400" size={24} />
      </button>
    </div>
  );
};

export default ProfileHeader;