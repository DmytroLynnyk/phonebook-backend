import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError";
import { findUserById } from "../services/usersServices";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw HttpError(401);
    }
    const [type, token] = authHeader.split(" ");
    if (type !== "Bearer") {
      throw HttpError(401, "authToken must is Bearer");
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const currentUser = await findUserById(id);
    if (!currentUser || !currentUser.token || currentUser.token !== token) {
      throw HttpError(401);
    }
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};
