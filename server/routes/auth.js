import { Router } from "express";
import * as auth_controller from "../controllers/authController.js";
import { protect } from "../middlewares/protect.js";

const authRouter = Router();

// authRouter.use(protect);

authRouter.post("/register", auth_controller.register);
authRouter.post("/login", auth_controller.login);

export default authRouter;
