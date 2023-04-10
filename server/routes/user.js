import { Router } from "express";
import * as user_controller from "../controllers/userController.js";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const userRouter = Router();
const multerUpload = multer({ dest: "uploads/" });
const avatarUpload = multerUpload.fields([{ name: "profile_image", maxCount: 1 }]);

userRouter.use(protect);

userRouter.put("/:userId", avatarUpload , user_controller.updateProfile);

export default userRouter;
