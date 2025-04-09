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
    const { recipient, content, messageType, fileUrls, sender } = message;

    console.log("hello");

    const createdMessage = await Message.create({
      sender,
      recipient,
      content: content,
      messageType,
      timeStamp: new Date(),
      fileUrls: fileUrls ? fileUrls : null,
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

    if (chat) {
      if (chat.chatMembers) {
        chat.chatMembers.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("receiveMessage", messageData);
          }
        });
      }

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

  const addMember = async (data) => {
    const { chatId, newMembers } = data;

    const chat = await Chat.findById(chatId).populate("chatAdmin");
    const chatMembers = chat.chatMembers;
    const messages = chat.messages;

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

    const memberAddedMessage = await Message.create({
      sender: chat.chatAdmin._id,
      recipient: chatId,
      content: `${chat.chatAdmin.firstName} ${
        chat.chatAdmin.lastName
      } added ${messageContent()}`,
      messageType: "add",
      timeStamp: new Date(),
      fileUrl: null,
    });

    const newChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        messages: [...messages, memberAddedMessage._id],
        chatMembers: [...chatMembers, ...newMembers],
      },
      { new: true, runValidators: true }
    ).populate("chatMembers").populate("chatAdmin");

    const returnData = {
      chatId,
      chatMembers: newChat.chatMembers,
      message: memberAddedMessage,
    }

    if (newChat) {
      if (newChat.chatMembers) {
        chat.chatMembers.forEach((member) => {
          const memberSocketId = userSocketMap.get(member._id.toString());
          if (memberSocketId) {
            io.to(memberSocketId).emit("memberAdded", returnData);
          }
        });
      }

      const adminSocketId = userSocketMap.get(newChat.chatAdmin._id.toString());
      if (adminSocketId) {
        io.to(adminSocketId).emit("memberAdded", returnData);
      }
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

    socket.on("sendMessage", sendMessage);
    socket.on("leaveGroup", leaveGroup);
    socket.on("deleteGroup", deleteGroup);
    socket.on("addMember", addMember);

    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
