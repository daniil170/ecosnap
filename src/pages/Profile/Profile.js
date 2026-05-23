import React, { useState, useEffect, useRef } from "react";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { applyItemEffect } from "../../data/itemEffects";
import { syncUserAchievements } from "../../services/gamification";

import ProfileHeader from "./components/ProfileHeader";
import EcoSlider from "./components/EcoSlider";
import StatsGrid from "./components/StatsGrid";
import AchievementsList from "./components/AchievementsList";
import ActivityHistory from "./components/ActivityHistory";
import Sidebar from "./components/Sidebar";

import EditProfileModal from "./modals/EditProfileModal";
import InventoryModal from "./modals/InventoryModal";
import RegularInventoryModal from "./modals/RegularInventoryModal";
import AchievementInfoModal from "./modals/AchievementInfoModal";
import LeagueModal from "./modals/LeagueModal";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDigitalInventoryOpen, setIsDigitalInventoryOpen] = useState(false);
  const [isRegularInventoryOpen, setIsRegularInventoryOpen] = useState(false);
  const [isLeagueOpen, setIsLeagueOpen] = useState(false);
  const [showAllAch, setShowAllAch] = useState(false);
  const [selectedAch, setSelectedAch] = useState(null);
  const perfectSyncTriggeredRef = useRef(false);

  useEffect(() => {
    if (!user?.uid) return;
    perfectSyncTriggeredRef.current = false;
    const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user?.uid || !userData) return;
    if (userData.achievements?.includes("perfect_profile")) return;
    if (perfectSyncTriggeredRef.current) return;

    const isFilled =
      Boolean(userData.firstName?.trim()) &&
      Boolean(userData.lastName?.trim()) &&
      Boolean(userData.birthDate?.trim()) &&
      Boolean(userData.country?.trim()) &&
      Boolean(userData.city?.trim());

    if (!isFilled) return;

    perfectSyncTriggeredRef.current = true;
    syncUserAchievements(user.uid).catch((error) => {
      console.error("Ошибка авто-синхронизации наград:", error);
      perfectSyncTriggeredRef.current = false;
    });
  }, [user?.uid, userData]);

  const handleUpdateProfile = async (newData) => {
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...newData,
        photoGradient: newData.photoGradient,
      });
      await syncUserAchievements(user.uid);
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
      const itemSlot = item.effectSlot || item.id;
      const updatePayload = {
        [`activeItems.${itemSlot}`]: item.id,
      };

      applyItemEffect(item, userData, async (updatedUser) => {
        Object.assign(updatePayload, updatedUser);
      });

      await updateDoc(userRef, updatePayload);
    } catch (e) {
      console.error(e);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-200 dark:bg-emerald-900/50 rounded-full mb-4 transition-colors duration-300"></div>
          <div className="text-slate-400 dark:text-slate-500 font-medium transition-colors duration-300">
            Загрузка профиля...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-24 pb-12 font-sans text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <ProfileHeader
          userData={userData}
          user={user}
          onEdit={() => setIsEditing(true)}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <EcoSlider userData={userData} />
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
              onOpenLeague={() => setIsLeagueOpen(true)}
              onOpenDigitalInventory={() => setIsDigitalInventoryOpen(true)}
              onOpenRegularInventory={() => setIsRegularInventoryOpen(true)}
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

      {isDigitalInventoryOpen && (
        <InventoryModal
          userData={userData}
          userId={user.uid}
          onClose={() => setIsDigitalInventoryOpen(false)}
          onUseItem={handleUseItem}
        />
      )}

      {isRegularInventoryOpen && (
        <RegularInventoryModal
          userData={userData}
          onClose={() => setIsRegularInventoryOpen(false)}
        />
      )}

      {isLeagueOpen && (
        <LeagueModal
          userData={userData}
          onClose={() => setIsLeagueOpen(false)}
        />
      )}

      {selectedAch && (
        <AchievementInfoModal
          achievement={selectedAch}
          unlocked={Boolean(userData.achievements?.includes(selectedAch.id))}
          onClose={() => setSelectedAch(null)}
        />
      )}
    </div>
  );
};

export default Profile;
