import express from "express";
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js";
import coursesRouter from "./routes/courses.js";
import assignmentsRouter from "./routes/assignments.js";
import adminRouter from "./routes/admin.js";
import cors from 'cors';
import dotenv from "dotenv";
import cloudinary from "cloudinary";

async function init() {
    dotenv.config();
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    const app = express();
    const port = 4000;
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("/auth", authRouter);
    app.use("/user", userRouter);
    app.use("/courses", coursesRouter);
    app.use("/assignments", assignmentsRouter);
    app.use("/admin", adminRouter);
    
    app.get("*", (req, res) => {
      res.status(404).send("Not found");
    });
  
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}
  
init();
  