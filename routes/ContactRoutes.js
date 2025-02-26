import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

import {
  getPersonalContacts,
  searchContacts,
} from "../controllers/ContactController.js";

const contactRoutes = Router();

contactRoutes.post("/search-contact", verifyToken, searchContacts);
contactRoutes.get("/personal-contacts", verifyToken, getPersonalContacts);

export default contactRoutes;
