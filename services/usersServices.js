import jsonWebToken from "jsonwebtoken";
import { User } from "../db/models/User.js";
import gravatar from "gravatar";

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

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
