import Message from "./models/MessagesModel.js";
import Chat from "./models/ChatModel.js";
import User from "./models/UserModel.js";

const setupSocket = (io) => {
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

    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const { recipient, content, messageType, fileUrl, sender } = message;

    const createdMessage = await Message.create({
      sender,
      recipient,
      content: content,
      messageType,
      timeStamp: new Date(),
      fileUrl,
    });

    let messageData = await Message.findById(createdMessage._id)
      .populate(
        "sender",
        "id email profilePic firstName lastName status userOnline"
      )
      .exec();

    await Chat.findByIdAndUpdate(recipient, {
      $push: { messages: createdMessage._id },
    });

    const chat = await Chat.findById(recipient).populate("chatMembers");

    if (chat && chat.chatMembers) {
      chat.chatMembers.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("receiveMessage", messageData);
        }
      });

      const adminSocketId = userSocketMap.get(chat.chatAdmin.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("receiveMessage", messageData);
      }
    }
  };

  const deleteGroup = async (chatId) => {
    const chat = await Chat.findById(chatId).populate("chatAdmin");

    if (chat.messages & (chat.messages.length > 0)) {
      await Message.deleteMany({
        _id: { $in: chat.messages },
      });
    }

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
          io.to(memberSocketId).emit("groupDeleted", finalData);
        }
      });
    }

    const adminSocketId = userSocketMap.get(chat.chatAdmin._id.toString());
    if (adminSocketId) {
      io.to(adminSocketId).emit("groupDeleted", finalData);
    }
  };

  const leaveGroup = async (data) => {
    const { chatId, leavingMember } = data;

    const chat = await Chat.findById(chatId).populate("chatMembers");

    const chatMembers = chat.chatMembers.filter(
      (member) => member._id.toString() !== leavingMember._id
    );

    const leavingMessage = await Message.create({
      sender: leavingMember._id,
      recipient: chatId,
      content: `${leavingMember.firstName} ${leavingMember.lastName} left the group`,
      messageType: "leaving",
      timeStamp: new Date(),
      fileUrl: null,
    });

    const messageData = await Message.findById(leavingMessage._id)
      .populate("sender")
      .exec();

    await Chat.findByIdAndUpdate(chatId, {
      chatMembers,
      $push: { messages: leavingMessage._id },
    });

    const newChat = await Chat.findById(chatId)
      .populate("chatMembers")
      .populate("chatAdmin");

    const finalData = {
      messageData,
      newChat,
      leavingMemberId: leavingMember._id,
    };

    if (chatMembers) {
      newChat.chatMembers.forEach((member) => {
        const memberSocketId = userSocketMap.get(member._id.toString());
        if (memberSocketId) {
          io.to(memberSocketId).emit("memberLeft", finalData);
        }
      });
    }

    const adminSocketId = userSocketMap.get(newChat.chatAdmin._id.toString());

    if (adminSocketId) {
      io.to(adminSocketId).emit("memberLeft", finalData);
    }

    const leavingMemberSocketId = userSocketMap.get(
      leavingMember._id.toString()
    );

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

      userSocketMap.set(userId, socket.id);
    } else {
      console.log("No userId provided");
    }

    socket.on("leaveGroup", leaveGroup);
    socket.on("deleteGroup", deleteGroup);
    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
