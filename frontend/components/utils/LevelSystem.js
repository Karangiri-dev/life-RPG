export const getLevelData = (xp) => {
  const level = Math.floor(xp / 500) + 1;

  const currentLevelXP = (level - 1) * 500;
  const nextLevelXP = level * 500;

  const xpInCurrentLevel = xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;

  const progress = (xpInCurrentLevel / xpNeeded) * 100;

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    xpInCurrentLevel,
    xpNeeded,
    progress,
  };
};