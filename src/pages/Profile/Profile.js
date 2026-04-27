import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  Settings,
  Award,
  History,
  TrendingUp,
  Camera,
  Leaf,
  Upload,
  X,
  Loader2,
  MapPin,
  Calendar,
} from "lucide-react";

const avatarGradients = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-red-600",
  "from-purple-500 to-pink-600",
  "from-slate-700 to-slate-900",
];

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({
    scannedItems: 0,
    xp: 0,
    treesSaved: 0,
    level: 1,
    displayName: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    birthDate: "",
    photoURL: "",
    photoGradient: "from-emerald-500 to-teal-600",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Состояния для полей редактирования
  const [editFields, setEditFields] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    birthDate: "",
    photoGradient: "",
  });

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUserData((prev) => ({ ...prev, ...data }));
        // Синхронизируем поля редактирования с данными из БД при открытии или обновлении
        setEditFields({
          displayName: data.displayName || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          country: data.country || "",
          city: data.city || "",
          birthDate: data.birthDate || "",
          photoGradient: data.photoGradient || avatarGradients[0],
        });
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Файл слишком большой! Максимум 2MB");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка сервера");
      const data = await response.json();

      if (data.url) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { photoURL: data.url });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Ошибка загрузки. Проверьте, запущен ли сервер на порту 5000");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName:
          editFields.displayName.trim() || user?.email?.split("@")[0],
        firstName: editFields.firstName.trim(),
        lastName: editFields.lastName.trim(),
        country: editFields.country.trim(),
        city: editFields.city.trim(),
        birthDate: editFields.birthDate,
        photoGradient: editFields.photoGradient,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Ошибка при сохранении данных");
    }
  };

  const stats = [
    {
      label: "Отсканировано",
      value: (userData.scannedItems || 0).toString(),
      icon: <Camera size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Очки опыта (XP)",
      value: (userData.xp || 0).toLocaleString(),
      icon: <Award size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Спасено деревьев",
      value: (userData.treesSaved || 0).toString(),
      icon: <Leaf size={20} />,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* ШАПКА ПРОФИЛЯ */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div
              className={`relative w-24 h-24 rounded-3xl overflow-hidden shadow-lg flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-tr ${userData.photoGradient}`}
            >
              {userData.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                (userData.firstName || userData.displayName || user?.email)
                  ?.charAt(0)
                  .toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {userData.firstName || userData.lastName
                  ? `${userData.firstName} ${userData.lastName}`.trim()
                  : userData.displayName || user?.email?.split("@")[0]}
              </h1>
              <p className="text-emerald-600 font-medium text-sm">
                @{userData.displayName || "id_user"}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-slate-500 text-xs">
                {userData.city && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-slate-400" />{" "}
                    {userData.city}, {userData.country}
                  </span>
                )}
                {userData.birthDate && (
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-slate-400" />{" "}
                    {new Date(userData.birthDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-slate-100 active:scale-95"
          >
            <Settings className="text-slate-400" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* СЕТКА СТАТИСТИКИ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* БЛОК ИСТОРИИ */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-slate-900">
                <History size={22} className="text-emerald-500" /> История
                активностей
              </h3>
              <div className="space-y-4">
                {!userData.scannedItems || userData.scannedItems === 0 ? (
                  <div className="text-center py-10">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera size={24} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 text-sm">
                      Здесь будет список ваших отсканированных предметов
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                        <Leaf size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          Вы успешно сканируете отходы
                        </p>
                        <p className="text-xs text-slate-400">
                          Всего предметов: {userData.scannedItems}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* БОКОВАЯ ПАНЕЛЬ */}
          <div className="space-y-6">
            <Link
              to="/scanner"
              className="block bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/40 transition-all" />
              <h3 className="text-xl font-bold mb-2 relative z-10">
                Сканировать
              </h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">
                Используй AI, чтобы определить тип мусора
              </p>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center relative z-10 shadow-lg shadow-emerald-500/20">
                <Camera size={24} />
              </div>
            </Link>

            {/* БЛОК РЕЙТИНГА */}
            <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-emerald-100 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 text-emerald-400 opacity-20">
                <TrendingUp size={120} />
              </div>
              <TrendingUp size={32} className="mb-4" />
              <h3 className="text-xl font-bold mb-1 relative z-10">Рейтинг</h3>
              <p className="text-emerald-100 text-sm mb-6 relative z-10">
                {userData.xp > 100
                  ? "Вы делаете отличные успехи!"
                  : "Сканируйте больше, чтобы попасть в топ"}
              </p>
              <button className="w-full bg-white text-emerald-600 py-3.5 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-colors relative z-10">
                Открыть таблицу лидеров
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО РЕДАКТИРОВАНИЯ */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200 border border-white/20">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 hover:rotate-90 transition-all"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Настройки профиля
            </h2>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {/* Аватарка и Цвета */}
              <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100">
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest ml-1">
                  Фото и стиль
                </label>
                <div className="flex items-center gap-5">
                  <div
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-tr ${editFields.photoGradient} flex-shrink-0 flex items-center justify-center shadow-inner`}
                  >
                    {userData.photoURL ? (
                      <img
                        src={userData.photoURL}
                        className="w-full h-full object-cover"
                        alt="preview"
                      />
                    ) : (
                      <span className="text-white text-2xl font-bold">
                        {(editFields.firstName ||
                          editFields.displayName ||
                          "U")[0].toUpperCase()}
                      </span>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                        <Loader2
                          className="text-white animate-spin"
                          size={24}
                        />
                      </div>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer bg-white border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 transition-all flex flex-col items-center group">
                    <Upload
                      size={20}
                      className="text-slate-400 group-hover:text-emerald-500 mb-1"
                    />
                    <span className="text-[10px] text-slate-500 font-bold uppercase">
                      Загрузить фото
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                      disabled={uploading}
                    />
                  </label>
                </div>
                <div className="flex justify-between mt-5 px-1">
                  {avatarGradients.map((gradient) => (
                    <button
                      key={gradient}
                      onClick={() =>
                        setEditFields({
                          ...editFields,
                          photoGradient: gradient,
                        })
                      }
                      className={`w-8 h-8 rounded-full bg-gradient-to-tr ${gradient} ${editFields.photoGradient === gradient ? "ring-2 ring-emerald-500 ring-offset-2 scale-110 shadow-lg" : "opacity-40 hover:opacity-100"} transition-all`}
                    />
                  ))}
                </div>
              </div>

              {/* Основное */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                    Никнейм
                  </label>
                  <input
                    type="text"
                    value={editFields.displayName}
                    onChange={(e) =>
                      setEditFields({
                        ...editFields,
                        displayName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={editFields.firstName}
                      onChange={(e) =>
                        setEditFields({
                          ...editFields,
                          firstName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      value={editFields.lastName}
                      onChange={(e) =>
                        setEditFields({
                          ...editFields,
                          lastName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Дата и Место */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                    Дата рождения
                  </label>
                  <input
                    type="date"
                    value={editFields.birthDate}
                    onChange={(e) =>
                      setEditFields({
                        ...editFields,
                        birthDate: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                      Страна
                    </label>
                    <input
                      type="text"
                      placeholder="Казахстан"
                      value={editFields.country}
                      onChange={(e) =>
                        setEditFields({
                          ...editFields,
                          country: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1 ml-1 tracking-widest">
                      Город
                    </label>
                    <input
                      type="text"
                      placeholder="Алматы"
                      value={editFields.city}
                      onChange={(e) =>
                        setEditFields({ ...editFields, city: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-100 mt-6">
              <button
                onClick={handleSaveProfile}
                className="flex-[2] bg-emerald-500 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 active:scale-95"
              >
                Сохранить
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
