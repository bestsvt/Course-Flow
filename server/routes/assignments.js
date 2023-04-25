import { Router } from "express";
import * as assignments_controller from "../controllers/assignmentsController.js";
import { protect } from "../middlewares/protect.js";

const assignmentsRouter = Router();

assignmentsRouter.use(protect);

assignmentsRouter.put("/:assignmentId/save", assignments_controller.putSaveDraftAssignment);
assignmentsRouter.put("/:assignmentId/submit", assignments_controller.putSubmitAssignment);

export default assignmentsRouter;
