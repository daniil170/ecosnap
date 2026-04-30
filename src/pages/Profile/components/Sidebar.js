import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Zap, Trophy, LogOut, Package, X } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { applyItemEffect } from "../../../data/itemEffects";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Sidebar = ({ user, userData = {} }) => {
  const navigate = useNavigate();
  const [showInventory, setShowInventory] = useState(false);

  const myInventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);

  const handleEquip = async (item) => {
    if (!user?.uid) return;
    const userRef = doc(db, "users", user.uid);
    try {
      applyItemEffect(item, userData, async (updatedUser) => {
        await updateDoc(userRef, {
          ...updatedUser,
          [`activeItems.${item.category}`]: item.id,
        });
        alert(`Эффект "${item.name}" применён!`);
      });
    } catch (e) {
      console.error(e);
      alert("Ошибка применения");
    }
  };

  return (
    <>
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
            В БОЙ ЗА ЧИСТОТУ!
          </h2>
          <p className="text-sm leading-snug" style={{ color: "#8fa3b8" }}>
            Используй AI, сканируй мусор и получай{" "}
            <span className="text-white font-bold">+25 XP</span> и{" "}
            <span style={{ color: "#1db97e" }} className="font-bold">5 ОЗ</span>{" "}
            за каждый скан.
          </p>
        </div>

        {/* Карточка — Лига Мастеров */}
        <div className="rounded-3xl p-5" style={{ background: "#1db97e" }}>
          <p className="font-black text-white text-base italic mb-0.5">
            Лига Мастеров
          </p>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#0e7a52" }}>
            Топ игроков недели
          </p>
          <div
            className="rounded-2xl flex items-center justify-between px-4 py-3 mb-4"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <span className="text-white font-bold text-sm uppercase tracking-widest">Твоё место</span>
            <span className="text-white font-black text-3xl">#14</span>
          </div>
          <button
            onClick={() => navigate("/leaderboard")}
            className="w-full rounded-2xl py-3 font-black text-sm uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{ background: "#fff", color: "#1db97e", letterSpacing: "0.12em" }}
          >
            Открыть таблицу
          </button>
        </div>

        {/* Карточка — Маркетплейс */}
        <div
          onClick={() => navigate("/shop")}
          className="rounded-3xl p-5 cursor-pointer relative overflow-hidden"
          style={{ background: "#f57c20" }}
        >
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
          <div className="absolute right-8 -bottom-10 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-start justify-between mb-3 relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.25)" }}>
              <Zap size={20} color="#fff" fill="#fff" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>Твой баланс</p>
              <p className="text-white font-black text-2xl leading-tight">
                {(userData.ozone || 0).toLocaleString()} ОЗ
              </p>
            </div>
          </div>
          <div className="relative">
            <h3 className="text-white font-black text-lg leading-tight">Маркетплейс</h3>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.65)" }}>
              Обменяй энергию на призы
            </p>
          </div>
        </div>

        {/* Карточка — Инвентарь */}
        <button
          onClick={() => setShowInventory(true)}
          className="w-full rounded-3xl p-5 relative overflow-hidden transition-all hover:-translate-y-1 active:scale-95 text-left"
          style={{ background: "#6366f1" }}
        >
          <div className="absolute -bottom-4 -left-4 rotate-12" style={{ color: "rgba(255,255,255,0.15)" }}>
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
              Инвентарь
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.65)" }}>
              Твои предметы: {myInventory.length}
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
          <LogOut size={16} /> Выйти из аккаунта
        </button>
      </div>

      {/* INVENTORY MODAL */}
      {showInventory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)" }}>
          <div className="bg-white rounded-[2.5rem] p-10 max-w-2xl w-full shadow-2xl relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setShowInventory(false)}
              className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"
            >
              <X size={28} />
            </button>

            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-slate-900">
              Твой инвентарь
            </h2>

            {myInventory.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...myInventory]
                  .sort((a, b) => {
                    const isAActive = userData.activeItems?.[a.category] === a.id;
                    const isBActive = userData.activeItems?.[b.category] === b.id;
                    return isBActive - isAActive;
                  })
                  .map((item) => {
                    const isEquipped = userData.activeItems?.[item.category] === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`p-6 rounded-[2rem] border-2 flex flex-col items-center text-center transition-all relative ${
                          isEquipped
                            ? "border-emerald-500 bg-emerald-50/30"
                            : "border-slate-100 bg-slate-50"
                        }`}
                      >
                        {isEquipped && (
                          <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                            Активно
                          </div>
                        )}
                        <div className="text-4xl mb-4 bg-white p-3 rounded-2xl shadow-sm">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{item.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mb-4">{item.desc}</p>
                        {item.category === "digital" && (
                          <button
                            onClick={() => handleEquip(item)}
                            disabled={isEquipped}
                            className={`w-full py-3 rounded-xl font-black uppercase text-[10px] transition-all ${
                              isEquipped
                                ? "bg-emerald-500 text-white opacity-50 cursor-default"
                                : "bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                            }`}
                          >
                            {isEquipped ? "Выбрано" : "Применить"}
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-slate-400 font-bold text-sm">Инвентарь пуст</p>
                <p className="text-slate-300 text-xs mt-1">Загляни в магазин за предметами</p>
                <button
                  onClick={() => { setShowInventory(false); navigate("/shop"); }}
                  className="mt-6 bg-indigo-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all"
                >
                  Открыть магазин
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;