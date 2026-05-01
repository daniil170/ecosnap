import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

/**
 * Логика обработки сканирования (XP, O3, Стрики, Уровни)
 */
export const processEcoScan = async (userId, scanType) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;
  const userData = userSnap.data();

  const rewards = {
    plastic: { xp: 20, ozone: 5 },
    paper: { xp: 10, ozone: 2 },
    glass: { xp: 30, ozone: 10 },
    metal: { xp: 25, ozone: 7 },
  };

  const { xp: addXp, ozone: addOzone } = rewards[scanType] || {
    xp: 5,
    ozone: 1,
  };

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

  const totalXp = (userData.xp || 0) + addXp;
  const newLevel = Math.floor(totalXp / 100) + 1;

  const newAchievements = [];
  if (!userData.achievements?.includes("first_scan"))
    newAchievements.push("first_scan");

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

  if (newLevel >= 10 && !userData.achievements?.includes("lvl_10"))
    newAchievements.push("lvl_10");
  if (newLevel >= 50 && !userData.achievements?.includes("lvl_50"))
    newAchievements.push("lvl_50");

  const updateData = {
    xp: increment(addXp),
    ozone: increment(addOzone),
    streak: newStreak,
    level: newLevel,
    lastScanDate: today,
    scannedItems: increment(1),
  };

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

/**
 * Покупка товара
 */
export const buyShopItem = async (userId, item) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("Пользователь не найден");

  const userData = userSnap.data();
  const userOzone = userData.ozone || 0;

  if (userOzone < item.price) throw new Error("Недостаточно O3");
  if (userData.inventory?.includes(item.id))
    throw new Error("У вас уже есть этот предмет");

  await updateDoc(userRef, {
    ozone: increment(-item.price),
    inventory: arrayUnion(item.id),
  });

  return { success: true, remainingOzone: userOzone - item.price };
};

/**
 * Экипировка предметов — перезаписывает массив активных предметов.
 * Передавай массив строк: ["id1", "id2"]
 * Чтобы снять все предметы — передавай пустой массив []
 */
export const updateActiveItems = async (userId, activeItemIds) => {
  if (!userId) throw new Error("userId не передан в updateActiveItems");

  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    activeItems: activeItemIds.map(String), // гарантируем строки перед записью
  });

  return { success: true };
};
