import { Router } from "express";

import multer from "multer";

import {
  addGroupPic,
  createGroup,
  getUserGroups,
  removeGroupPic,
} from "../controllers/GroupController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

const groupRoutes = Router();
const upload = multer({ dest: "uploads/group" });

groupRoutes.post(
  "/add-group-pic",
  verifyToken,
  upload.single("group-pic"),
  addGroupPic
);
groupRoutes.delete("/remove-group-pic", verifyToken, removeGroupPic);

groupRoutes.post("/create-group", verifyToken, createGroup);
groupRoutes.get("/get-user-groups", verifyToken, getUserGroups);

export default groupRoutes;
