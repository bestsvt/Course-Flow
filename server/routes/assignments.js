import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import multer from "multer";
import *  as assignment_controller from "../controllers/assignmentController.js"

const assignmentRouter = Router();
const multerUpload = multer({ dest: "uploads/" });

assignmentRouter.use(protect);
assignmentRouter.put("/:assignmentId" , assignment_controller.postSubmittedAssignments);


export default assignmentRouter;
