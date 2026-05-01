import React, { useState } from "react";
import { X, Backpack, Check, Loader2 } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  buildAutoEquipSelection,
  buildInventorySyncUpdate,
  getItemSlot,
  inferActiveItemsFromProfile,
} from "../../../services/inventoryAutomation";

const InventoryModal = ({ onClose, userData, userId }) => {
  const inventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);
  const hasDigitalItems = inventory.some((item) => item.category === "digital");
  const digitalInventory = inventory.filter((item) => item.category === "digital");

  const [selectedItems, setSelectedItems] = useState(() =>
    inferActiveItemsFromProfile(userData),
  );
  const [isSaving, setIsSaving] = useState(false);

  // Получаем состояние, которое сейчас в БД, чтобы сравнить
  const { hasChanges } = buildInventorySyncUpdate(userData, selectedItems);

  const toggleItem = (item) => {
    if (item.category !== "digital") return;

    const itemSlot = getItemSlot(item);
    const { id } = item;
    setSelectedItems((prev) => {
      if (prev[itemSlot] === id) {
        const updated = { ...prev };
        delete updated[itemSlot];
        return updated;
      }
      return { ...prev, [itemSlot]: id };
    });
  };

  const handleApply = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      const userRef = doc(db, "users", userId);
      const { update } = buildInventorySyncUpdate(userData, selectedItems);
      await updateDoc(userRef, update);
      onClose();
    } catch (e) {
      console.error("Ошибка при сохранении:", e);
      alert("Ошибка сохранения, попробуйте еще раз");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAutoOptimize = () => {
    setSelectedItems(buildAutoEquipSelection(userData));
  };

  const selectedEntries = Object.entries(selectedItems)
    .map(([slot, itemId]) => ({ slot, item: getItemById(itemId) }))
    .filter(({ item }) => Boolean(item));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
            <Backpack className="text-emerald-500 w-8 h-8" /> Цифровые улучшения
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
          <>
            {hasDigitalItems && (
              <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-3">
                  Сейчас выбрано
                </div>
                {selectedEntries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedEntries.map(({ slot, item }) => (
                      <span
                        key={slot}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 border border-emerald-100"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">Пока ничего не активировано</p>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
              {digitalInventory.map((item) => {
                const itemSlot = getItemSlot(item);
                const isActive = selectedItems[itemSlot] === item.id;

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
                      {isActive && (
                        <span className="mt-1 text-[10px] uppercase tracking-wider font-black text-emerald-600">
                          Активно
                        </span>
                      )}
                      <span className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {item.desc || "Нет описания"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {!hasDigitalItems && (
              <p className="text-center text-slate-400 py-8 text-sm">
                Цифровых улучшений пока нет
              </p>
            )}
          </>
        )}

        {/* Теперь кнопка показывается, если есть изменения, а не просто наличие выбора */}
        {(hasDigitalItems || hasChanges) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAutoOptimize}
              disabled={isSaving || !hasDigitalItems}
              className="w-full py-4 bg-slate-100 text-slate-700 text-sm font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Авто-оптимизировать
            </button>
            <button
              onClick={handleApply}
              disabled={isSaving || !hasChanges}
              className="w-full py-4 bg-emerald-500 text-white text-sm font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-emerald-200 active:scale-[0.98] animate-in fade-in zoom-in duration-300"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Применить изменения"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
