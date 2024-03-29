import express from "express";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./configs/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { corsOptions } from "./configs/cors.js";
import locationRouter from "./routes/locationRoutes.js";
dotenv.config();
const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/location", locationRouter);

export default app;
