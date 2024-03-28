import { Router } from "express";
import authControllers from "../controllers/authControllers.js";
import userMiddleware from "../middlewares/userMiddleware.js";
import { verifyUserMiddleware } from "../middlewares/authMiddleware.js";
import { uploadStorage } from "../utils/multer.js";
const authRouter = Router();

authRouter.post(
  "/register",
  uploadStorage.single("profilePic"),
  userMiddleware.registerMiddleware,
  authControllers.register
);

authRouter.post(
  "/login",
  userMiddleware.loginMiddleware,
  authControllers.login
);

authRouter.get(
  "/user-info",
  verifyUserMiddleware,
  authControllers.getUserInfo
);

export default authRouter;
