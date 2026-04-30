import React from "react";
import { X, Backpack, Zap } from "lucide-react";

const InventoryModal = ({ onClose, userData, onUseItem }) => {
  // Проверяем, есть ли инвентарь, если нет — пустой массив
  const inventory = userData.inventory || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            <Backpack className="text-emerald-500" /> Мой инвентарь
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        {inventory.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {inventory.map((item, index) => (
              <button
                key={index}
                onClick={() => onUseItem(item)}
                className="group flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl transition-all border border-transparent hover:border-emerald-100"
              >
                <div className="text-3xl">{item.icon || "📦"}</div>
                <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400">
            <Backpack size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-bold">Инвентарь пуст</p>
            <p className="text-sm">Сканируй мусор, чтобы найти предметы!</p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-400">
          <span>Всего предметов: {inventory.length}</span>
          <span className="flex items-center gap-1 text-emerald-600">
            <Zap size={14} /> Энергия активна
          </span>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;