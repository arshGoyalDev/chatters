import Message from "../models/MessagesModel.js";
import Chat from "../models/ChatModel.js";
import User from "../models/UserModel.js";

import { pub, sub } from "./redis.js";

const setupSocket = (io) => {
  const userSocketMap = new Map();

  const disconnect = async (socket) => {
    if (!socket.handshake.query.userId) {
      console.warn("User ID missing during disconnect.");
      return;
    }

    console.log(`${socket.handshake.query.userId} is offline`);

    await User.findByIdAndUpdate(
      socket.handshake.query.userId,
      {
        userOnline: false,
      },
      { new: true, runValidators: true }
    );

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const receiveMessageFromClient = async (message) => {
    const { recipient, content, messageType, fileUrls, sender } = message;

    const createdMessage = await Message.create({
      sender,
      recipient,
      content: content,
      messageType,
      timeStamp: new Date(),
      fileUrls: fileUrls ? fileUrls : null,
    });

    await Chat.findByIdAndUpdate(recipient, {
      $push: { messages: createdMessage._id },
    });

    const pubMessage = {
      messageId: createdMessage._id,
      event: "send",
    };

    await pub.publish(`CHAT:${recipient}`, JSON.stringify(pubMessage));
  };

  const sendMessageToClient = async (messageId, chatId) => {
    const messageData = await Message.findById(messageId)
      .populate(
        "sender",
        "id email profilePic firstName lastName status userOnline"
      )
      .exec();

    const chat = await Chat.findById(chatId).populate("chatMembers");

    if (chat) {
      if (chat.chatMembers) {
        chat.chatMembers.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("event:chat:receive", messageData);
          }
        });
      }

      const adminSocketId = userSocketMap.get(chat.chatAdmin.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("event:chat:receive", messageData);
      }
    }
  };

  const processDeleteRequest = async (chatId) => {
    const chat = await Chat.findById(chatId).populate("chatAdmin");

    if (chat.messages & (chat.messages.length > 0)) {
      await Message.deleteMany({
        _id: { $in: chat.messages },
      });
    }

    const pubMessage = {
      messageId: "",
      event: "delete-request",
    };

    await pub.publish(`CHAT:${chatId}`, JSON.stringify(pubMessage));
  };

  const confirmDeleteRequest = async (chatId) => {
    const chat = await Chat.findById(chatId).populate("chatAdmin");

    const finalData = {
      chatId: chat._id,
      chatName: chat.chatName,
      chatAdmin: {
        _id: chat.chatAdmin._id,
        name: `${chat.chatAdmin.firstName} ${chat.chatAdmin.lastName}`,
      },
    };

    await Chat.findByIdAndDelete(chatId);

    if (chat.chatMembers) {
      chat.chatMembers.forEach((memberId) => {
        const memberSocketId = userSocketMap.get(memberId.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("event:chat:deleted", finalData);
        }
      });
    }

    const adminSocketId = userSocketMap.get(chat.chatAdmin._id.toString());
    if (adminSocketId) {
      io.to(adminSocketId).emit("event:chat:deleted", finalData);
    }
  };

  const processLeaveRequest = async ({ chatId, leavingMember }) => {
    const leavingMessage = await Message.create({
      sender: leavingMember._id,
      recipient: chatId,
      content: `${leavingMember.firstName} ${leavingMember.lastName} left the group`,
      messageType: "leaving",
      timeStamp: new Date(),
      fileUrl: null,
    });

    const pubMessage = {
      messageId: leavingMessage._id,
      event: "leave-request",
    };

    await pub.publish(`CHAT:${chatId}`, JSON.stringify(pubMessage));
  };

  const confirmLeaveRequest = async (messageId, chatId) => {
    const chat = await Chat.findById(chatId);
    const message = await Message.findById(messageId);

    const chatMembers = chat.chatMembers.filter(
      (memberId) => memberId.toString() !== message.sender.toString()
    );

    await Chat.findByIdAndUpdate(chatId, {
      chatMembers,
      $push: { messages: messageId },
    });

    const newChat = await Chat.findById(chatId)
      .populate("chatMembers")
      .populate("chatAdmin");

    const finalData = {
      message,
      newChat,
      leavingMemberId: message.sender,
    };

    if (chatMembers) {
      newChat.chatMembers.forEach((memberId) => {
        const memberSocketId = userSocketMap.get(memberId.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("event:chat:left", finalData);
        }
      });
    }

    const adminSocketId = userSocketMap.get(newChat.chatAdmin._id.toString());

    if (adminSocketId) {
      io.to(adminSocketId).emit("event:chat:left", finalData);
    }

    const leavingMemberSocketId = userSocketMap.get(
      message.sender._id.toString()
    );

    if (leavingMemberSocketId) {
      io.to(leavingMemberSocketId).emit("event:chat:left", finalData);
    }
  };

  const processAddRequest = async ({ chatId, newMembers }) => {
    const chat = await Chat.findById(chatId).populate("chatAdmin");
    const messages = chat.messages;
    const chatMembers = chat.chatMembers;

    const messageContent = () => {
      const newMembersLength = newMembers.length;

      if (newMembersLength >= 2) {
        return newMembers.map((member, i) => {
          if (i !== newMembersLength - 1)
            return `${member.firstName} ${member.lastName}`;
          else return ` and ${member.firstName} ${member.lastName}`;
        });
      } else return `${newMembers[0].firstName} ${newMembers[0].lastName}`;
    };

    const membersAddedMessage = await Message.create({
      sender: chat.chatAdmin._id,
      recipient: chatId,
      content: `${chat.chatAdmin.firstName} ${
        chat.chatAdmin.lastName
      } added ${messageContent()}`,
      messageType: "add",
      timeStamp: new Date(),
      fileUrl: null,
    });

    await Chat.findByIdAndUpdate(
      chatId,
      {
        messages: [...messages, membersAddedMessage._id],
        chatMembers: [...chatMembers, ...newMembers],
      },
      { new: true, runValidators: true }
    );

    const pubMessage = {
      messageId: membersAddedMessage._id,
      event: "add-request",
    };

    await pub.publish(`CHAT:${chatId}`, JSON.stringify(pubMessage));
  };

  const confirmAddRequest = async (messageId, chatId) => {
    const chat = await Chat.findById(chatId).populate("chatMembers");
    const chatMembers = chat.chatMembers;

    const message = await Message.findById(messageId).populate("sender");

    const returnData = {
      chatId,
      chatMembers: chatMembers,
      message: message,
    };

    if (chat) {
      if (chatMembers) {
        chatMembers.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("event:chat:added", returnData);
          }
        });
      }

      const adminSocketId = userSocketMap.get(
        chat.chatAdmin._id.toString()
      );
      if (adminSocketId) {
        io.to(adminSocketId).emit("event:chat:added", returnData);
      }
    }
  };

  const handleTypingEvent = async ({userTyping, userId, chatId}) => {
    const typingData = {
      userTyping,
      userId,
      chatId
    }

    await pub.publish(`CHAT:${chatId}:${userId}`, JSON.stringify({
      event: "typing",
      typingData
    }))
  }

  const broadcastTypingToOtherUsers = async (typingData) => {
    const { userTyping, userId, chatId } = typingData;

    const userData = await User.findById(userId);

    const data = {
      userTyping,
      userData,
      chatId,
    }

    const chat = await Chat.findById(chatId);

    if (chat) {
      if (chat.chatMembers) {
        chat.chatMembers.forEach((member) => {
          if (member.toString() !== userId) {
            const memberSocketId = userSocketMap.get(member.toString());
            if (memberSocketId) {
              io.to(memberSocketId).emit("event:chat:showTyping", data);
            }
          }
        });
      }

      if (userId !== chat.chatAdmin.toString()) {
        const adminSocketId = userSocketMap.get(chat.chatAdmin.toString());
        if (adminSocketId) {
          io.to(adminSocketId).emit("event:chat:showTyping", data);
        }
      }
    }
  }

  sub.on("pmessage", async (pattern, channel, message) => {
    const { messageId, event, typingData} = JSON.parse(message);
    const chatId = channel.split(":")[1];

    switch (event) {
      case "send":
        sendMessageToClient(messageId, chatId);
        break;
      case "delete-request":
        confirmDeleteRequest(chatId);
        break;

      case "leave-request":
        confirmLeaveRequest(messageId, chatId);
        break;

      case "add-request":
        confirmAddRequest(messageId, chatId);
        break;

      case "typing":
        broadcastTypingToOtherUsers(typingData);
        break;

      default:
        break;
    }
  });

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

      userSocketMap.set(userId, socket.id);

      sub.psubscribe(`CHAT:*`);
    } else {
      console.log("No userId provided");
    }

    socket.on("event:chat:send", receiveMessageFromClient);
    socket.on("event:chat:leave", processLeaveRequest);
    socket.on("event:chat:delete", processDeleteRequest);
    socket.on("event:chat:add", processAddRequest);
    socket.on("event:chat:typing", handleTypingEvent);

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
