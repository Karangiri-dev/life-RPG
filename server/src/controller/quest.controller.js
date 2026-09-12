import User from "../models/auth.model.js";
import Quest from "../models/quest.model.js";

export const createQuest = async (req, res) => {
  try {
    const { title, description, difficulty } = req.body;

    if (!title || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "title and difficulty are required",
      });
    }

    let xpReward = 0;
    let goldReward = 0;

    if (difficulty === "easy") {
      xpReward = 10;
      goldReward = 5;
    } else if (difficulty === "medium") {
      xpReward = 25;
      goldReward = 10;
    } else if (difficulty === "hard") {
      xpReward = 50;
      goldReward = 20;
    } else {
      return res.status(400).json({
        success: false,
        message: "invalid difficulty",
      });
    }

    const quest = await Quest.create({
      title,
      description,
      difficulty,
      xpReward,
      goldReward,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Quest created successfully",
      quest,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      count: quests.length,
      quests,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await Quest.findById(id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "quest not found",
      });
    }

    if (quest.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedQuest = await Quest.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Quest updated successfully",
      quest: updatedQuest,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await Quest.findById(id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    if (quest.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Quest.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Quest deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const completeQuest = async (req, res) => {
  try {
    const { id } = req.params;

    const quest = await Quest.findById(id);

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    if (quest.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (quest.isCompleted) {
      return res.status(400).json({
        success: false,
        message: "Quest already completed",
      });
    }

    quest.isCompleted = true;
    await quest.save();

    const user = await User.findById(req.user.id);

    user.xp += quest.xpReward;
    user.gold += quest.goldReward;

    const requiredXP = user.level * 100;

    if (user.xp >= requiredXP) {
      user.level += 1;
      user.xp -= requiredXP;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Quest completed successfully",
      rewards: {
        xp: quest.xpReward,
        gold: quest.goldReward,
      },
      user: {
        level: user.level,
        xp: user.xp,
        gold: user.gold,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
