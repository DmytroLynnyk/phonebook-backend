import express from "express";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import {
  createNewUser,
  currentUser,
  loginUser,
  logout,
} from "../controllers/usersControllers.js";
import { protect } from "../midelware/auth.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(createUserSchema), createNewUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.post("/logout", protect, logout);

usersRouter.get("/current", protect, currentUser);

export default usersRouter;
