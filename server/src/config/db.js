import mongoose from "mongoose";

/**
 * Establishes the MongoDB connection using URI from env variables
 * @async
 * @returns {Promise<void>} The function completes only after MOngoDB connects
 */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error : ", error.message);
    // if the data base does not connect then stop the server cause the app will not work without it.
    process.exit(1);
  }
};

export default connectDB;
