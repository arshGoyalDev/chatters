import { Router } from "express";
import { signup } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/sign-up", signup);

export default authRoutes;