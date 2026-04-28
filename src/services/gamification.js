import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

export const processEcoScan = async (userId, scanType) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;
  const userData = userSnap.data();

  // 1. Расширенные награды
  const rewards = {
    plastic: { xp: 20, ozone: 5 },
    paper: { xp: 10, ozone: 2 },
    glass: { xp: 30, ozone: 10 },
    metal: { xp: 25, ozone: 7 }, // Добавили металл
  };

  const { xp: addXp, ozone: addOzone } = rewards[scanType] || {
    xp: 5,
    ozone: 1,
  };

  // 2. Логика Стрика
  const today = new Date().toISOString().split("T")[0];
  const lastDate = userData.lastScanDate;
  let newStreak = userData.streak || 0;

  if (lastDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastDate === yesterdayStr) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  // 3. Расчет уровня (синхронно с Profile.jsx: 100 XP на уровень)
  const totalXp = (userData.xp || 0) + addXp;
  const newLevel = Math.floor(totalXp / 100) + 1;

  // 4. ПРОВЕРКА ДОСТИЖЕНИЙ (Achievements)
  const newAchievements = [];

  // Ачивка за первый скан
  if (!userData.achievements?.includes("first_scan")) {
    newAchievements.push("first_scan");
  }

  // Ачивки за стрики
  const streakMilestones = {
    10: "streak_10",
    50: "streak_50",
    100: "streak_100",
    300: "streak_300",
  };
  if (
    streakMilestones[newStreak] &&
    !userData.achievements?.includes(streakMilestones[newStreak])
  ) {
    newAchievements.push(streakMilestones[newStreak]);
  }

  // Ачивки за уровни
  if (newLevel >= 10 && !userData.achievements?.includes("lvl_10"))
    newAchievements.push("lvl_10");
  if (newLevel >= 50 && !userData.achievements?.includes("lvl_50"))
    newAchievements.push("lvl_50");

  // 5. Обновление в БД
  const updateData = {
    xp: increment(addXp),
    ozone: increment(addOzone),
    streak: newStreak,
    level: newLevel,
    lastScanDate: today,
    scannedItems: increment(1), // Считаем общее кол-во сканов
  };

  // Если есть новые ачивки, добавляем их в массив через arrayUnion
  if (newAchievements.length > 0) {
    updateData.achievements = arrayUnion(...newAchievements);
  }

  await updateDoc(userRef, updateData);

  return {
    addXp,
    addOzone,
    newLevel,
    newStreak,
    leveledUp: newLevel > (userData.level || 1),
    newAchievements,
  };
};
