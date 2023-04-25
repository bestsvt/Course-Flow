import { Router } from "express";
import * as user_controller from "../controllers/userController.js";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const assignmentRouter = Router();
const multerUpload = multer({ dest: "uploads/" });

assignmentRouter.use(protect);
assignmentRouter.put("/:assignmentId" , user_controller.updateAnswer);


export default assignmentRouter;
