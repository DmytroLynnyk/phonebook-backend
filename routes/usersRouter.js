import express from "express";
import { createUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { createNewUser, loginUser } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(createUserSchema), createNewUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.post("/logout");

usersRouter.get("/current");

export default usersRouter;
