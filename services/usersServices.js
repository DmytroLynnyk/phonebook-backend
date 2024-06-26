import jsonWebToken from "jsonwebtoken";
import { User } from "../db/models/User.js";
import gravatar from "gravatar";

export const findUserByEmail = (email) => User.findOne({ email });

export const findUserById = (id) => User.findById(id);

export const updateUserWhisToken = async (id) => {
  const { SECRET_KEY } = process.env;
  const token = jsonWebToken.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const avatar = gravatar.url(userData.email);
  const newUser = new User({ ...userData, avatar });
  await newUser.hashPassword();
  await newUser.save();
  const user = updateUserWhisToken(newUser._id);
  return user;
};

export const clearToken = (id) => User.findByIdAndUpdate(id, { token: "" });
