import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupDescription: {
    type: String,
    required: true,
  },
  groupPic: {
    type: String,
    required: false,
  },
  groupAdmin: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  groupMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Messages",
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

groupSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

groupSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const Group = mongoose.model("Groups", groupSchema);

export default Group;
