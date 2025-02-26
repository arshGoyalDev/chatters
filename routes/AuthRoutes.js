import { Router } from "express";

import {
  login,
  signup,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logout,
} from "../controllers/AuthController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profile" });

authRoutes.post("/sign-up", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.patch("/user-info", verifyToken, updateProfile);

authRoutes.post(
  "/profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/profile-image", verifyToken, removeProfileImage);


export default authRoutes;
