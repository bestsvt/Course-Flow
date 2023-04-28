import { Router } from "express";
import * as admin_controller from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", admin_controller.loginAdmin);

export default adminRouter;