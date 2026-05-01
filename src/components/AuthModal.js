import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Calendar,
  MapPin,
  Globe,
  Contact, // Иконка для Имени/Фамилии
} from "lucide-react";
import { auth, googleProvider, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Состояния для полей
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState(""); // Новое поле
  const [lastName, setLastName] = useState(""); // Новое поле
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  if (!isOpen) return null;

  // Инициализация профиля в Firestore
  const initializeUserData = async (user, additionalData = {}) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName:
          additionalData.nickname || user.displayName || email.split("@")[0],
        firstName: additionalData.firstName || "",
        lastName: additionalData.lastName || "",
        birthDate: additionalData.birthDate || "",
        country: additionalData.country || "",
        city: additionalData.city || "",
        scannedItems: 0,
        ecoScore: 0,
        treesSaved: 0,
        level: 1,
        photoGradient: "from-emerald-500 to-teal-600",
        createdAt: new Date(),
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await initializeUserData(result.user);
      onClose();
    } catch (err) {
      console.error("Ошибка Google Login:", err);
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isReset) {
        await sendPasswordResetEmail(auth, email);
        alert("Ссылка для сброса отправлена!");
        setIsReset(false);
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        // Регистрация
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await initializeUserData(result.user, {
          nickname,
          firstName,
          lastName,
          birthDate,
          country,
          city,
        });
        onClose();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300 shadow-emerald-500/10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-slate-400" />
        </button>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isReset
                ? "Сброс пароля"
                : isLogin
                  ? "С возвращением!"
                  : "Регистрация"}
            </h2>
            <p className="text-slate-500 text-sm">
              {isReset
                ? "Введите почту для восстановления"
                : "Присоединяйтесь к EcoSnap"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isReset && (
              <>
                {/* Никнейм */}
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Никнейм (ID)"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                </div>

                {/* Имя и Фамилия */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Contact
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Имя"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <Contact
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Фамилия"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-500 transition-all"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Globe
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Страна"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Город"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {!isReset && (
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg mt-2">
              {isReset ? "Сбросить" : isLogin ? "Войти" : "Создать аккаунт"}
            </button>
          </form>

          {!isReset && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-slate-400 font-medium">
                    Или через
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-semibold text-slate-700 shadow-sm"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>
            </>
          )}

          <p className="text-center mt-8 text-sm text-slate-500">
            {isReset ? (
              <button
                onClick={() => setIsReset(false)}
                className="font-bold text-slate-900"
              >
                Вернуться ко входу
              </button>
            ) : (
              <>
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setIsReset(false);
                  }}
                  className="ml-2 font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {isLogin ? "Создать" : "Войти"}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
