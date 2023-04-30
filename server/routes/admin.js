import { Router } from "express";
import * as admin_controller from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.get("/courses", admin_controller.getAllCourses);
adminRouter.put("/courses/:courseId", admin_controller.updateCourse);
adminRouter.delete("/courses/:courseId", admin_controller.deleteCourse);

export default adminRouter;