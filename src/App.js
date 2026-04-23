import React, { useState } from "react";
// Импорт основных компонентов
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
// Импорт модальных окон
import AuthModal from "./components/AuthModal";
import AboutModal from "./components/AboutModal"; // Тот самый импорт, который вызывал ошибку

function App() {
  // Состояния для открытия модалок
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Функции-хендлеры
  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);

  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Передаем функцию авторизации в Навбар */}
      <Navbar onAuthClick={openAuth} />

      <main>
        {/* В Hero передаем обе функции: и вход, и инфо о проекте */}
        <Hero onAuthClick={openAuth} onAboutClick={openAbout} />

        {/* Декоративная линия */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        <Features />

        {/* Секция CTA (Призыв к действию) */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Сделаем планету чище вместе
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-base md:text-lg">
                Присоединяйся к тысячам людей, которые уже используют EcoSnap.
              </p>
              <button
                onClick={openAuth}
                className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Модальные окна */}
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
      <AboutModal isOpen={isAboutOpen} onClose={closeAbout} />

      <Footer />
    </div>
  );
}

export default App;
