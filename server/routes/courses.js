import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";
import { protect } from "../middlewares/protect.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAllCourses);
coursesRouter.get("/:courseId", courses_controller.getCoursesById);

// coursesRouter.use(protect);

export default coursesRouter;
