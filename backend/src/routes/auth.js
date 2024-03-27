import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
const authRouter = Router();

authRouter.post('/register', authControllers.register)

export default authRouter;