import { Router } from "express";
import * as auth_controller from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", auth_controller.register);

export default authRouter;
