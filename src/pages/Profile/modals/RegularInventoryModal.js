import React from "react";
import { X, Package } from "lucide-react";
import { getItemById } from "../../../data/shopItems";

const RegularInventoryModal = ({ onClose, userData }) => {
  const regularItems = (userData?.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item && item.category !== "digital");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
            <Package className="text-indigo-500 w-8 h-8" /> Обычные товары
          </h2>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {regularItems.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-lg">
            Обычных товаров пока нет
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
            {regularItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl border-2 border-slate-100 bg-white"
              >
                <div className="text-5xl">{item.icon || "📦"}</div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-extrabold text-slate-800">
                    {item.name}
                  </span>
                  <span className="mt-1 text-[10px] uppercase tracking-wider font-black text-indigo-600">
                    {item.category === "charity" ? "Благотворительность" : "Обычный товар"}
                  </span>
                  <span className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {item.desc || "Нет описания"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegularInventoryModal;
