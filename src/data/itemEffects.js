import { arrayRemove } from "firebase/firestore";
export const applyItemEffect = (item, user, updateUser) => {
  if (!item || item.category !== "digital") return;

  const effects = {
    // 🟢 COMMON
    eco_sticker_pack: (user) => ({
      stickerPacks: Array.from(new Set([...(user.stickerPacks || []), "eco_pack"])),
    }),

    green_theme: () => ({
      activeTheme: "green",
    }),

    recycle_badge: (user) => ({
      badges: Array.from(new Set([...(user.badges || []), "recycle"])),
    }),

    // 🔵 RARE
    animated_avatar: () => ({
      avatarEffect: "animated",
    }),

    eco_trail: () => ({
      trailEffect: "leaves",
    }),

    nickname_color: () => ({
      nicknameColor: "rainbow",
    }),

    // 🟣 EPIC
    golden_frame: () => ({
      profileFrame: "gold",
    }),

    profile_background_animated: () => ({
      profileBackground: "animated_space",
    }),

    eco_title: () => ({
      title: "Эко-герой",
    }),

    // 🔴 MYTHIC
    founder_badge: (user) => ({
      badges: Array.from(new Set([...(user.badges || []), "founder"])),
    }),
  };

  const effect = effects[item.id];

  if (!effect) {
    console.warn(`Нет эффекта для item: ${item.id}`);
    return;
  }

  const updatedUser = effect(user);
  updateUser(updatedUser);
};

// Сбрасывает эффект предмета — возвращает объект полей для updateDoc
export const removeItemEffect = (itemId) => {
  const removals = {
    eco_sticker_pack: { stickerPacks: arrayRemove("eco_pack") },
    green_theme: { activeTheme: null },
    recycle_badge: { badges: arrayRemove("recycle") },
    animated_avatar: { avatarEffect: null },
    eco_trail: { trailEffect: null },
    nickname_color: { nicknameColor: null },
    golden_frame: { profileFrame: null },
    profile_background_animated: { profileBackground: null },
    eco_title: { title: null },
    founder_badge: { badges: arrayRemove("founder") },
  };

  return removals[itemId] || null;
};
