import React, { useState } from "react";
import { X, Loader2, Calendar, MapPin, Globe } from "lucide-react";
import { gradientMap } from "../../../data/gradients";
import { useLanguage } from "../../../context/LanguageContext";
import { countries, cities } from "../../../data/regions";

const avatarGradients = Object.keys(gradientMap);

const EditProfileModal = ({ onClose, userData, onSave }) => {
  const { t } = useLanguage();

  const [editFields, setEditFields] = useState({
    displayName: userData.displayName || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    country: userData.country || "",
    city: userData.city || "",
    birthDate: userData.birthDate || "",
    photoGradient: userData.photoGradient ?? avatarGradients[0],
    photoURL: userData.photoURL || "",
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
      console.error(t("profile.uploadError"), error);
      alert(t("profile.uploadError"));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onSave({ ...editFields });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto border border-white/20 dark:border-slate-700/20 transition-colors duration-300">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-300 dark:text-slate-600 hover:text-slate-900 dark:hover:text-slate-300 transition-all"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-slate-900 dark:text-white transition-colors duration-300">
          {t("editProfile.title")}
        </h2>

        {/* Секция аватарки */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-4xl font-bold text-white relative overflow-hidden shadow-lg transition-colors duration-300"
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
              (editFields.firstName?.charAt(0) || "U").toUpperCase()
            )}

            {uploading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}
          </div>

          <label className="cursor-pointer bg-white dark:bg-slate-700 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-[10px] font-black uppercase inline-block mb-4 hover:border-emerald-500 dark:hover:border-emerald-400 text-slate-900 dark:text-white transition-colors duration-300">
            {t("profile.uploadPhoto")}
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
                    ? "ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-800 scale-110"
                    : "opacity-60"
                }`}
                style={{ background: gradientMap[g] }}
              />
            ))}
          </div>
        </div>

        {/* Поля ввода */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder={t("auth.firstName")}
            value={editFields.firstName}
            onChange={(e) =>
              setEditFields({ ...editFields, firstName: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-colors duration-300"
          />
          <input
            type="text"
            placeholder={t("auth.lastName")}
            value={editFields.lastName}
            onChange={(e) =>
              setEditFields({ ...editFields, lastName: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-colors duration-300"
          />
        </div>

        <input
          type="text"
          placeholder={t("auth.nickname")}
          value={editFields.displayName}
          onChange={(e) =>
            setEditFields({ ...editFields, displayName: e.target.value })
          }
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 transition-colors duration-300 mb-4"
        />

        <div className="mb-4">
          <label className="flex items-center gap-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2 ml-2 tracking-widest transition-colors duration-300">
            <Calendar size={12} /> {t("auth.birthDate")}
          </label>
          <input
            type="date"
            value={editFields.birthDate}
            onChange={(e) =>
              setEditFields({ ...editFields, birthDate: e.target.value })
            }
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white transition-colors duration-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="flex items-center gap-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2 ml-2 tracking-widest transition-colors duration-300">
              <MapPin size={12} /> {t("auth.city")}
            </label>
            <select
              value={editFields.city}
              onChange={(e) =>
                setEditFields({ ...editFields, city: e.target.value })
              }
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!editFields.country}
            >
              <option value="">{t("auth.city")}</option>
              {editFields.country &&
                cities[editFields.country]?.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-1 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase mb-2 ml-2 tracking-widest transition-colors duration-300">
              <Globe size={12} /> {t("auth.country")}
            </label>
            <select
              value={editFields.country}
              onChange={(e) => {
                setEditFields({
                  ...editFields,
                  country: e.target.value,
                  city: "",
                });
              }}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 font-bold text-sm outline-none focus:border-emerald-500 dark:focus:border-emerald-400 text-slate-900 dark:text-white transition-colors duration-300"
            >
              <option value="">{t("auth.country")}</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-[2] bg-emerald-500 dark:bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50"
          >
            {t("common.save")}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 py-5 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-300"
          >
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
