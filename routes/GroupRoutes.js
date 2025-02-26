import { Router } from "express";

import multer from "multer";

import {
  addGroupPic,
  createGroup,
  getGroupMessages,
  getUserGroups,
  removeGroupPic,
} from "../controllers/GroupController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

const groupRoutes = Router();
const upload = multer({ dest: "uploads/group" });

groupRoutes.post(
  "/group-pic",
  verifyToken,
  upload.single("group-pic"),
  addGroupPic
);
groupRoutes.post("/remove-group-pic", verifyToken, removeGroupPic);

groupRoutes.post("/create-group", verifyToken, createGroup);
groupRoutes.get("/user-groups", verifyToken, getUserGroups);
groupRoutes.post("/group-messages", verifyToken, getGroupMessages);

export default groupRoutes;
