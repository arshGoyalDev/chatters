import { Router } from "express";

import {
  login,
  signup,
  getUserInfo,
  updateProfile,
} from "../controllers/AuthController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);

export default authRoutes;
