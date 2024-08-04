import express from "express";
import routes from "./router/index.js";
import "dotenv/config";
import { connectDB, closeSession } from "./providers/mongodb.js";
const app = express();

app.use("/api/v1/orders", routes);

const PORT = process.env.PORT || 3003;

async function startServer() {
  try {
    const server = app.listen(PORT, async () => {
      await connectDB();
      console.log(`Order service started on port ${PORT}`);
    });
    process.on("SIGINT", async () => {
      server.close(() => {
        closeSession();
        console.log("Server closed.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to mongoose:", error);
  }
}

startServer();

export default app;
