import mongoose from "mongoose";

import User from "../models/UserModel.js";
import Message from "../models/MessagesModel.js";

const searchContacts = async (request, response, next) => {
  try {
    const { searchTerm } = request.body;

    if (!searchTerm) return response.status(400).send("Search Term required");

    const modifiedSearchTerm = searchTerm.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(modifiedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: request.userId } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const getPersonalContacts = async (request, response, next) => {
  try {
    let { userId } = request;

    userId = new mongoose.Types.ObjectId(userId);

    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },
      {
        $sort: { timeStamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$recipient",
              else: "$sender",
            },
          },
          lastMessageSender: { $first: "$sender" },
          lastFile: { $first: "$fileUrl" },
          lastMessage: { $first: "$content" },
          lastMessageTime: { $first: "$timeStamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contactInfo",
        },
      },
      {
        $unwind: "$contactInfo",
      },
      {
        $project: {
          _id: 1,
          lastMessageSender: 1,
          lastFile: 1,
          lastMessage: 1,
          lastMessageTime: 1,
          userInfo: "$contactInfo",
        },
      },
      {
        $sort: { lastMessageTime: -1 },
      },
    ]);

    return response.status(200).json({ contacts });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const getAllContacts = async (request, response, next) => {
  try {
    const users = await User.find(
      { _id: { $ne: request.userId } },
      "email firstName lastName _id profilePic status"
    );
    return response.status(200).json({ users });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export { searchContacts, getPersonalContacts, getAllContacts };
