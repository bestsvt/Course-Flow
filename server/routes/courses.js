import { Router } from "express";
import * as courses_controller from "../controllers/coursesController.js";
import { protect } from "../middlewares/protect.js";

const coursesRouter = Router();

coursesRouter.get("/", courses_controller.getAllCourses);
coursesRouter.get("/:courseId", courses_controller.getCoursesById);
coursesRouter.get("/:courseId/learning/:subLessonId", courses_controller.getSubLessonById);
coursesRouter.get("/:courseId/lastSubLesson", courses_controller.getLastSubLesson);

coursesRouter.use(protect);
coursesRouter.post("/:courseId", courses_controller.postSubscriptionAndDesire);
coursesRouter.post("/:courseId/learning/:subLessonId", courses_controller.postLearningSublessonAndCreateAssignment);

export default coursesRouter;
