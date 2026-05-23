import React from "react";
import { X } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { getItemById } from "../../../data/shopItems";

const RegularInventoryModal = ({ userData, onClose }) => {
  const { t } = useLanguage();

  // Получаем и фильтруем товары
  const items = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item && item.category !== "digital");

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-slate-900 dark:text-white transition-colors duration-300">
          {t("inventory.regular_title") || "Обычные товары"}
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-4 transition-colors duration-300">
            {t("inventory.empty") || "Ваш инвентарь пуст"}
          </p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 transition-colors duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-600 mr-4 transition-colors duration-300">
                  {item.icon || "📦"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white transition-colors duration-300">
                    {t(item.nameKey || "inventory.unknownItem")}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    {item.descKey ? t(item.descKey) : t("inventory.noDesc")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-emerald-600 dark:bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 dark:hover:bg-emerald-500 transition-colors duration-300"
        >
          {t("inventory.close") || "Закрыть"}
        </button>
      </div>
    </div>
  );
};

export default RegularInventoryModal;
