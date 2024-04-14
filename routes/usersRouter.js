import express from "express";
import { createUserSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { createNewUser } from "../controllers/usersControllers.js";

const usersRouter = express.Router();

usersRouter.post("/signup", validateBody(createUserSchema), createNewUser);

usersRouter.post("/login");

usersRouter.post("/logout");

usersRouter.get("/current");

export default usersRouter;
