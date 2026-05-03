import React from "react";
import { X, Target, Lightbulb, Zap, Rocket, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const AboutModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in duration-300">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <div className="w-2 h-6 bg-emerald-500 rounded-full" />
              {t("about.title")}
            </h2>
            <p className="text-emerald-600 font-medium text-sm italic">
              {t("about.subtitle")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-12">
          <section className="relative">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Target size={22} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {t("about.whoTitle")}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t("about.whoDesc")}
                  <span className="block mt-2 font-medium text-slate-900">
                    {t("about.whoMission")}
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 rounded-[2rem] p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" /> {t("about.whyTitle")}
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                t("about.problems.1"),
                t("about.problems.2"),
                t("about.problems.3"),
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2 text-slate-600"
                >
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {text}
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-slate-900 font-bold bg-emerald-100 py-3 rounded-xl">
              {t("about.solution")}
            </p>
          </section>

          <section className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 text-center">
              {t("about.howTitle")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "📸", text: t("about.steps.1") },
                { icon: "🤖", text: t("about.steps.2") },
                { icon: "♻️", text: t("about.steps.3") },
                { icon: "🌱", text: t("about.steps.4") },
              ].map((step, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Rocket className="text-emerald-500" />{" "}
                  {t("about.featuresTitle")}
                </h3>
                <ul className="space-y-3">
                  {[
                    t("about.featuresList.1"),
                    t("about.featuresList.2"),
                    t("about.featuresList.3"),
                    t("about.featuresList.4"),
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-slate-600"
                    >
                      <CheckCircle2 size={18} className="text-emerald-500" />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-emerald-600 rounded-3xl p-6 text-white flex flex-col justify-center">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-lg">
                  <Zap size={20} /> {t("about.aboutUsTitle")}
                </h4>
                <p className="text-emerald-50 text-sm leading-relaxed opacity-90">
                  {t("about.aboutUsDesc")}
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
