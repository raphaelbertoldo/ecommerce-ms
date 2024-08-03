import mongoose from "mongoose";
import server from "../../index.js";
const uri = process.env.MONGODB_URL;

export const connectDB = async () => {
  mongoose
    .connect(uri, {})
    .then(() => {
      console.log("Connect to mongoDB");
    })
    .catch((e) => console.error(e));
};

export const closeSession = async () => {
  await mongoose.connection.close();
};
