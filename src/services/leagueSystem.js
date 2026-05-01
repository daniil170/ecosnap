export const ECO_LEAGUES = [
  {
    id: "seed",
    name: "Лига Семени",
    icon: "🌱",
    minScore: 0,
    color: "from-lime-500 to-emerald-500",
    desc: "Первые шаги в экопривычках.",
  },
  {
    id: "sprout",
    name: "Лига Ростка",
    icon: "🌿",
    minScore: 250,
    color: "from-emerald-500 to-teal-500",
    desc: "Ты уже стабильно сканируешь и набираешь темп.",
  },
  {
    id: "forest",
    name: "Лига Леса",
    icon: "🌳",
    minScore: 700,
    color: "from-green-600 to-emerald-700",
    desc: "Твой вклад заметен, ты строишь зеленое будущее.",
  },
  {
    id: "ocean",
    name: "Лига Океана",
    icon: "🌊",
    minScore: 1400,
    color: "from-cyan-500 to-blue-600",
    desc: "Сильный эко-игрок с большой ежедневной активностью.",
  },
  {
    id: "planet",
    name: "Лига Планеты",
    icon: "🪐",
    minScore: 2400,
    color: "from-indigo-500 to-purple-600",
    desc: "Ты вдохновляешь других и влияешь на экосообщество.",
  },
  {
    id: "legend",
    name: "Лига Легенд",
    icon: "👑",
    minScore: 3600,
    color: "from-amber-400 to-orange-500",
    desc: "Элитный защитник экологии. Максимальный ранг.",
  },
];

export const calculateEcoScore = (userData = {}) => {
  const xp = userData.xp || 0;
  const streak = userData.streak || 0;
  const achievements = userData.achievements?.length || 0;
  return xp + streak * 12 + achievements * 35;
};

export const getLeagueProgress = (userData = {}) => {
  const score = calculateEcoScore(userData);

  let currentIndex = 0;
  for (let i = 0; i < ECO_LEAGUES.length; i += 1) {
    if (score >= ECO_LEAGUES[i].minScore) currentIndex = i;
  }

  const currentLeague = ECO_LEAGUES[currentIndex];
  const nextLeague = ECO_LEAGUES[currentIndex + 1] || null;
  const prevThreshold = currentLeague.minScore;
  const nextThreshold = nextLeague?.minScore;

  const progressPct = nextLeague
    ? Math.max(
        0,
        Math.min(100, ((score - prevThreshold) / (nextThreshold - prevThreshold)) * 100),
      )
    : 100;

  return {
    score,
    currentLeague,
    nextLeague,
    currentIndex,
    progressPct,
    pointsToNext: nextLeague ? Math.max(0, nextThreshold - score) : 0,
  };
};
