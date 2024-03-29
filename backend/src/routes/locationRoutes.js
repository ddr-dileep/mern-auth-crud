import { Router } from "express";
import locationControllers from "../controllers/locationControllers.js";
import { verifyUserMiddleware } from "../middlewares/authMiddleware.js";

const locationRouter = Router();

locationRouter.get(
  "/near-by",
  verifyUserMiddleware,
  locationControllers.getNearByUser
);

export default locationRouter;