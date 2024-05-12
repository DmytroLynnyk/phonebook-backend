import { Contact } from "../db/models/contacts.js";

export const getAll = (owner) => Contact.find({ owner });

export const createOne = async (contactData, owner) => {
  const newContact = new Contact({ ...contactData, owner });
  await newContact.save();
  return newContact;
};

export const deleteOne = async (_id, owner) =>
  Contact.findOneAndDelete({ _id, owner });
