import mongoose from "mongoose";
const uri = process.env.MONGODB_URL;

export const connectDB = async () => {
  mongoose
    .connect(uri, {})
    .then(() => {
      console.log("Connect to mongoDB");
    })
    .catch((e) => console.error(e));

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
};

export const closeSession = async () => {
  await mongoose.connection.close();
};
