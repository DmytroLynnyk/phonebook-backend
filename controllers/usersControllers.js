import HttpError from "../helpers/HttpError.js";
import { createUser, findUserByEmail } from "../services/usersServices.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "user exist");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({newUser});
  } catch (err) {
    console.log(err);
    next(err);
  }
};
