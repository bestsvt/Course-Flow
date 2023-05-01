import { Router } from "express";
import * as auth_controller from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", auth_controller.register);
authRouter.post("/login", auth_controller.login);
authRouter.post("/loginAdmin", auth_controller.loginAdmin);

export default authRouter;
