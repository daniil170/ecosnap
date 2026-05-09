import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

const BASE_OZONE_PER_SCAN = 20;
const BASE_ECO_SCORE_PER_SCAN = 20;

export const LEVEL_REWARDS = [
  { level: 2, ozone: 50 },
  { level: 5, ozone: 120, items: ["eco_sticker_pack"] },
  { level: 10, ozone: 250, items: ["green_theme"] },
  { level: 15, ozone: 400, items: ["nickname_color"] },
  { level: 20, ozone: 600, items: ["golden_frame"] },
  { level: 30, ozone: 1000, items: ["profile_background_animated"] },
  { level: 50, ozone: 2000, items: ["founder_badge"] },
];

const SCAN_ACHIEVEMENTS = {
  plastic: "plastic_10",
  paper: "paper_10",
  glass: "glass_10",
  metal: "metal_10",
};

const buildRecentScans = (recentScans, nowIso) => {
  const now = new Date(nowIso).getTime();
  const oneMinuteAgo = now - 60 * 1000;
  return [...(recentScans || []), nowIso].filter((iso) => {
    const ts = new Date(iso).getTime();
    return Number.isFinite(ts) && ts >= oneMinuteAgo;
  });
};

const isProfileComplete = (userData) => {
  const required = [
    "firstName",
    "lastName",
    "birthDate",
    "country",
    "city",
  ];
  return required.every((field) => String(userData?.[field] || "").trim().length > 0);
};

const calculateEcoScoreSim = (userData, addXp = 0, addStreak = 0, addAchievements = 0) => {
  const xp = (userData.xp || 0) + addXp;
  const streak = (userData.streak || 0) + addStreak;
  const achievements = (userData.achievements?.length || 0) + addAchievements;
  return xp + streak * 12 + achievements * 35;
};

export const getScanRewardsForLevel = (level = 1) => {
  const tier = Math.max(0, Math.floor((Math.max(1, level) - 1) / 4));
  return {
    ecoScore: BASE_ECO_SCORE_PER_SCAN + tier * 10,
    ozone: BASE_OZONE_PER_SCAN + tier * 5,
  };
};

const resolveLevelRewards = (userData, newLevel) => {
  const claimedLevels = new Set(userData.levelRewardsClaimed || []);
  const ownedItems = new Set(userData.inventory || []);

  const unlockedRewards = LEVEL_REWARDS.filter(
    (reward) => reward.level <= newLevel && !claimedLevels.has(reward.level),
  );

  const bonusOzone = unlockedRewards.reduce(
    (sum, reward) => sum + (reward.ozone || 0),
    0,
  );
  const rewardItems = unlockedRewards
    .flatMap((reward) => reward.items || [])
    .filter((itemId) => !ownedItems.has(itemId));
  const claimedNow = unlockedRewards.map((reward) => reward.level);

  return { unlockedRewards, bonusOzone, rewardItems, claimedNow };
};

const collectAchievements = (data) => {
  const unlocked = new Set(data.achievements || []);
  const newlyUnlocked = [];
  const unlock = (id) => {
    if (!id || unlocked.has(id)) return;
    unlocked.add(id);
    newlyUnlocked.push(id);
  };

  if ((data.scannedItems || 0) >= 1) unlock("first_scan");

  if ((data.streak || 0) >= 10) unlock("streak_10");
  if ((data.streak || 0) >= 50) unlock("streak_50");
  if ((data.streak || 0) >= 100) unlock("streak_100");
  if ((data.streak || 0) >= 300) unlock("streak_300");

  if ((data.level || 1) >= 10) unlock("lvl_10");
  if ((data.level || 1) >= 50) unlock("lvl_50");

  if ((data.ozone || 0) >= 100) unlock("rich_100");
  if ((data.ozone || 0) >= 1000) unlock("rich_1000");

  if ((data.scanCounters?.plastic || 0) >= 10) unlock("plastic_10");
  if ((data.scanCounters?.paper || 0) >= 10) unlock("paper_10");
  if ((data.scanCounters?.glass || 0) >= 10) unlock("glass_10");
  if ((data.scanCounters?.metal || 0) >= 10) unlock("metal_10");

  if ((data.recentScans || []).length >= 3) unlock("fast_scanner");

  const scanHour = Number(data.lastScanHour);
  if (!Number.isNaN(scanHour)) {
    if (scanHour < 8) unlock("early_bird");
    if (scanHour >= 22 || scanHour <= 4) unlock("night_owl");
  }

  if ((data.treesSaved || 0) >= 10) unlock("eco_hero");

  if (isProfileComplete(data)) unlock("perfect_profile");

  const hasInvites =
    (data.referralsCount || 0) > 0 ||
    (data.invitedUsers?.length || 0) > 0 ||
    Boolean(data.referredBy);
  if (hasInvites) unlock("inviter");

  const traveled =
    Boolean(data.lastScanCity && data.city && data.lastScanCity !== data.city) ||
    Boolean(data.lastScanCountry && data.country && data.lastScanCountry !== data.country);
  if (traveled) unlock("traveler");

  return newlyUnlocked;
};

export const syncUserAchievements = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return { newAchievements: [] };

  const userData = userSnap.data();
  const newAchievements = collectAchievements(userData);

  if (newAchievements.length > 0) {
    await updateDoc(userRef, {
      achievements: arrayUnion(...newAchievements),
    });
  }

  return { newAchievements };
};

/**
 * Логика обработки сканирования (EcoScore, O3, Стрики, Уровни)
 */
export const processEcoScan = async (userId, scanType) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return;
  const userData = userSnap.data();

  const currentLevel = userData.level || 1;
  const { ecoScore: addEcoScore, ozone: addOzone } =
    getScanRewardsForLevel(currentLevel);

  const now = new Date();
  const nowIso = now.toISOString();
  const today = nowIso.split("T")[0];
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

  const currentXp = userData.xp ?? 0;
  const totalXp = currentXp + addEcoScore;
  const newOzone = (userData.ozone || 0) + addOzone;
  const newScannedItems = (userData.scannedItems || 0) + 1;
  const newEcoScore = calculateEcoScoreSim(userData, addEcoScore, newStreak - (userData.streak || 0), 0);
  const newLevel = Math.floor(newEcoScore / 100) + 1;
  const { unlockedRewards, bonusOzone, rewardItems, claimedNow } =
    resolveLevelRewards(userData, newLevel);
  const nextScanCounters = {
    ...(userData.scanCounters || {}),
    [scanType]: (userData.scanCounters?.[scanType] || 0) + 1,
  };
  const recentScans = buildRecentScans(userData.recentScans, nowIso);

  const simulationData = {
    ...userData,
    ozone: newOzone + bonusOzone,
    scannedItems: newScannedItems,
    streak: newStreak,
    level: newLevel,
    scanCounters: nextScanCounters,
    recentScans,
    lastScanHour: now.getHours(),
    lastScanDate: today,
  };
  const newAchievements = collectAchievements(simulationData);

  const scanAchievement = SCAN_ACHIEVEMENTS[scanType];
  if (scanAchievement && (nextScanCounters[scanType] || 0) >= 10) {
    if (!newAchievements.includes(scanAchievement)) {
      newAchievements.push(scanAchievement);
    }
  }

  const updateData = {
    xp: increment(addEcoScore),
    ozone: increment(addOzone + bonusOzone),
    streak: newStreak,
    level: newLevel,
    lastScanDate: today,
    scannedItems: increment(1),
    scanCounters: nextScanCounters,
    recentScans,
    lastScanAt: nowIso,
    lastScanHour: now.getHours(),
  };
  if (claimedNow.length > 0) {
    updateData.levelRewardsClaimed = arrayUnion(...claimedNow);
  }
  if (rewardItems.length > 0) {
    updateData.inventory = arrayUnion(...rewardItems);
  }

  if (newAchievements.length > 0) {
    updateData.achievements = arrayUnion(...newAchievements);
  }

  await updateDoc(userRef, updateData);

  return {
    addEcoScore,
    addOzone: addOzone + bonusOzone,
    baseOzone: addOzone,
    bonusOzone,
    newLevel,
    newStreak,
    leveledUp: newLevel > (userData.level || 1),
    newAchievements,
    levelRewards: unlockedRewards,
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
