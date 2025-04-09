import Message from "../models/MessagesModel.js";

import { mkdirSync, renameSync } from "fs";

const getMessages = async (request, response, next) => {
  try {
    const user1 = request.userId;
    const user2 = request.body.id;

    if (!user1 || !user2)
      return response.status(400).send("Both User Id are required");

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return response.status(200).json({ messages: messages });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const uploadFiles = async (request, response, next) => {
  try {
    const files = request.files;
    let filePaths = [];

    if (!request.files) {
      return response.status(400).send("Files is/are required");
    }

    const date = Date.now();
    const fileDir = `uploads/files/${date}`;

    files.forEach((file) => {
      const fileName = `${fileDir}/${file.originalname}`;

      mkdirSync(fileDir, { recursive: true });
      renameSync(file.path, fileName);

      filePaths.push(fileName);
    });

    return response.status(200).json({ filePaths });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export { getMessages, uploadFiles };
