// import contactsService from "../services/contactsServices.js";

import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import { createOne, deleteOne, getAll } from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await getAll(req.user._id);

    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getOneContact = (req, res) => {};

export const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;

    const isContactValid = isValidObjectId(contactId);

    if (!isContactValid) {
      throw HttpError(404);
    }

    const result = await deleteOne(contactId, req.user._id);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const contactData = req.body;
    const owner = req.user._id;
    const result = await createOne(contactData, owner);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateContact = (req, res) => {};
