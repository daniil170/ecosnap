import React from 'react';
import { Leaf, Scan } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center">
      <div className="relative">
        {/* Анимированный круг-сканер вокруг */}
        <div className="absolute -inset-8 border-4 border-emerald-100 rounded-full animate-[ping_2s_infinite]" />
        <div className="absolute -inset-8 border-2 border-emerald-500/20 rounded-full animate-spin duration-[3000ms]" />
        
        {/* Иконка логотипа */}
        <div className="relative bg-emerald-600 p-6 rounded-3xl shadow-xl shadow-emerald-200 animate-bounce">
          <Leaf size={48} className="text-white" />
          
          {/* Линия сканирования */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="w-full h-1 bg-white/40 absolute top-0 animate-[scan_1.5s_infinite]" />
          </div>
        </div>
      </div>

      {/* Текст загрузки */}
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          EcoSnap <span className="text-emerald-600">AI</span>
        </h2>
        <p className="text-slate-400 text-sm mt-2 font-medium animate-pulse">
          Инициализация эко-системы...
        </p>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;