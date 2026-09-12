import express from "express";
import {
  createQuest,
  getAllQuests,
  updateQuest,
  deleteQuest,
  completeQuest,
} from "../controller/quest.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createQuest);

router.get("/", authMiddleware, getAllQuests);

router.put("/:id", authMiddleware, updateQuest);

router.delete("/:id", authMiddleware, deleteQuest);

router.patch("/:id/complete", authMiddleware, completeQuest);

export default router;
