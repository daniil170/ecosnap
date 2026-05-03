import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { getItemById } from '../../../data/shopItems';

const RegularInventoryModal = ({ userData, onClose }) => {
  const { t } = useLanguage();

  // Получаем и фильтруем товары
  const items = (userData.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item && item.category !== 'digital');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-center">
          {t("inventory.regular_title") || "Обычные товары"}
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-slate-500 py-4">
            {t("inventory.empty") || "Ваш инвентарь пуст"}
          </p>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {items.map((item, index) => (
              <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-white rounded-full border mr-4">
                  {item.icon || "📦"}
                </div>
                <div>
                  {/* Добавлена проверка || "fallback_key" чтобы избежать undefined в t() */}
                  <h4 className="font-bold text-sm text-slate-800">
                    {t(item.name || "inventory.unknownItem")}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.desc ? t(item.desc) : t("inventory.noDesc")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full mt-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors"
        >
          {t("inventory.close") || "Закрыть"}
        </button>
      </div>
    </div>
  );
};

export default RegularInventoryModal;