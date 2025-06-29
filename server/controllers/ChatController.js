import { renameSync, unlinkSync, existsSync } from "fs";

import Chat from "../models/ChatModel.js";
import Message from "../models/MessagesModel.js";
import User from "../models/UserModel.js";

const createPersonalChat = async (request, response, next) => {
  try {
    const { chatMemberId, chatMemberFirstName } = request.body;
    const chatAdmin = await User.findOne({ _id: request.userId });

    if (!chatMemberId)
      return response.status(400).send("Chat Member is required");

    if (!chatAdmin) return response.status(404).send("Chat Admin Not found");

    const newChat = new Chat({
      chatName: `${chatAdmin.firstName} - ${chatMemberFirstName}: Personal Chat`,
      chatType: "personal",
      messages: [],
      chatAdmin,
      chatMembers: [chatMemberId],
    });

    await newChat.save();

    const updatedChatData = await Chat.findById(newChat._id)
      .populate("chatAdmin")
      .populate("chatMembers");

    return response.status(201).json({ chat: updatedChatData });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const addChatPic = async (request, response, next) => {
  try {
    const { file } = request;

    if (!file) {
      return response.status(400).send("File is required");
    }

    const date = Date.now();
    let fileName = "uploads/chat/" + date + file.originalname;

    renameSync(file.path, fileName);

    return response.status(200).json({
      chatPic: fileName,
    });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const removeChatPic = async (request, response, next) => {
  try {
    const { fileName } = request.body;

    if (!fileName) {
      return response.status(404).send("File Not found");
    }

    if (existsSync(fileName)) {
      unlinkSync(fileName);
    } else {
      console.warn("File not found:", fileName);
    }
    return response.status(200).send("Group Pic deleted successfully");
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const createGroupChat = async (request, response, next) => {
  try {
    const { chatName, chatDescription, chatPic } = request.body;
    let { chatMembers } = request.body;
    const userId = request.userId;

    const chatAdmin = await User.findById(userId);

    if (!chatAdmin) {
      return response.status(400).send("chat Admin not Found");
    }

    const validChatMembers = await User.find({ _id: { $in: chatMembers } });

    if (validChatMembers.length !== chatMembers.length) {
      return response.status(400).send("Some chat Members are not valid users");
    }

    let newChat = new Chat({
      chatName,
      chatDescription,
      chatPic,
      chatAdmin,
      chatType: "group",
      messages: [],
      chatMembers,
    });

    await newChat.save();

    const chatCreatedMessage = await Message.create({
      sender: chatAdmin._id,
      recipient: newChat._id,
      content: `${chatAdmin.firstName} ${chatAdmin.lastName} created the chat "${chatName}"`,

      messageType: "create",
      timeStamp: new Date(),
      fileUrl: null,
    });

    await chatCreatedMessage.save();

    newChat = await Chat.findByIdAndUpdate(newChat._id, {
      messages: [chatCreatedMessage._id],
    });

    const updatedChat = await Chat.findById(newChat._id)
      .populate("chatMembers")
      .populate("chatAdmin");

    return response.status(201).json({ chat: updatedChat });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const getUserChats = async (request, response, next) => {
  try {
    const userId = request.userId;

    const chats = await Chat.find({
      $or: [{ chatAdmin: userId }, { chatMembers: userId }],
    })
      .populate("chatAdmin")
      .populate("chatMembers")
      .sort([["updatedAt", -1]]);

    return response.status(200).json({ chats });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const getChatMessages = async (request, response, next) => {
  try {
    const { chatId } = request.body;

    const chat = await Chat.findById(chatId);

    const messages = await Message.find({
      $or: [{ _id: chat.messages }],
    })
      .populate("sender")
      .sort({ timeStamp: 1 });

    return response.status(200).json({ messages });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const getChatData = async (request, response, next) => {
  try {
    const { chatId } = request.body;

    const chat = await Chat.findById(chatId)
      .populate("chatAdmin")
      .populate("chatMembers");

    return response.status(200).json({ chat });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

export {
  createPersonalChat,
  addChatPic,
  removeChatPic,
  getChatMessages,
  getUserChats,
  createGroupChat,
  getChatData,
};
