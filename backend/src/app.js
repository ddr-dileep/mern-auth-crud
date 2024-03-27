import express from "express";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

connectDB();

app.use(express.json());
app.use("/api/v1/auth", authRouter);

export default app;
