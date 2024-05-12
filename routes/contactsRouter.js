import express from "express";
import {
  getAllContacts,
  // getOneContact,
  deleteContact,
  createContact,
  // updateContact,
} from "../controllers/contactsControllers.js";
import { protect } from "../midelware/auth.js";

const contactsRouter = express.Router();

contactsRouter.get("/", protect, getAllContacts);

// contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", protect, deleteContact);

contactsRouter.post("/", protect, createContact);

// contactsRouter.put("/:id", updateContact);

export default contactsRouter;
