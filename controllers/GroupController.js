import { renameSync, unlinkSync } from "fs";

import User from "../models/UserModel.js";
import Group from "../models/GroupModel.js";
import Message from "../models/MessagesModel.js";

import mongoose from "mongoose";

const addGroupPic = async (request, response, next) => {
  try {
    const { file } = request;

    if (!file) {
      return response.status(400).send("File is required");
    }

    const date = Date.now();
    let fileName = "uploads/group/" + date + file.originalname;

    renameSync(file.path, fileName);

    return response.status(200).json({
      groupPic: fileName,
    });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const removeGroupPic = async (request, response, next) => {
  try {
    const { fileName } = request;

    if (!fileName) {
      return response.status(404).send("File Not found");
    }

    unlinkSync(fileName);

    return response.status(200).send("Group Pic deleted successfully");
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const createGroup = async (request, response, next) => {
  try {
    const { groupName, groupDescription, groupPic } = request.body;
    let { groupMembers } = request.body;
    const userId = request.userId;

    const groupAdmin = await User.findById(userId);

    if (!groupAdmin) {
      return response.status(400).send("Group Admin not Found");
    }

    const validGroupMembers = await User.find({ _id: { $in: groupMembers } });

    if (validGroupMembers.length !== groupMembers.length) {
      return response
        .status(400)
        .send("Some Group Members are not valid users");
    }

    const newGroup = new Group({
      groupName,
      groupDescription,
      groupPic,
      groupAdmin,
      groupMembers,
    });

    await newGroup.save();

    const updatedGroupData = await Group.findById(newGroup._id)
      .populate("groupMembers")
      .populate("groupAdmin");

    return response.status(201).json({ group: updatedGroupData });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const getUserGroups = async (request, response, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(request.userId);

    const groupsList = await Group.find({
      $or: [{ groupAdmin: userId }, { groupMembers: userId }],
    })
      .populate("groupAdmin")
      .populate("groupMembers")
      .sort({ updatedAt: -1 });

    return response.status(200).json({ groupsList });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const getGroupMessages = async (request, response, next) => {
  try {
    const { groupId } = request.body;

    const group = await Group.findById(groupId);

    const messages = await Message.find({
      $or: [{ _id: group.messages }],
    })
      .populate("sender")
      .sort({ timestamp: 1 });

    return response.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal Server Error");
  }
};

export {
  addGroupPic,
  removeGroupPic,
  createGroup,
  getUserGroups,
  getGroupMessages,
};
