import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  chatType: {
    type: String,
    enum: ["personal", "group"],
    required: true,
  },

  chatName: {
    type: String,
    required: false,
  },

  messages: [
    {
      type: Schema.ObjectId,
      ref: "Messages",
      required: false,
    },
  ],

  chatDescription: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },

  chatMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  ],

  chatPic: {
    type: String,
    required: false,
  },

  chatAdmin: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

chatSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

chatSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Chat = mongoose.model("Chats", chatSchema);

export default Chat;
