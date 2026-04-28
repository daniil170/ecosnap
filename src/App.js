import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { auth, db } from "./firebase"; // Добавили db
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore"; // Для работы с профилем

// Импорт основных компонентов
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Scanner from "./components/Scanner";
import AuthModal from "./components/AuthModal";
import AboutModal from "./components/AboutModal";
import Profile from "./pages/Profile/Profile";

function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null); // Состояние для данных геймификации
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Ссылка на документ пользователя
        const userRef = doc(db, "users", currentUser.uid);

        // 1. Проверяем, существует ли профиль, если нет — создаем
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          const newProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            xp: 0,
            level: 1,
            ozone: 0,
            streak: 0,
            lastScanDate: null,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
        }

        // 2. Подписываемся на обновления профиля в реальном времени
        const unsubProfile = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            setUserProfile(doc.data());
          }
        });

        setLoading(false);
        return () => unsubProfile();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const openAuth = () => setIsAuthOpen(true);
  const closeAuth = () => setIsAuthOpen(false);
  const openAbout = () => setIsAboutOpen(true);
  const closeAbout = () => setIsAboutOpen(false);

  if (loading) return null; // Или спиннер загрузки

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <Routes>
          {/* ГЛАВНАЯ СТРАНИЦА */}
          <Route
            path="/"
            element={
              <>
                <Navbar
                  onAuthClick={openAuth}
                  user={user}
                  profile={userProfile}
                />
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
                            ? `Рады видеть вас, уровень ${userProfile?.level || 1}!`
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
                  <Navbar
                    onAuthClick={openAuth}
                    user={user}
                    profile={userProfile}
                  />
                  <Profile user={user} profile={userProfile} />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* СТРАНИЦА СКАНЕРА */}
          <Route
            path="/scanner"
            element={
              user ? (
                <Scanner user={user} profile={userProfile} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>

        <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
        <AboutModal isOpen={isAboutOpen} onClose={closeAbout} />
      </div>
    </Router>
  );
}

export default App;
