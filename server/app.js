import express from "express";
import authRouter from "./routes/auth.js"
import cors from 'cors';

async function init() {
    
    const app = express();
    const port = 4000;
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    
    app.use("/auth", authRouter);

    app.get("*", (req, res) => {
      res.status(404).send("Not found");
    });
  
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}
  
init();
  