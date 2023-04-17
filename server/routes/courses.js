import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";
import { protect } from "../middlewares/protect.js";

const coursesRouter = Router();

coursesRouter.use(protect);

coursesRouter.get("/", courses_controller.getAllCourses);

export default coursesRouter;
