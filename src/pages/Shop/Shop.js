import React, { useState } from "react";
import { SHOP_ITEMS, getItemById } from "../../data/shopItems";
import { applyItemEffect } from "../../data/itemEffects";
import { db } from "../../firebase";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";
import { Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  buildAutoEquipSelection,
  getItemSlot,
  inferActiveItemsFromProfile,
} from "../../services/inventoryAutomation";
import { useLanguage } from "../../context/LanguageContext";

const RARITY_STYLES = {
  common:
    "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800",
  rare: "border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-900/20",
  epic: "border-purple-200 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-900/20",
  legendary:
    "border-yellow-200 dark:border-yellow-900/50 bg-yellow-50/30 dark:bg-yellow-900/20",
  mythic:
    "border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-900/20",
};

const Shop = ({ user, profile }) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const safeProfile = profile || {};

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

        if (
          bestSelection[slot] === item.id &&
          currentSelection[slot] !== item.id
        ) {
          const updatePayload = {
            [`activeItems.${slot}`]: item.id,
          };

          applyItemEffect(item, safeProfile, (updatedUser) => {
            Object.assign(updatePayload, updatedUser);
          });

          await updateDoc(userRef, updatePayload);
        }
      }

      alert(t("shop.successBuy"));
    } catch (e) {
      console.error(e);
      alert(t("shop.errorBuy"));
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

      applyItemEffect(item, safeProfile, (updatedUser) => {
        Object.assign(updatePayload, updatedUser);
      });

      await updateDoc(userRef, updatePayload);

      alert(t("shop.successEquip"));
    } catch (e) {
      console.error(e);
      alert(t("shop.errorEquip"));
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-12 px-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} />
            <span className="font-bold uppercase text-xs">
              {t("shop.back")}
            </span>
          </Link>

          <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 transition-colors duration-300">
            <Zap
              size={18}
              className="text-orange-500 dark:text-orange-400 fill-orange-500 dark:fill-orange-400 transition-colors duration-300"
            />
            <span className="font-black text-lg text-slate-900 dark:text-white transition-colors duration-300">
              {safeProfile.ozone || 0} {t("profile.ozoneShort")}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "all", label: t("shop.tabAll") },
            { id: "digital", label: t("shop.tabDigital") },
            { id: "real", label: t("shop.tabReal") },
            { id: "charity", label: t("shop.tabCharity") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 dark:bg-emerald-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items */}
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
                className={`p-6 rounded-[2.5rem] border-2 shadow-sm transition-all ${
                  RARITY_STYLES[item.rarity] || "bg-white dark:bg-slate-800"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{item.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-slate-700 dark:text-slate-300 transition-colors duration-300">
                    {item.rarity}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white transition-colors duration-300">
                  {t(item.nameKey)}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 transition-colors duration-300">
                  {t(item.descKey)}
                </p>

                {isOwned ? (
                  <button
                    disabled={loading === item.id}
                    onClick={() => handleEquip(item)}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-sm transition-all ${
                      isEquipped
                        ? "bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-500"
                        : "bg-white dark:bg-slate-700 border border-emerald-500 dark:border-emerald-400 text-emerald-500 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-600"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === item.id
                      ? t("shop.equipLoading")
                      : isEquipped
                        ? t("shop.active")
                        : t("shop.equip")}
                  </button>
                ) : (
                  <button
                    disabled={!canAfford || loading === item.id}
                    onClick={() => handlePurchase(item)}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-sm transition-all ${
                      canAfford
                        ? "bg-slate-900 dark:bg-emerald-600 text-white hover:bg-slate-800 dark:hover:bg-emerald-500"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading === item.id
                      ? t("shop.buyLoading")
                      : `${item.price} O3`}
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
