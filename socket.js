import { Server as SocketIoServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import Group from "./models/GroupModel.js";

import User from "./models/UserModel.js";

const setupSocket = (server) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: process.env.origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = async (socket) => {
    console.log(`${socket.handshake.query.userId} is offline`);

    await User.findByIdAndUpdate(
      socket.handshake.query.userId,
      {
        userOnline: false,
      },
      { new: true, runValidators: true }
    );

    // console.log(`Client disconnected! ${socket.id}`);

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const senderSocketId = userSocketMap.get(message.sender);
    const recipientSocketId = userSocketMap.get(message.recipient);

    const createdMessage = await Message.create(message);

    const messageData = await Message.findById(createdMessage._id)
      .populate("sender", "id email firstName lastName profilePic status")
      .populate("recipient", "id email firstName lastName profilePic status");

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", messageData);
    }

    if (senderSocketId) {
      io.to(senderSocketId).emit("receiveMessage", messageData);
    }
  };

  const sendGroupMessage = async (message) => {
    const { groupId, content, messageType, fileUrl, sender } = message;

    const createdMessage = await Message.create({
      sender,
      recipient: null,
      content,
      messageType,
      timeStamp: new Date(),
      fileUrl,
    });

    const messageData = await Message.findById(createdMessage._id)
      .populate(
        "sender",
        "id email profilePic firstName lastName status userOnline"
      )
      .exec();

    await Group.findByIdAndUpdate(groupId, {
      $push: { messages: createdMessage._id },
    });

    const group = await Group.findById(groupId).populate("groupMembers");

    const finalData = { ...messageData._doc, groupId: group._id };

    if (group && group.groupMembers) {
      group.groupMembers.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receiveGroupMessage", finalData);
        }
      });

      const adminSocketId = userSocketMap.get(group.groupAdmin.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("receiveGroupMessage", finalData);
      }
    }
  };

  const deleteGroup = async (groupId) => {
    // await Group.find
    const group = await Group.findById(groupId).populate("groupAdmin");

    await Message.findOneAndDelete({
      $or: [{ _id: group.messages }],
    });

    const groupMembers = group.groupMembers;
    const groupAdmin = group.groupAdmin;

    const finalData = {
      groupId: group._id,
      groupName: group.groupName,
      groupAdmin: `${groupAdmin.firstName} ${groupAdmin.lastName}`,
    };

    await Group.findByIdAndDelete(groupId);

    if (groupMembers) {
      groupMembers.forEach((memberId) => {
        const memberSocketId = userSocketMap.get(memberId.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("groupDeleted", finalData);
        }
      });
    }

    const adminSocketId = userSocketMap.get(groupAdmin._id.toString());
    if (adminSocketId) {
      io.to(adminSocketId).emit("groupDeleted", finalData);
    }
  };

  const leaveGroup = async (data) => {
    const { groupId, leavingMember } = data;

    const group = await Group.findById(groupId).populate("groupMembers");

    const groupMembers = group.groupMembers.filter((member) => {
      if (member._id.toString() !== leavingMember._id) return member;
    });

    const leavingMessage = await Message.create({
      sender: leavingMember._id,
      recipient: null,
      content: `${leavingMember.firstName} ${leavingMember.lastName} left the group`,
      messageType: "last",
      timeStamp: new Date(),
      fileUrl: null,
    });

    const messageData = await Message.findById(leavingMessage._id)
      .populate(
        "sender",
        "id email profilePic firstName lastName status userOnline"
      )
      .exec();

    await Group.findByIdAndUpdate(groupId, {
      $push: { messages: leavingMessage._id },
    });

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        groupMembers,
        $push: { messages: leavingMessage._id },
      },
      { new: true, runValidators: true }
    )
      .populate("groupMembers")
      .populate("groupAdmin");

      const finalData = {
        messageData,
        updatedGroup,
        leavingMemberId: leavingMember._id,
      }
    
      if (groupMembers) {
        updatedGroup.groupMembers.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("memberLeft", finalData);
          }
        });
      }
  
      const adminSocketId = userSocketMap.get(updatedGroup.groupAdmin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("memberLeft", finalData);
      }

      const leavingMemberSocketId = userSocketMap.get(leavingMember._id.toString());
      if (leavingMemberSocketId) {
        io.to(leavingMemberSocketId).emit("memberLeft", finalData);
      }
  };

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          userOnline: true,
        },
        { new: true, runValidators: true }
      );

      console.log(`${userId} is online`);
      userSocketMap.set(userId, socket.id);
      // console.log(`User Conn,ected ${userId} with socket ID : ${socket.id}`);
    } else {
      console.log("User Id not provided during connection");
    }

    socket.on("leaveGroup", leaveGroup);
    socket.on("deleteGroup", deleteGroup);
    socket.on("sendMessage", sendMessage);
    socket.on("sendGroupMessage", sendGroupMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
