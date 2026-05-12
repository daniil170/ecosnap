import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useLanguage } from "../context/LanguageContext";
import emailjs from "@emailjs/browser"; // Импортируем библиотеку

const FeedbackSystem = ({ user }) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState("idea");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    { id: "bug", icon: "🐞", label: t("feedback.category.bug") },
    { id: "idea", icon: "💡", label: t("feedback.category.idea") },
    { id: "review", icon: "⭐", label: t("feedback.category.review") },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    // Подготовка данных для шаблона EmailJS
    const templateParams = {
      category: category,
      message: message,
      user_id: user?.uid || "Guest",
      user_email: user?.email || "No email",
      language: language,
      page_url: window.location.pathname,
      device: window.innerWidth < 768 ? "Mobile" : "Desktop",
    };

    try {
      // 1. Сохраняем в Firebase (для истории в базе)
      await addDoc(collection(db, "feedback"), {
        ...templateParams,
        timestamp: serverTimestamp(),
      });

      // 2. Отправляем письмо в Outlook через EmailJS
      // Используем переменные из твоего .env файла
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      );

      setIsSuccess(true);

      // Закрываем форму через 3 секунды после успеха
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("EmailJS/Firebase Error:", error);
      alert("Ошибка при отправке. Проверь консоль браузера.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed z-[9999] bottom-6 right-6 md:bottom-8 md:right-8 flex flex-col items-end font-sans">
      <style>
        {`
          @keyframes slideUpIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-feedback-in {
            animation: slideUpIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes ecoPulse {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.4); opacity: 0; }
            100% { transform: scale(1); opacity: 0; }
          }
          .eco-ping {
            animation: ecoPulse 2s infinite;
          }
        `}
      </style>

      {isOpen && (
        <div className="animate-feedback-in mb-4 w-[calc(100vw-3rem)] sm:w-80 overflow-hidden rounded-[2rem] border border-white/40 bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] origin-bottom-right">
          {isSuccess ? (
            <div className="p-10 text-center flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl animate-bounce">
                🌱
              </div>
              <p className="text-slate-800 font-bold leading-tight">
                {t("feedback.success")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-slate-900 font-black text-lg mb-4">
                {t("feedback.title")}
              </h3>

              <div className="flex gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex-1 py-3 px-1 rounded-2xl border transition-all duration-300 text-[10px] font-bold uppercase tracking-wider flex flex-col items-center gap-1
                      ${
                        category === cat.id
                          ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                          : "bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-slate-50"
                      }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("feedback.placeholder")}
                className="w-full h-32 p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-700 transition-all placeholder:text-slate-400"
                required
              />

              <button
                type="submit"
                disabled={isSending || !message.trim()}
                className="w-full mt-4 py-4 bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-200 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
              >
                {isSending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>{t("feedback.send")}</span>
                )}
              </button>
            </form>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 shadow-2xl active:scale-90
          ${isOpen ? "bg-white text-slate-900 rotate-90 shadow-none" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <>
            <span className="text-2xl group-hover:scale-110 transition-transform">
              💬
            </span>
            <div className="absolute inset-0 rounded-full bg-emerald-400 eco-ping" />
          </>
        )}
      </button>
    </div>
  );
};

export default FeedbackSystem;
