import { Router } from "express";
import multer from "multer";

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { uploadFiles } from "../controllers/MessageController.js";

const messageRoutes = Router();
const upload = multer({ dest: "uploads/files" });

messageRoutes.post(
  "/files",
  verifyToken,
  upload.array("files", 10),
  uploadFiles
);

export default messageRoutes;
