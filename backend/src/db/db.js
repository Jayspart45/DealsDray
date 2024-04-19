import mongoose from "mongoose";

import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `!!!Mongo Connection Established ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongo Db Connection Error", error);
    process.exit(1);
  }
};

export default connectDB