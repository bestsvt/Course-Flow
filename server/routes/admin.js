import { Router } from "express";
import * as admin_controller from "../controllers/adminController.js";
import multer from "multer";

const adminRouter = Router();
const multerUpload = multer({ dest: "uploads/" });

const courseUpload = multerUpload.fields([
  { name: "cover_image_file", maxCount: 1 },
  { name: "video_file", maxCount: 1 },
  { name: "sub_lesson_videos", maxCount: 200 },
]);

adminRouter.get("/courses", admin_controller.getAllCourses);
adminRouter.get("/assignments", admin_controller.getAllAssignments);
adminRouter.get("/courses/:courseId", admin_controller.getCoursesById);
adminRouter.get("/lessons/:lessonId", admin_controller.getLessonById);
adminRouter.post("/courses", courseUpload, admin_controller.createCourse);
adminRouter.put("/courses/:courseId", courseUpload, admin_controller.updateCourse);
adminRouter.delete("/courses/:courseId", admin_controller.deleteCourse);

export default adminRouter;
