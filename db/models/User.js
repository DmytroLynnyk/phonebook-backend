import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: String,
    avatar: { type: String, default: "" },
  },

  {
    versionKey: false,
  }
);
userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};
userSchema.methods.comparePass = async function (pass) {
  return await bcryptjs.compare(pass, this.password)
}
export const User = model("user", userSchema);
