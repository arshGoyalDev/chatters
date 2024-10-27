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
// import multer = multer({dest: "up"})
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profile" });

authRoutes.post("/sign-up", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/delete-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", logout);

export default authRoutes;
