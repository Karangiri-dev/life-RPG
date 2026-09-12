
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { getLevelData } from "../utils/LevelSystem";
import { useAuth } from "./Authcontext";

const XPContext = createContext();

const defaultAttributes = {
  Strength: 70,
  Intelligence: 65,
  Discipline: 80,
  Health: 70,
};

// Get saved data for current user
const getSavedProgress = (email) => {
  try {
    if (!email) {
      return {};
    }

    const storageKey = `lifeRPGProgress_${email}`;

    const savedProgress = localStorage.getItem(storageKey);

    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
  } catch (error) {
    console.log("Failed to load progress:", error);
  }

  return {};
};

export const XPProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const email = currentUser?.email;

  // Check whether current user's data has been loaded
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  // Keep track of which user's data is currently loaded
  const loadedEmailRef = useRef(null);

  // XP
  const [totalXP, setTotalXP] = useState(0);

  // Gold
  const [gold, setGold] = useState(0);

  // Character Attributes
  const [attributes, setAttributes] = useState(defaultAttributes);

  // Streak
  const [streak, setStreak] = useState(0);

  const [bestStreak, setBestStreak] = useState(0);

  const [lastCompletedDate, setLastCompletedDate] =
    useState(null);

  // Active quests
  const [quests, setQuests] = useState([]);

  // Completed quests
  const [completedQuests, setCompletedQuests] = useState([]);

  // Load current user's progress
  useEffect(() => {
    // Mark progress as not loaded
    setIsProgressLoaded(false);

    // If no user is logged in
    if (!email) {
      loadedEmailRef.current = null;

      setTotalXP(0);
      setGold(0);
      setAttributes(defaultAttributes);
      setStreak(0);
      setBestStreak(0);
      setLastCompletedDate(null);
      setQuests([]);
      setCompletedQuests([]);

      return;
    }

    // Get this user's saved progress
    const progress = getSavedProgress(email);

    setTotalXP(progress.totalXP ?? 0);

    setGold(progress.gold ?? 0);

    setAttributes(
      progress.attributes ?? defaultAttributes
    );

    setStreak(progress.streak ?? 0);

    setBestStreak(progress.bestStreak ?? 0);

    setLastCompletedDate(
      progress.lastCompletedDate ?? null
    );

    setQuests(progress.quests ?? []);

    setCompletedQuests(
      progress.completedQuests ?? []
    );

    // IMPORTANT:
    // Mark which user's data is currently loaded
    loadedEmailRef.current = email;

    setIsProgressLoaded(true);
  }, [email]);

  // Save progress
  useEffect(() => {
    // Don't save if:
    // 1. No user
    // 2. Progress is not loaded
    // 3. Loaded data belongs to another user
    if (
      !email ||
      !isProgressLoaded ||
      loadedEmailRef.current !== email
    ) {
      return;
    }

    const progress = {
      totalXP,
      gold,
      attributes,
      streak,
      bestStreak,
      lastCompletedDate,
      quests,
      completedQuests,
    };

    const storageKey = `lifeRPGProgress_${email}`;

    localStorage.setItem(
      storageKey,
      JSON.stringify(progress)
    );
  }, [
    email,
    isProgressLoaded,
    totalXP,
    gold,
    attributes,
    streak,
    bestStreak,
    lastCompletedDate,
    quests,
    completedQuests,
  ]);

  // Add XP
  const addXP = (amount) => {
    setTotalXP((prev) => prev + amount);
  };

  // Increase Character Attribute
  const increaseAttribute = (category) => {
    setAttributes((prev) => {
      const updated = { ...prev };

      if (category === "Health") {
        updated.Health = Math.min(
          updated.Health + 2,
          100
        );

        updated.Strength = Math.min(
          updated.Strength + 1,
          100
        );
      }

      if (
        category === "Study" ||
        category === "Learning"
      ) {
        updated.Intelligence = Math.min(
          updated.Intelligence + 2,
          100
        );
      }

      updated.Discipline = Math.min(
        updated.Discipline + 1,
        100
      );

      return updated;
    });
  };

  // Update Streak
  const updateStreak = () => {
    const today = new Date().toDateString();

    // Already completed a quest today
    if (lastCompletedDate === today) {
      return;
    }

    // First ever completion
    if (!lastCompletedDate) {
      setStreak(1);
      setBestStreak(1);
      setLastCompletedDate(today);
      return;
    }

    const lastDate = new Date(lastCompletedDate);
    const currentDate = new Date(today);

    const difference =
      (currentDate - lastDate) /
      (1000 * 60 * 60 * 24);

    if (difference === 1) {
      setStreak((prev) => {
        const newStreak = prev + 1;

        setBestStreak((best) =>
          Math.max(best, newStreak)
        );

        return newStreak;
      });
    } else {
      setStreak(1);
    }

    setLastCompletedDate(today);
  };

  // Complete quest
  const completeQuest = (quest) => {
    setQuests((prev) =>
      prev.filter((item) => item.id !== quest.id)
    );

    setCompletedQuests((prev) => [
      ...prev,
      {
        ...quest,
        completedAt: new Date().toISOString(),
      },
    ]);

    // Add XP
    addXP(quest.xp);

    // Add Gold
    const goldReward = Math.floor(quest.xp / 5);

    setGold((prev) => prev + goldReward);

    // Increase Character Attribute
    increaseAttribute(quest.category);

    // Update Streak
    updateStreak();
  };

  // Delete active quest
  const deleteQuest = (id) => {
    setQuests((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Delete completed quest
  const deleteCompletedQuest = (id) => {
    setCompletedQuests((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const levelData = getLevelData(totalXP);

  return (
    <XPContext.Provider
      value={{
        totalXP,
        addXP,
        levelData,

        // Gold
        gold,
        setGold,

        // Character Attributes
        attributes,

        // Streak
        streak,
        bestStreak,

        // Active quests
        quests,
        setQuests,
        deleteQuest,

        // Completed quests
        completedQuests,
        setCompletedQuests,
        deleteCompletedQuest,

        // Complete
        completeQuest,
      }}
    >
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => useContext(XPContext);

