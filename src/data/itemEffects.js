export const applyItemEffect = (item, user, updateUser) => {
  if (!item || item.category !== "digital") return;

  const effects = {
    // 🟢 COMMON
    eco_sticker_pack: (user) => ({
      ...user,
      inventory: {
        ...user.inventory,
        stickers: ["eco_pack"],
      },
    }),

    green_theme: (user) => ({
      ...user,
      activeTheme: "green",
    }),

    recycle_badge: (user) => ({
      ...user,
      badges: Array.from(new Set([...(user.badges || []), "recycle"])),
    }),

    // 🔵 RARE
    animated_avatar: (user) => ({
      ...user,
      avatarEffect: "animated",
    }),

    eco_trail: (user) => ({
      ...user,
      trailEffect: "leaves",
    }),

    nickname_color: (user) => ({
      ...user,
      nicknameColor: "rainbow",
    }),

    // 🟣 EPIC
    golden_frame: (user) => ({
      ...user,
      profileFrame: "gold",
    }),

    profile_background_animated: (user) => ({
      ...user,
      profileBackground: "animated_space",
    }),

    eco_title: (user) => ({
      ...user,
      title: "Эко-герой",
    }),

    // 🔴 MYTHIC
    founder_badge: (user) => ({
      ...user,
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
    eco_sticker_pack: { "inventory.stickers": [] },
    green_theme: { activeTheme: null },
    recycle_badge: null, // бейджи не убираем
    animated_avatar: { avatarEffect: null },
    eco_trail: { trailEffect: null },
    nickname_color: { nicknameColor: null },
    golden_frame: { profileFrame: null },
    profile_background_animated: { profileBackground: null },
    eco_title: { title: null },
    founder_badge: null, // бейджи не убираем
  };

  return removals[itemId] || null;
};
