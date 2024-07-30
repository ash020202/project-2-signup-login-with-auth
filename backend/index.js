import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app = express();

dotenv.config();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log("server is running on port", port);
  connectDB();
});
