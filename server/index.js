import express from "express";
import cors from "cors";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";

import { Server as SocketIoServer } from "socket.io";

import setupSocket from "./services/socket.js";

import {
  authRoutes,
  contactRoutes,
  messageRoutes,
  chatRoutes,
} from "./routes/index.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const io = new SocketIoServer(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);

mongoose
  .connect(databaseURL)
  .then(() => console.log(`DB connection successful`))
  .catch((error) => console.log(error.message));
