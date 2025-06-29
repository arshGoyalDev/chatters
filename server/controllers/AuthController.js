import jwt from "jsonwebtoken";

import { compare } from "bcrypt";

import User from "../models/UserModel.js";

import { renameSync, unlinkSync, existsSync } from "fs";
import {
  cacheData,
  getCachedData,
  removeCachedData,
} from "../services/redis.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

const signup = async (request, response, next) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send("Email and Password is required");
    }

    const user = await User.create({ firstName, lastName, email, password });

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(201).json({
      user: {
        _id: user.id,
        userOnline: user.userOnline,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: "",
        profilePic: "",
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (email && !password) {
      return response.status(400).send("Email and Password is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).send("User with the given email not found");
    }

    const auth = await compare(password, user.password);

    if (!auth) {
      return response.status(401).send("Password is incorrect");
    }

    response.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });

    return response.status(200).json({
      user: {
        _id: user.id,
        userOnline: user.userOnline,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        profilePic: user.profilePic,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const getUserInfo = async (request, response, next) => {
  try {
    const cachedUserData = await getCachedData(`user:${request.userId}`);

    if (cachedUserData) {
      return response.status(200).json({ user: cachedUserData });
    }

    const userData = await User.findById(request.userId);

    if (!userData) {
      return response.status(404).send("User with the given id not found");
    }

    await cacheData(`user:${userData.id}`, userData, 3600);

    return response.status(200).json({ user: userData });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const updateProfile = async (request, response, next) => {
  try {
    const { userId } = request;
    const { firstName, lastName, status } = request.body;

    if (!firstName && !lastName) {
      return response.status(404).send("First Name or Last Name required");
    }

    await removeCachedData(`user:${userId}`);

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        status,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    await cacheData(`user:${userData.id}`, userData, 3600);

    return response.status(200).json({ user: userData });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const addProfilePic = async (request, response, next) => {
  try {
    const { userId, file } = request;

    if (!file) {
      return response.status(400).send("File is required");
    }

    await removeCachedData(`user:${userId}`);

    const data = Date.now();
    let fileName = "uploads/profile/" + data + file.originalname;

    renameSync(file.path, fileName);
    const userData = await User.findByIdAndUpdate(
      userId,
      { profilePic: fileName },
      { new: true, runValidators: true }
    );

    await cacheData(`user:${userData.id}`, userData, 3600);

    return response.status(200).json({ user: userData });
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const removeProfilePic = async (request, response, next) => {
  try {
    const { userId } = request;

    const userData = await User.findById(userId);

    await removeCachedData(`user:${userId}`);

    if (!userData) {
      return response.status(404).send("User Not found");
    }

    if (userData.profilePic) {
      if (existsSync(userData.profilePic)) {
        unlinkSync(userData.profilePic);
      } else {
        console.warn("File not found:", userData.profilePic);
      }
    }

    userData.profilePic = "";
    await userData.save();

    await cacheData(`user:${userData.id}`, userData, 3600);

    return response.status(200).send("Profile Pic deleted successfully");
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

const logout = async (request, response, next) => {
  try {
    response.cookie("jwt", "", { maxAge: 1, secure: true, sameSite: "None" });
    response.status(200).send("Logged out successfully");
  } catch (error) {
    return response.status(500).send("Internal Server Error");
  }
};

export {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfilePic,
  removeProfilePic,
  logout,
};
