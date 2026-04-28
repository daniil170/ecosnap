import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  Settings,
  History,
  TrendingUp,
  Camera,
  Leaf,
  X,
  MapPin,
  Flame,
  Zap,
  Trophy,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar
} from "lucide-react";

const avatarGradients = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-red-600",
  "from-purple-500 to-pink-600",
  "from-slate-700 to-slate-900",
];

const ACHIEVEMENTS_LIST = [
  { id: 'streak_10', icon: "🔟", title: "10 дней", desc: "Вы с EcoSnap уже 10 дней подряд!" },
  { id: 'streak_50', icon: "🥈", title: "Полгорода", desc: "50 дней активной заботы об экологии" },
  { id: 'streak_100', icon: "🥇", title: "Центурион", desc: "100 дней! Вами гордится планета" },
  { id: 'streak_300', icon: "💎", title: "Эко-Бог", desc: "300 дней. Статус легенды достигнут" },
  { id: 'first_scan', icon: "🌱", title: "Старт", desc: "Ваш первый вклад в чистоту планеты" },
  { id: 'plastic_10', icon: "🥤", title: "Пластик-стоп", desc: "10 объектов спасено от свалки" },
  { id: 'glass_10', icon: "🍾", title: "Стеклянный глаз", desc: "10 стеклянных бутылок собрано" },
  { id: 'paper_10', icon: "📦", title: "Бумажный тигр", desc: "10 картонных упаковок переработано" },
  { id: 'metal_10', icon: "🥫", title: "Железный чел", desc: "10 жестяных банок в деле" },
  { id: 'rich_100', icon: "💰", title: "Сотка", desc: "Вы заработали первые 100 O3" },
  { id: 'rich_1000', icon: "👑", title: "Миллионер", desc: "На вашем счету более 1000 O3" },
  { id: 'lvl_10', icon: "🎖️", title: "Десятка", desc: "Вы достигли 10 уровня прогресса" },
  { id: 'lvl_50', icon: "🚀", title: "На Марс!", desc: "Вы достигли 50 уровня!" },
  { id: 'night_owl', icon: "🦉", title: "Сова", desc: "Сканирование мусора в ночное время" },
  { id: 'early_bird', icon: "☀️", title: "Пташка", desc: "Сканирование мусора до 8 утра" },
  { id: 'traveler', icon: "🌍", title: "Турист", desc: "Скан в другом городе или стране" },
  { id: 'fast_scanner', icon: "⚡", title: "Скорость", desc: "3 скана менее чем за минуту" },
  { id: 'eco_hero', icon: "🦸‍♂️", title: "Герой", desc: "Спасено более 10 виртуальных деревьев" },
  { id: 'perfect_profile', icon: "🖼️", title: "Перфекционист", desc: "Все данные профиля заполнены" },
  { id: 'inviter', icon: "🤝", title: "Друг", desc: "Ваш реферальный код был использован" },
];

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({
    scannedItems: 0,
    xp: 0,
    level: 1,
    ozone: 0,
    streak: 0,
    achievements: [],
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    birthDate: "",
    photoURL: "",
    photoGradient: "from-emerald-500 to-teal-600",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedAch, setSelectedAch] = useState(null); 
  const [showAllAch, setShowAllAch] = useState(false);
  const [editFields, setEditFields] = useState({});

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData((prev) => ({ ...prev, ...data }));
        if (!isEditing) {
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
      }
    });
    return () => unsubscribe();
  }, [user, isEditing]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.url) {
        await updateDoc(doc(db, "users", user.uid), { photoURL: data.url });
      }
    } catch (error) {
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.uid) return;
    try {
      await updateDoc(doc(db, "users", user.uid), { ...editFields });
      setIsEditing(false);
    } catch (error) { console.error(error); }
  };

  const visibleAchievements = showAllAch ? ACHIEVEMENTS_LIST : ACHIEVEMENTS_LIST.slice(0, 6);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-10 relative">
          <div className="relative flex-shrink-0">
             <div className={`w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-tr ${userData.photoGradient} p-1`}>
                <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                   {userData.photoURL ? (
                       <img src={userData.photoURL} className="w-full h-full object-cover" alt="Avatar" />
                   ) : (
                       <span className="text-white text-5xl font-bold">{(userData.firstName || user?.email)?.charAt(0).toUpperCase()}</span>
                   )}
                </div>
             </div>
             <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3.5 py-1.5 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5">
                <Flame size={18} className="fill-white" />
                <span className="font-bold text-md">{userData.streak}</span>
             </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {userData.firstName} {userData.lastName}
            </h1>
            <div className="flex items-center gap-2 justify-center md:justify-start text-emerald-600 font-bold text-sm mt-1">
              <span>@{userData.displayName || "eco_hero"}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin size={14} /> {userData.city || "Не указан"}, {userData.country || "Земля"}
              </span>
            </div>
            
            <div className="mt-6 max-w-md mx-auto md:mx-0">
              <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2 px-1 tracking-widest">
                <span>Уровень {userData.level}</span>
                <span>{userData.xp % 100} / 100 XP</span>
              </div>
              <div className="h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50 p-0.5">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: `${Math.min((userData.xp % 100), 100)}%` }} />
              </div>
            </div>
          </div>

          <button onClick={() => setIsEditing(true)} className="p-4 hover:bg-slate-50 rounded-2xl border border-slate-100 transition-all active:scale-95 bg-white shadow-sm">
            <Settings className="text-slate-400" size={24} />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            
            {/* STATS */}
            <div className="grid grid-cols-3 gap-4">
               {[
                 { label: "Очки опыта", val: userData.xp, icon: <TrendingUp size={20} />, col: "text-blue-500", bg: "bg-blue-50" },
                 { label: "Валюта O3", val: userData.ozone, icon: <Zap size={20} />, col: "text-orange-500", bg: "bg-orange-50" },
                 { label: "Сканы", val: userData.scannedItems, icon: <Camera size={20} />, col: "text-emerald-500", bg: "bg-emerald-50" }
               ].map((s, i) => (
                 <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className={`w-10 h-10 ${s.bg} ${s.col} rounded-xl flex items-center justify-center mb-4`}>{s.icon}</div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{s.label}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{s.val}</p>
                 </div>
               ))}
            </div>

            {/* ACHIEVEMENTS (COLLAPSIBLE) */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-extrabold flex items-center gap-2 uppercase tracking-tight text-orange-400">
                  <Trophy size={24} /> Коллекция наград
                </h3>
                <button onClick={() => setShowAllAch(!showAllAch)} className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl flex items-center gap-1">
                  {showAllAch ? <><ChevronUp size={16} /> Свернуть</> : <><ChevronDown size={16} /> Показать все ({ACHIEVEMENTS_LIST.length})</>}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 transition-all duration-300">
                {visibleAchievements.map((ach) => {
                  const isLocked = !userData.achievements?.includes(ach.id);
                  return (
                    <button key={ach.id} onClick={() => setSelectedAch(ach)} className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${isLocked ? 'bg-slate-50 border-transparent opacity-30 grayscale' : 'bg-white border-emerald-100 shadow-md hover:scale-105'}`}>
                      <span className="text-5xl">{ach.icon}</span>
                      <span className="text-[10px] font-black uppercase text-center text-slate-700 leading-tight">{ach.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* HISTORY */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
               <h3 className="text-xl font-extrabold flex items-center gap-2 mb-6 uppercase tracking-tight text-emerald-500">
                <History size={24} /> История активности
              </h3>
              <div className="space-y-4">
                {userData.scannedItems > 0 ? (
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:bg-emerald-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><Leaf size={20} /></div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">Успешное сканирование</p>
                        <p className="text-[11px] text-slate-400 font-medium">Вы внесли вклад в экологию. +25 XP</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                ) : (
                  <div className="text-center py-10 italic text-slate-400">Пока здесь нет записей...</div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            {/* SCANNER WIDGET */}
            <Link to="/scanner" className="block bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl transition-all hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl group-hover:bg-emerald-500/40 transition-all" />
              <div className="relative z-10 text-center md:text-left">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20 mx-auto md:mx-0">
                  <Camera size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 uppercase italic tracking-tighter">В бой за чистоту!</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">
                  Используй AI, сканируй мусор и получай <span className="text-white">+25 XP и 5 O3</span> за каждый скан.
                </p>
              </div>
            </Link>

            {/* LEADERBOARD WIDGET */}
            <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
               <div className="absolute -bottom-6 -right-6 text-emerald-400/30"><Trophy size={120} /></div>
               <h3 className="text-xl font-bold mb-1 relative z-10 italic">Лига Мастеров</h3>
               <p className="text-emerald-100 text-[10px] font-black uppercase mb-6 relative z-10 tracking-widest">Топ игроков недели</p>
               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 mb-6 relative z-10 border border-white/10 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest">Твоё место</span>
                  <span className="text-3xl font-black italic">#14</span>
               </div>
               <button className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-50 transition-all relative z-10 shadow-lg active:scale-95">
                Открыть таблицу
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENT MODAL */}
      {selectedAch && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl text-center relative animate-in zoom-in duration-300">
            <button onClick={() => setSelectedAch(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-500 transition-all"><X size={24}/></button>
            <div className="text-7xl mb-6 scale-110 drop-shadow-md">{selectedAch.icon}</div>
            <h2 className="text-2xl font-bold mb-3 text-slate-900">{selectedAch.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 px-2 font-medium">{selectedAch.desc}</p>
            <button onClick={() => setSelectedAch(null)} className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95">Закрыть</button>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/20">
            <button onClick={() => setIsEditing(false)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"><X size={28}/></button>
            <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">Настройки Профиля</h2>
            
            <div className="space-y-6">
              {/* AVATAR PICKER */}
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                <div className={`w-24 h-24 rounded-3xl mx-auto mb-4 bg-gradient-to-tr ${editFields.photoGradient} relative overflow-hidden flex items-center justify-center text-white text-3xl font-black shadow-lg`}>
                  {userData.photoURL ? <img alt="Avatar" src={userData.photoURL} className="w-full h-full object-cover" /> : editFields.firstName?.charAt(0) || "U"}
                  {uploading && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}
                </div>
                <label className="cursor-pointer bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase inline-block mb-4 hover:border-emerald-500 transition-colors">
                  Загрузить фото
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
                <div className="flex justify-center gap-2">
                  {avatarGradients.map(g => (
                    <button key={g} onClick={() => setEditFields({...editFields, photoGradient: g})} className={`w-7 h-7 rounded-full bg-gradient-to-tr ${g} ${editFields.photoGradient === g ? 'ring-2 ring-emerald-500 ring-offset-2 scale-110' : 'opacity-60'} transition-all`} />
                  ))}
                </div>
              </div>

              {/* INPUT FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Имя" value={editFields.firstName} onChange={(e) => setEditFields({...editFields, firstName: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />
                <input type="text" placeholder="Фамилия" value={editFields.lastName} onChange={(e) => setEditFields({...editFields, lastName: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />
              </div>
              
              <input type="text" placeholder="Никнейм" value={editFields.displayName} onChange={(e) => setEditFields({...editFields, displayName: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-2 tracking-widest flex items-center gap-1"><Calendar size={12}/> Дата рождения</label>
                <input type="date" value={editFields.birthDate} onChange={(e) => setEditFields({...editFields, birthDate: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Город" value={editFields.city} onChange={(e) => setEditFields({...editFields, city: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />
                <input type="text" placeholder="Страна" value={editFields.country} onChange={(e) => setEditFields({...editFields, country: e.target.value})} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500" />
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={handleSaveProfile} className="flex-[2] bg-emerald-500 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200">Сохранить</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-[1.5rem] font-black uppercase tracking-widest">Отмена</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;