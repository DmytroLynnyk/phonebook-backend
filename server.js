import app from "./app.js";
import { connectDB } from "./db/connection.js";

const { PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
