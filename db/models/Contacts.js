import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },

  name: { type: String, required: true },

  number: { type: String, required: true },
});

export const Contact = model("contact", contactSchema);
