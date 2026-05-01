import React from 'react';
import { X, Target, Lightbulb, Zap, Rocket, CheckCircle2 } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-6 bg-emerald-500 rounded-full" />
              О проекте EcoSnap
            </h2>
            <p className="text-emerald-600 font-medium text-sm italic">Твой AI-помощник в сортировке отходов</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-12">
          
          {/* Блок 1 — Кто мы такие */}
          <section className="relative">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Target size={22} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">Кто мы такие</h3>
                <p className="text-slate-600 leading-relaxed">
                  Мы — команда разработчиков и энтузиастов, которым не всё равно, что происходит с окружающей средой. 
                  <span className="block mt-2 font-medium text-slate-900">EcoSnap был создан как простой и удобный инструмент, который помогает людям правильно сортировать отходы без сложных правил.</span>
                </p>
              </div>
            </div>
          </section>

          {/* Блок 2 — Проблема и AI */}
          <section className="bg-slate-50 rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" /> Почему мы это делаем
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {['Не знают правил', 'Путаются в категориях', 'Тратят время на поиск'].map((text, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 text-slate-600">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {text}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-slate-900 font-bold bg-emerald-100 py-3 rounded-xl">
              Мы решили это исправить с помощью AI.
            </p>
          </section>

          {/* Блок 3 — Как это работает (Steps) */}
          <section className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 text-center">Как это работает</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '📸', text: 'Наведи камеру' },
                { icon: '🤖', text: 'AI определит тип' },
                { icon: '♻️', text: 'Получи инструкцию' },
                { icon: '🌱', text: 'Сделай вклад' }
              ].map((step, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Блок 4 — Особенности */}
          <section>
             <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Rocket className="text-emerald-500" /> Особенности
                   </h3>
                   <ul className="space-y-3">
                      {[
                        'Мгновенное распознавание',
                        'Умные подсказки',
                        'Геймификация (эко-счёт)',
                        'Реальное влияние'
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 size={18} className="text-emerald-500" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="bg-emerald-600 rounded-3xl p-6 text-white flex flex-col justify-center">
                   <h4 className="font-bold mb-2 flex items-center gap-2 text-lg"><Zap size={20} /> Немного о нас</h4>
                   <p className="text-emerald-50 text-sm leading-relaxed opacity-90">
                     Проект создан как современное решение для нового поколения, которое хочет жить осознанно и использовать технологии во благо.
                   </p>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AboutModal;