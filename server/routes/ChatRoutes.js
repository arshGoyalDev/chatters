import { Router } from "express";

import multer from "multer";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

import {
  addChatPic,
  createGroupChat,
  createPersonalChat,
  getChatData,
  getChatMessages,
  getUserChats,
  removeChatPic,
} from "../controllers/ChatController.js";

const chatRoutes = Router();
const upload = multer({ dest: "uploads/chat" });

chatRoutes.post("/personal-chat", verifyToken, createPersonalChat);

chatRoutes.post(
  "/chat-pic",
  verifyToken,
  upload.single("chat-pic"),
  addChatPic
);
chatRoutes.post("/remove-chat-pic", verifyToken, removeChatPic);
chatRoutes.post("/group-chat", verifyToken, createGroupChat);

chatRoutes.get("/chats", verifyToken, getUserChats);
chatRoutes.post("/get-chat-messages", verifyToken, getChatMessages);

chatRoutes.post("/get-chat", verifyToken, getChatData);

export default chatRoutes;
