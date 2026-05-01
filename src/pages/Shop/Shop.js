import React, { useState } from "react";
import { SHOP_ITEMS, getItemById } from "../../data/shopItems";
import { applyItemEffect } from "../../data/itemEffects"; // Убедись, что путь верный
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  buildAutoEquipSelection,
  getItemSlot,
  inferActiveItemsFromProfile,
} from "../../services/inventoryAutomation";

// Настройки стилей для редкости
const RARITY_STYLES = {
  common: "border-slate-200 bg-slate-50",
  rare: "border-blue-200 bg-blue-50/30",
  epic: "border-purple-200 bg-purple-50/30",
  legendary: "border-yellow-200 bg-yellow-50/30",
  mythic: "border-red-200 bg-red-50/30",
};

const Shop = ({ user, profile }) => {
  const [loading, setLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const safeProfile = profile || {};

  // Фильтрация товаров
  const filteredItems =
    activeTab === "all"
      ? SHOP_ITEMS
      : SHOP_ITEMS.filter((item) => item.category === activeTab);

  const handlePurchase = async (item) => {
    if (!user?.uid || (safeProfile.ozone || 0) < item.price) return;
    setLoading(item.id);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        ozone: increment(-item.price),
        inventory: arrayUnion(item.id),
      });

      if (item.category === "digital") {
        const virtualUserData = {
          ...safeProfile,
          inventory: [...(safeProfile.inventory || []), item.id],
        };
        const bestSelection = buildAutoEquipSelection(virtualUserData);
        const currentSelection = inferActiveItemsFromProfile(safeProfile);
        const slot = getItemSlot(item);

        if (bestSelection[slot] === item.id && currentSelection[slot] !== item.id) {
          const updatePayload = {
            [`activeItems.${slot}`]: item.id,
          };
          applyItemEffect(item, safeProfile, (updatedUser) => {
            Object.assign(updatePayload, updatedUser);
          });
          await updateDoc(userRef, updatePayload);
        }
      }
      alert("Покупка успешна!");
    } catch (e) {
      alert("Ошибка покупки");
    }
    setLoading(null);
  };

  const handleEquip = async (item) => {
    if (!user?.uid) return;
    setLoading(item.id);

    try {
      const userRef = doc(db, "users", user.uid);
      const updatePayload = {
        [`activeItems.${getItemSlot(item)}`]: item.id,
      };

      // Используем твою функцию эффектов
      // Мы передаем callback, который обновит Firebase данными из эффекта
      applyItemEffect(item, safeProfile, async (updatedUser) => {
        Object.assign(updatePayload, updatedUser);
      });

      // Мы сохраняем эффект + помечаем товар как активный
      await updateDoc(userRef, updatePayload);
      alert(`Эффект "${item.name}" применен!`);
    } catch (e) {
      console.error(e);
      alert("Ошибка применения");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header и Баланс */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={20} />{" "}
            <span className="font-bold uppercase text-xs">Назад</span>
          </Link>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <Zap size={18} className="text-orange-500 fill-orange-500" />
            <span className="font-black text-lg">{safeProfile.ozone || 0} O3</span>
          </div>
        </div>

        {/* Табы */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "digital", "real", "charity"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all ${activeTab === tab ? "bg-slate-900 text-white" : "bg-white text-slate-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Список товаров */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredItems.map((item) => {
            const isOwned = safeProfile.inventory?.includes(item.id);
            const latestItem = getItemById(item.id) || item;
            const isEquipped =
              safeProfile.activeItems?.[getItemSlot(latestItem)] === item.id;
            const canAfford = (safeProfile.ozone || 0) >= item.price;

            return (
              <div
                key={item.id}
                className={`p-6 rounded-[2.5rem] border-2 shadow-sm transition-all ${RARITY_STYLES[item.rarity] || "bg-white"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{item.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                    {item.rarity}
                  </span>
                </div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{item.desc}</p>

                {isOwned ? (
                  <button
                    disabled={loading === item.id}
                    onClick={() => handleEquip(item)}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-sm ${isEquipped ? "bg-emerald-500 text-white" : "bg-white border border-emerald-500 text-emerald-500"}`}
                  >
                    {loading === item.id
                      ? "Применяем..."
                      : isEquipped
                        ? "Активно"
                        : "Применить"}
                  </button>
                ) : (
                  <button
                    disabled={!canAfford || loading === item.id}
                    onClick={() => handlePurchase(item)}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-sm ${canAfford ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
                  >
                    {loading === item.id ? "Покупка..." : `${item.price} O3`}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
