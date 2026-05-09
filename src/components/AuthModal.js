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
  Contact,
} from "lucide-react";
import { auth, googleProvider, db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useLanguage } from "../context/LanguageContext";
import { countries, cities } from "../data/regions";

const AuthModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Состояния для полей
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  if (!isOpen) return null;

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
      alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isReset) {
        await sendPasswordResetEmail(auth, email);
        alert(t("auth.resetSuccess") || "Ссылка отправлена на почту");
        setIsReset(false);
      } else if (isLogin) {
        let loginEmail = email;

        // ЛОГИКА: Если нет @, ищем по никнейму
        if (!email.includes("@")) {
          const q = query(
            collection(db, "users"),
            where("displayName", "==", email),
          );
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            throw new Error("Пользователь не найден");
          }
          loginEmail = querySnapshot.docs[0].data().email;
        }

        await signInWithEmailAndPassword(auth, loginEmail, password);
        onClose();
      } else {
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
                ? t("auth.resetTitle")
                : isLogin
                  ? t("auth.loginTitle")
                  : t("auth.signupTitle")}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isReset && (
              <>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder={t("auth.nickname")}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={t("auth.firstName")}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder={t("auth.lastName")}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-500"
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
                    <select
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setCity(""); // Сбросить город при смене страны
                      }}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                    >
                      <option value="">{t("auth.country")}</option>
                      {countries.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      required
                      disabled={!country}
                    >
                      <option value="">{t("auth.city")}</option>
                      {country && cities[country]?.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
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
                type="text"
                placeholder={t("auth.loginPlaceholder") || "Email или Ник"}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
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
                  placeholder={t("auth.password")}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {isLogin && !isReset && (
              <button
                type="button"
                onClick={() => setIsReset(true)}
                className="text-xs text-emerald-600 font-bold block w-full text-right hover:underline"
              >
                {t("auth.forgotPassword")}
              </button>
            )}

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg mt-2">
              {isReset
                ? t("auth.reset")
                : isLogin
                  ? t("auth.login")
                  : t("auth.signup")}
            </button>
          </form>

          {!isReset && (
            <>
              <div className="relative my-6 text-center text-xs text-slate-400 uppercase">
                {t("auth.orMethod")}
              </div>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                {t("auth.google")}
              </button>
            </>
          )}

          <p className="text-center mt-8 text-sm text-slate-500">
            {isReset ? (
              <button
                onClick={() => setIsReset(false)}
                className="font-bold text-slate-900"
              >
                {t("auth.backToLogin")}
              </button>
            ) : (
              <>
                {isLogin ? t("auth.noAccount") : t("auth.alreadyHave")}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setIsReset(false);
                  }}
                  className="ml-2 font-bold text-slate-900 hover:text-emerald-600"
                >
                  {isLogin ? t("auth.signup") : t("auth.login")}
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
