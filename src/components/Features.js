import React from 'react';
import { Camera, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

const features = [
  { icon: <Camera />, title: "AI Сканер", desc: "Распознает мусор мгновенно через камеру." },
  { icon: <ShieldCheck />, title: "Эко-чек", desc: "Проверка правил в вашем регионе." },
  { icon: <Zap />, title: "Бонусы", desc: "Получай баллы за каждую упаковку." },
  { icon: <BarChart3 />, title: "Прогресс", desc: "Статистика твоего вклада в экологию." },
];

const Features = () => (
  <section id="features" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;