import { connect } from "mongoose";

const { DB_URL } = process.env;

export const connectDB = async () => {
  try {
    await connect(DB_URL);
    console.log("DB is connected");
  } catch (err) {
    console.log(err);
  }
};
