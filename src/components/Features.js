import React from "react";
import { Camera, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    { icon: <Camera />, title: t("features.ai"), desc: t("features.aiDesc") },
    {
      icon: <ShieldCheck />,
      title: t("features.rules"),
      desc: t("features.rulesEco"),
    },
    {
      icon: <Zap />,
      title: t("features.rewards"),
      desc: t("features.rewardsDesc"),
    },
    {
      icon: <BarChart3 />,
      title: t("features.progress"),
      desc: t("features.progressDesc"),
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xl hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-600 dark:group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
