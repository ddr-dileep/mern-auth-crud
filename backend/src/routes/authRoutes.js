import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import registerMiddleware from "../middlewares/registerMiddleware.js";
const authRouter = Router();

authRouter.post("/register", registerMiddleware, authControllers.register);

export default authRouter;
