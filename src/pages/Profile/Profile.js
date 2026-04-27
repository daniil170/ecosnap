import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase"; // Добавили db
import { doc, onSnapshot } from "firebase/firestore"; // Добавили слушатель Firestore
import {
  Settings,
  Award,
  History,
  TrendingUp,
  Camera,
  Leaf,
} from "lucide-react";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({
    scannedItems: 0,
    xp: 0,
    treesSaved: 0,
    level: 1,
  });

  useEffect(() => {
    if (!user?.uid) return;

    // Слушаем изменения данных пользователя в реальном времени
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
      if (doc.exists()) {
        setUserData(doc.data());
      }
    });

    return () => unsubscribe();
  }, [user]);

  const stats = [
    {
      label: "Отсканировано",
      value: userData.scannedItems.toString(),
      icon: <Camera size={20} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Очки опыта (XP)",
      value: userData.xp.toLocaleString(),
      icon: <Award size={20} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Спасено деревьев",
      value: userData.treesSaved.toString(),
      icon: <Leaf size={20} />,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Шапка профиля */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {userData.displayName || user?.email?.split("@")[0]}
              </h1>
              <p className="text-slate-500">
                Уровень {userData.level}: Эко-активист
              </p>
              <div className="mt-2 h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${Math.min((userData.xp % 1000) / 10, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
          <button className="p-3 hover:bg-slate-50 rounded-2xl transition-colors border border-slate-100">
            <Settings className="text-slate-400" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Сетка статистики */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-slate-500 text-xs font-medium">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* История (пока статичная, но готова к интеграции коллекции scans) */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <History size={20} className="text-emerald-500" /> История
                </h3>
              </div>
              <div className="space-y-4">
                {userData.scannedItems === 0 ? (
                  <p className="text-slate-400 text-center py-4">
                    Вы еще ничего не отсканировали
                  </p>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Camera size={18} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">
                          Последняя активность
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Обновлено только что
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            <Link
              to="/scanner"
              className="block bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/40 transition-all" />
              <h3 className="text-xl font-bold mb-2 relative z-10">
                Сканировать
              </h3>
              <p className="text-slate-400 text-sm mb-6 relative z-10">
                Определи тип отходов
              </p>
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center relative z-10">
                <Camera size={24} />
              </div>
            </Link>

            <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white">
              <TrendingUp size={32} className="mb-4" />
              <h3 className="text-xl font-bold mb-1">Рейтинг</h3>
              <p className="text-emerald-100 text-sm mb-4">Вы в топ-героев!</p>
              <button className="w-full bg-white text-emerald-600 py-3 rounded-xl font-bold text-sm">
                Открыть таблицу
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
