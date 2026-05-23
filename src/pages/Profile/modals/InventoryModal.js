import React, { useState } from "react";
import { X, Backpack, Check, Loader2 } from "lucide-react";
import { getItemById } from "../../../data/shopItems";
import { useLanguage } from "../../../context/LanguageContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import {
  buildAutoEquipSelection,
  buildInventorySyncUpdate,
  getItemSlot,
  inferActiveItemsFromProfile,
} from "../../../services/inventoryAutomation";

const InventoryModal = ({ onClose, userData, userId }) => {
  const { t } = useLanguage();

  const inventory = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter(Boolean);

  const hasDigitalItems = inventory.some((item) => item.category === "digital");
  const digitalInventory = inventory.filter(
    (item) => item.category === "digital",
  );

  const [selectedItems, setSelectedItems] = useState(() =>
    inferActiveItemsFromProfile(userData),
  );

  const [isSaving, setIsSaving] = useState(false);

  const { hasChanges } = buildInventorySyncUpdate(userData, selectedItems);

  const toggleItem = (item) => {
    if (item.category !== "digital") return;

    const slot = getItemSlot(item);

    setSelectedItems((prev) => {
      if (prev[slot] === item.id) {
        const copy = { ...prev };
        delete copy[slot];
        return copy;
      }
      return { ...prev, [slot]: item.id };
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
      console.error(e);
      alert(t("inventory.saveError"));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAutoOptimize = () => {
    setSelectedItems(buildAutoEquipSelection(userData));
  };

  const selectedEntries = Object.entries(selectedItems)
    .map(([slot, itemId]) => ({
      slot,
      item: getItemById(itemId),
    }))
    .filter(({ item }) => item);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl transition-colors duration-300">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3 transition-colors duration-300">
            <Backpack className="text-emerald-500 dark:text-emerald-400 w-8 h-8 transition-colors duration-300" />
            {t("inventory.title")}
          </h2>

          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-300"
          >
            <X
              size={24}
              className="text-slate-400 dark:text-slate-500 transition-colors duration-300"
            />
          </button>
        </div>

        {/* EMPTY */}
        {inventory.length === 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500 py-12 text-lg transition-colors duration-300">
            {t("inventory.noItems")}
          </p>
        ) : (
          <>
            {/* SELECTED BLOCK */}
            {hasDigitalItems && (
              <div className="mb-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-900/20 p-4 transition-colors duration-300">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 transition-colors duration-300 mb-3">
                  {t("inventory.selected")}
                </div>

                {selectedEntries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedEntries.map(({ slot, item }) => (
                      <span
                        key={slot}
                        className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-emerald-100 dark:border-emerald-900/50 transition-colors duration-300"
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    {t("inventory.noneActive")}
                  </p>
                )}
              </div>
            )}

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
              {digitalInventory.map((item) => {
                const slot = getItemSlot(item);
                const isActive = selectedItems[slot] === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item)}
                    className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/30 border-emerald-500 dark:border-emerald-400 shadow-lg dark:shadow-emerald-900/50 scale-[1.02]"
                        : "bg-white dark:bg-slate-700 border-slate-100 dark:border-slate-600 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:shadow-md dark:hover:shadow-slate-900/30"
                    }`}
                  >
                    <div className="text-5xl relative">
                      {item.icon || "📦"}

                      {isActive && (
                        <div className="absolute -top-2 -right-2 bg-emerald-500 dark:bg-emerald-400 rounded-full p-1.5 transition-colors duration-300">
                          <Check
                            size={16}
                            className="text-white dark:text-slate-900 transition-colors duration-300"
                          />
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <div
                        className={`text-sm font-extrabold transition-colors duration-300 ${
                          isActive
                            ? "text-emerald-800 dark:text-emerald-300"
                            : "text-slate-800 dark:text-white"
                        }`}
                      >
                        {t(item.nameKey)}
                      </div>

                      {isActive && (
                        <div className="text-[10px] uppercase font-black text-emerald-600 dark:text-emerald-400 mt-1 transition-colors duration-300">
                          {t("inventory.active")}
                        </div>
                      )}

                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 transition-colors duration-300">
                        {item.descKey ? t(item.descKey) : t("inventory.noDesc")}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {!hasDigitalItems && (
              <p className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm transition-colors duration-300">
                {t("inventory.noDigital")}
              </p>
            )}
          </>
        )}

        {/* ACTIONS */}
        {(hasDigitalItems || hasChanges) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAutoOptimize}
              disabled={isSaving || !hasDigitalItems}
              className="w-full py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {t("inventory.autoOptimize")}
            </button>

            <button
              onClick={handleApply}
              disabled={isSaving || !hasChanges}
              className="w-full py-4 bg-emerald-500 dark:bg-emerald-600 text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isSaving ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                t("inventory.apply")
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryModal;
