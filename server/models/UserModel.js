import { genSalt, hash } from "bcrypt";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
  userOnline: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await genSalt();

  this.password = await hash(this.password, salt);

  next();
});

const User = mongoose.model("Users", userSchema);

export default User;
