import React, { useState } from "react";
import { X, Backpack, Check, Loader2 } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { applyItemEffect, removeItemEffect } from "../../../data/itemEffects";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../../../firebase";

const InventoryModal = ({ onClose, userData, userId }) => {
  const inventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);

  // Вспомогательная функция для получения текущих активных эффектов из данных пользователя
  const inferActiveItems = () => {
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

  // Получаем состояние, которое сейчас в БД, чтобы сравнить
  const prevActive = inferActiveItems();

  // Логика изменений: если объекты разные, значит пользователь что-то изменил
  const hasChanges =
    JSON.stringify(prevActive) !== JSON.stringify(selectedItems);

  const toggleItem = (item) => {
    if (item.category !== "digital") return;

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

      // 1. Снятые предметы
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

      // 2. Новые/изменённые предметы
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
            <Backpack className="text-emerald-500 w-8 h-8" /> Выбор эффектов
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {inventory.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-lg">
            У вас пока нет предметов
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {inventory.map((item) => {
              const isActive = selectedItems[item.category] === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item)}
                  className={`group flex flex-col items-center gap-4 p-6 rounded-3xl transition-all border-2 duration-300 transform ${
                    isActive
                      ? "bg-emerald-50 border-emerald-500 shadow-lg scale-[1.02]"
                      : "bg-white border-slate-100 hover:border-emerald-200 hover:shadow-md"
                  }`}
                >
                  <div className="text-5xl relative">
                    {item.icon || "📦"}
                    {isActive && (
                      <div className="absolute -top-2 -right-2 bg-emerald-500 rounded-full p-1.5 shadow-md">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span
                      className={`text-sm font-extrabold ${isActive ? "text-emerald-800" : "text-slate-800"}`}
                    >
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {item.desc || "Нет описания"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Теперь кнопка показывается, если есть изменения, а не просто наличие выбора */}
        {hasChanges && (
          <button
            onClick={handleApply}
            disabled={isSaving}
            className="w-full mt-8 py-5 bg-emerald-500 text-white text-lg font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-200 active:scale-[0.98] animate-in fade-in zoom-in duration-300"
          >
            {isSaving ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              "Применить изменения"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
