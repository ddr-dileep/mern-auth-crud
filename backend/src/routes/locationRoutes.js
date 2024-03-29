import { Router } from "express";
import locationControllers from "../controllers/locationControllers.js";

const locationRouter = Router();

locationRouter.get("/near-by", locationControllers.getNearByUser);

export default locationRouter;