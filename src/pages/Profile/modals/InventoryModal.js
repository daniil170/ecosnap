import React, { useState } from "react";
import { X, Backpack, Check, Loader2 } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { applyItemEffect, removeItemEffect } from "../../../data/itemEffects";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

const InventoryModal = ({ onClose, userData, userId }) => {
  const inventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined && item.category === "digital");

  // Восстанавливаем активные предметы из реальных эффектов в userData
  console.log("userData.inventory:", userData.inventory);
console.log("inventory после map+filter:", inventory);
  // чтобы не зависеть от activeItems который мог рассинхронизироваться
  const inferActiveItems = () => {
  console.log("inventory внутри infer:", inventory);
  console.log("userData.badges:", userData.badges);
  const result = {};
    for (const item of inventory) {
      switch (item.id) {
        case "recycle_badge":
          if (userData.badges?.includes("recycle"))
            result[item.category] = item.id;
          break;
        case "founder_badge":
          if (userData.badges?.includes("founder"))
            result[item.category] = item.id;
          break;
        case "animated_avatar":
          if (userData.avatarEffect === "animated")
            result[item.category] = item.id;
          break;
        case "nickname_color":
          if (userData.nicknameColor === "rainbow")
            result[item.category] = item.id;
          break;
        case "golden_frame":
          if (userData.profileFrame === "gold") result[item.category] = item.id;
          break;
        case "profile_background_animated":
          if (userData.profileBackground === "animated_space")
            result[item.category] = item.id;
          break;
        case "eco_title":
          if (userData.title === "Эко-герой") result[item.category] = item.id;
          break;
        case "eco_trail":
          if (userData.trailEffect === "leaves")
            result[item.category] = item.id;
          break;
        case "green_theme":
          if (userData.activeTheme === "green") result[item.category] = item.id;
          break;
        default:
          break;
      }
    }
    return result;
  };

  const [selectedItems, setSelectedItems] = useState(inferActiveItems);
  const [isSaving, setIsSaving] = useState(false);

  const toggleItem = (item) => {
    const { category, id } = item;
    setSelectedItems((prev) => {
      if (prev[category] === id) {
        const updated = { ...prev };
        delete updated[category];
        return updated;
      }
      return { ...prev, [category]: id };
    });
  };

  const handleApply = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const userRef = doc(db, "users", userId);
      const update = {};
      const prevActive = inferActiveItems(); // берём из реальных эффектов, не из activeItems

      // 1. Снятые предметы — удаляем из activeItems и сбрасываем эффекты
      for (const [category, itemId] of Object.entries(prevActive)) {
        if (selectedItems[category] !== itemId) {
          update[`activeItems.${category}`] = deleteField();

          const removalFields = removeItemEffect(itemId, userData);
          if (removalFields) {
            for (const [field, value] of Object.entries(removalFields)) {
              update[field] = value === null ? deleteField() : value;
            }
          }
        }
      }

      // 2. Новые/изменённые предметы — применяем эффект и пишем в activeItems
      for (const [category, itemId] of Object.entries(selectedItems)) {
        update[`activeItems.${category}`] = itemId;

        if (prevActive[category] !== itemId) {
          const item = getItemById(itemId);
          if (item) {
            applyItemEffect(item, userData, (updatedUser) => {
              for (const [field, value] of Object.entries(updatedUser)) {
                if (
                  field !== "inventory" &&
                  field !== "activeItems" &&
                  value !== userData[field]
                ) {
                  update[field] = value;
                }
              }
            });
          }
        }
      }

      await updateDoc(userRef, update);
      onClose();
    } catch (e) {
      console.error("Ошибка при сохранении:", e);
      alert("Ошибка сохранения, попробуйте еще раз");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Backpack className="text-emerald-500" /> Выбор эффектов
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {inventory.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            У вас пока нет цифровых предметов
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {inventory.map((item) => {
              const isActive = selectedItems[item.category] === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  className={`group flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 duration-200 ${
                    isActive
                      ? "bg-emerald-50 border-emerald-500 shadow-inner"
                      : "bg-slate-50 border-transparent hover:border-emerald-200"
                  }`}
                >
                  <div className="text-3xl relative">
                    {item.icon || "📦"}
                    {isActive && (
                      <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold ${isActive ? "text-emerald-700" : "text-slate-500"}`}
                  >
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={handleApply}
          disabled={isSaving}
          className="w-full mt-6 py-4 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Применить изменения"
          )}
        </button>
      </div>
    </div>
  );
};

export default InventoryModal;
