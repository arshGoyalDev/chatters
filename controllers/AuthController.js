import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import User from "../models/UserModel.js";

import {renameSync, unlinkSync} from "fs";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

const signup = async (request, response, next) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (email && !password) {
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
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: "",
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
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
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePic: user.profilePic,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const getUserInfo = async (request, response, next) => {
  try {
    const userData = await User.findById(request.userId);

    if (!userData) {
      return response.status(404).send("User with the given id not found");
    }

    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePic: userData.profilePic,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const updateProfile = async (request, response, next) => {
  try {
    const { userId } = request;
    const { firstName, lastName } = request.body;

    if (!firstName || !lastName) {
      return response.status(404).send("First Name or Last Name required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePic: userData.profilePic,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

const addProfileImage = async (request, response, next) => {
  try {
    console.log(request.file);
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    const data = Date.now();

    let fileName = "uploads/profile/" + data + request.file.originalname;
    renameSync(request.file.path, fileName);

    const userData = await User.findByIdAndUpdate(request.userId, {profilePic: fileName}, {new: true, runValidators: true});


    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePic: userData.profilePic,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    console.log(error.message);
    return response.status(500).send("Internal Server Error");
  }
};

const removeProfileImage = async (request, response, next) => {
  try {
    const {} = request;
    const { firstName, lastName } = request.body;

    if (!firstName || !lastName) {
      return response.status(404).send("First Name or Last Name required");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      user: {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePic: userData.profilePic,
        profileSetup: userData.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal Server Error");
  }
};

export {
  signup,
  login,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
};
