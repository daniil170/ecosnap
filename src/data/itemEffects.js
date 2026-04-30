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
      badges: Array.from(new Set([...(user.badges || []), "recycle"]))
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
      badges: Array.from(new Set([...(user.badges || []), "founder"]))
    }),
  };

  const effect = effects[item.id];

  if (!effect) {
    console.warn(`Нет эффекта для item: ${item.id}`);
    return;
  }

  const updatedUser = effect(user);

  // обновляем пользователя (Firebase / state / localStorage)
  updateUser(updatedUser);
};
