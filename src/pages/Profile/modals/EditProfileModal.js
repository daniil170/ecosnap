import React, { useState } from "react";
import { X, Loader2, Calendar } from "lucide-react";
import { gradientMap } from "../../../data/gradients";

const avatarGradients = Object.keys(gradientMap);

const EditProfileModal = ({ onClose, userData, onSave, user }) => {
  const [editFields, setEditFields] = useState({
    displayName: userData.displayName || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    country: userData.country || "",
    city: userData.city || "",
    birthDate: userData.birthDate || "",
    photoGradient: userData.photoGradient ?? avatarGradients[0],
  });
  const [uploading, setUploading] = useState(false);

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
        setEditFields((prev) => ({ ...prev, photoURL: data.url }));
      }
    } catch (error) {
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onSave({ ...editFields });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-all"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter">
          Настройки Профиля
        </h2>

        <div className="space-y-6">
          {/* AVATAR PICKER */}
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
            <div
              className="w-24 h-24 rounded-3xl mx-auto mb-4 relative overflow-hidden flex items-center justify-center text-white text-3xl font-black shadow-lg"
              style={{
                background:
                  gradientMap[editFields.photoGradient] ||
                  gradientMap[avatarGradients[0]],
              }}
            >
              {editFields.photoURL || userData.photoURL ? (
                <img
                  alt="Avatar"
                  src={editFields.photoURL || userData.photoURL}
                  className="w-full h-full object-cover"
                />
              ) : (
                editFields.firstName?.charAt(0) || "U"
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" />
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-[10px] font-black uppercase inline-block mb-4 hover:border-emerald-500 transition-colors">
              Загрузить фото
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </label>
            <div className="flex justify-center gap-2">
              {avatarGradients.map((g) => (
                <button
                  key={g}
                  onClick={() =>
                    setEditFields({ ...editFields, photoGradient: g })
                  }
                  className={`w-7 h-7 rounded-full transition-all ${
                    editFields.photoGradient === g
                      ? "ring-2 ring-emerald-500 ring-offset-2 scale-110"
                      : "opacity-60"
                  }`}
                  style={{ background: gradientMap[g] }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Имя"
              value={editFields.firstName}
              onChange={(e) =>
                setEditFields({ ...editFields, firstName: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={editFields.lastName}
              onChange={(e) =>
                setEditFields({ ...editFields, lastName: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <input
            type="text"
            placeholder="Никнейм"
            value={editFields.displayName}
            onChange={(e) =>
              setEditFields({ ...editFields, displayName: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
          />

          <div>
            <label className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase mb-2 ml-2 tracking-widest">
              <Calendar size={12} /> Дата рождения
            </label>
            <input
              type="date"
              value={editFields.birthDate}
              onChange={(e) =>
                setEditFields({ ...editFields, birthDate: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Город"
              value={editFields.city}
              onChange={(e) =>
                setEditFields({ ...editFields, city: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Страна"
              value={editFields.country}
              onChange={(e) =>
                setEditFields({ ...editFields, country: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold text-sm outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleSave}
              className="flex-[2] bg-emerald-500 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200"
            >
              Сохранить
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 text-slate-500 py-5 rounded-[1.5rem] font-black uppercase tracking-widest"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
