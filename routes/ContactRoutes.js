import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware.js";

import {
  getAllContacts,
  getPersonalContacts,
  searchContacts,
} from "../controllers/ContactController.js";

const contactRoutes = Router();

contactRoutes.post("/search-contact", verifyToken, searchContacts);
contactRoutes.get("/get-personal-contacts", verifyToken, getPersonalContacts);
contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts);

export default contactRoutes;
