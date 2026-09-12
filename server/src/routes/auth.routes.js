import { Router } from "express";
import {
    getCurrentUser,
  login,
  logout,
  refreshAccessToken,
  register,
} from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshAccessToken);

router.get("/me", authMiddleware, getCurrentUser);

export default router;
