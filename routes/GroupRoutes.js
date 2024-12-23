import { Router } from "express";

import multer from "multer";

import { addGroupPic, removeGroupPic } from "../controllers/GroupController.js";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

const groupRoutes = Router();
const upload = multer({ dest: "uploads/group" });

groupRoutes.post(
  "/add-group-pic",
  verifyToken,
  upload.single("group-pic"),
  addGroupPic
);

groupRoutes.post("/remove-group-pic", verifyToken, removeGroupPic);

export default groupRoutes;
