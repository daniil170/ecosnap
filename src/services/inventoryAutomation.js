import { deleteField } from "firebase/firestore";
import { applyItemEffect, removeItemEffect } from "../data/itemEffects";
import { getItemById } from "../data/shopItems";

const RARITY_SCORE = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
  mythic: 5,
};

export const getItemSlot = (item) => item?.effectSlot || item?.id;

const isItemEffectActive = (item, userData) => {
  switch (item.id) {
    case "recycle_badge":
      return userData.badges?.includes("recycle");
    case "founder_badge":
      return userData.badges?.includes("founder");
    case "animated_avatar":
      return userData.avatarEffect === "animated";
    case "nickname_color":
      return userData.nicknameColor === "rainbow";
    case "golden_frame":
      return userData.profileFrame === "gold";
    case "profile_background_animated":
      return userData.profileBackground === "animated_space";
    case "eco_title":
      return userData.title === "Эко-герой";
    case "eco_trail":
      return userData.trailEffect === "leaves";
    case "green_theme":
      return userData.activeTheme === "green";
    case "eco_sticker_pack":
      return userData.stickerPacks?.includes("eco_pack");
    default:
      return false;
  }
};

export const getOwnedDigitalItems = (userData) =>
  (userData?.inventory || [])
    .map((id) => getItemById(id))
    .filter((item) => item && item.category === "digital");

export const inferActiveItemsFromProfile = (userData) => {
  const result = {};
  const digitalItems = getOwnedDigitalItems(userData);

  for (const item of digitalItems) {
    const slot = getItemSlot(item);
    if (!slot) continue;

    if (userData?.activeItems?.[slot] === item.id) {
      result[slot] = item.id;
      continue;
    }

    // Поддержка старого формата, где все digital-эффекты писались в activeItems.digital
    if (userData?.activeItems?.digital === item.id) {
      result[slot] = item.id;
      continue;
    }

    if (isItemEffectActive(item, userData)) {
      result[slot] = item.id;
    }
  }

  return result;
};

export const buildAutoEquipSelection = (userData) => {
  const bestBySlot = {};
  const digitalItems = getOwnedDigitalItems(userData);

  for (const item of digitalItems) {
    const slot = getItemSlot(item);
    if (!slot) continue;

    const prev = bestBySlot[slot];
    if (!prev) {
      bestBySlot[slot] = item;
      continue;
    }

    const prevScore = RARITY_SCORE[prev.rarity] || 0;
    const nextScore = RARITY_SCORE[item.rarity] || 0;
    if (nextScore > prevScore || (nextScore === prevScore && item.price > prev.price)) {
      bestBySlot[slot] = item;
    }
  }

  return Object.fromEntries(
    Object.entries(bestBySlot).map(([slot, item]) => [slot, item.id]),
  );
};

export const buildInventorySyncUpdate = (userData, nextActiveItems) => {
  const prevActive = inferActiveItemsFromProfile(userData);
  const update = {};

  for (const [slot, itemId] of Object.entries(prevActive)) {
    if (nextActiveItems[slot] !== itemId) {
      update[`activeItems.${slot}`] = deleteField();
      const removalFields = removeItemEffect(itemId);
      if (removalFields) {
        for (const [field, value] of Object.entries(removalFields)) {
          update[field] = value === null ? deleteField() : value;
        }
      }
    }
  }

  const draftUser = { ...userData };
  for (const [slot, itemId] of Object.entries(nextActiveItems)) {
    update[`activeItems.${slot}`] = itemId;
    if (prevActive[slot] !== itemId) {
      const item = getItemById(itemId);
      if (!item) continue;
      applyItemEffect(item, draftUser, (updatedUser) => {
        Object.assign(update, updatedUser);
        Object.assign(draftUser, updatedUser);
      });
    }
  }

  const hasChanges =
    JSON.stringify(prevActive) !== JSON.stringify(nextActiveItems);

  return { update, hasChanges, prevActive };
};
