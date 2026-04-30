import React, { useState, useEffect } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { ACHIEVEMENTS_LIST } from "../../data/achievements";
import { getItemById } from "../../data/shopItems";
import { applyItemEffect } from "../../data/itemEffects";

import ProfileHeader from "./components/ProfileHeader";
import StatsGrid from "./components/StatsGrid";
import AchievementsList from "./components/AchievementsList";
import ActivityHistory from "./components/ActivityHistory";
import Sidebar from "./components/Sidebar";

import EditProfileModal from "./modals/EditProfileModal";
import InventoryModal from "./modals/InventoryModal";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [showAllAch, setShowAllAch] = useState(false);
  const [selectedAch, setSelectedAch] = useState(null);

  const myInventory = (userData?.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item !== undefined);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });
    return () => unsub();
  }, [user]);

  const handleUpdateProfile = async (newData) => {
  console.log("Сохраняем данные:", newData); // <-- добавь
  try {
    await updateDoc(doc(db, "users", user.uid), {
      ...newData,
      photoGradient: newData.photoGradient,
    });
    console.log("Успешно сохранено"); // <-- добавь
    setIsEditing(false);
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
    alert("Ошибка: " + error.message);
  }
};

  const handleUseItem = async (item) => {
    if (!user?.uid) return;
    const userRef = doc(db, "users", user.uid);
    try {
      applyItemEffect(item, userData, async (updatedUser) => {
        await updateDoc(userRef, {
          ...updatedUser,
          [`activeItems.${item.category}`]: item.id,
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  if (!userData) return <div className="p-20 text-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <ProfileHeader
          userData={userData}
          user={user}
          onEdit={() => setIsEditing(true)}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <StatsGrid userData={userData} />

            <AchievementsList
              userData={userData}
              setSelectedAch={setSelectedAch}
              showAllAch={showAllAch}
              setShowAllAch={setShowAllAch}
            />

            <ActivityHistory activityHistory={userData.activityHistory || []} />
          </div>

          <div className="space-y-6">
            <Sidebar
              user={user}
              userData={userData}
              onOpenInventory={() => setIsInventoryOpen(true)}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <EditProfileModal
          userData={userData}
          onClose={() => setIsEditing(false)}
          onSave={handleUpdateProfile}
          user={user}
        />
      )}

      {isInventoryOpen && (
        <InventoryModal
          userData={userData}
          onClose={() => setIsInventoryOpen(false)}
          onUseItem={handleUseItem}
        />
      )}
    </div>
  );
};

export default Profile;
