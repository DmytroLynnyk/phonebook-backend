import HttpError from "../helpers/HttpError.js";
import {
  createUser,
  findUserByEmail,
  updateUserWhisToken,
} from "../services/usersServices.js";

export const createNewUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      throw HttpError(409, "user exist");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({
      user: {
        name,
        email,
        avatar: newUser.avatar,
      },
      token: newUser.token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) throw HttpError(401, "Email or password is not correct");
    const checkPassword = await user.comparePass(password);
    if (!checkPassword)
      throw HttpError(401, "Email or password is not correct");
    const loggedUser = await updateUserWhisToken(user._id);
    res.json({
      user: {
        name: loggedUser.name,
        email,
        avatar: loggedUser.avatar,
      },
      token: loggedUser.token,
    });
  } catch (error) {
    next(error);
  }
};
