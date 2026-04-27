import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// Импорт основных компонентов
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Scanner from "./components/Scanner";
import AuthModal from "./components/AuthModal";
import AboutModal from "./components/AboutModal";
import Profile from "./pages/Profile/Profile"; // НОВЫЙ ИМПОРТ

function App() {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Routes>
          {/* ГЛАВНАЯ СТРАНИЦА */}
          <Route
            path="/"
            element={
              <>
                <Navbar onAuthClick={openAuth} user={user} />
                <main>
                  <Hero
                    onAuthClick={openAuth}
                    onAboutClick={openAbout}
                    user={user}
                  />
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  </div>
                  <Features />

                  <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px]" />
                      <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                          {user
                            ? "Рады видеть вас снова!"
                            : "Сделаем планету чище вместе"}
                        </h2>
                        {!user && (
                          <button
                            onClick={openAuth}
                            className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20"
                          >
                            Зарегистрироваться
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                </main>
                <Footer />
              </>
            }
          />

          {/* СТРАНИЦА ПРОФИЛЯ */}
          <Route
            path="/profile"
            element={
              user ? (
                <>
                  <Navbar onAuthClick={openAuth} user={user} />
                  <Profile user={user} />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* СТРАНИЦА СКАНЕРА */}
          <Route
            path="/scanner"
            element={user ? <Scanner /> : <Navigate to="/" />}
          />
        </Routes>

        <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
        <AboutModal isOpen={isAboutOpen} onClose={closeAbout} />
      </div>
    </Router>
  );
}

export default App;
