import { Router } from "express";

import {
  login,
  signup,
  getUserInfo,
  updateProfile,
  addProfilePic,
  removeProfilePic,
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
  "/profile-pic",
  verifyToken,
  upload.single("profile-pic"),
  addProfilePic
);
authRoutes.delete("/profile-pic", verifyToken, removeProfilePic);


export default authRoutes;
