import express from "express";

async function init() {
    
    const app = express();
    const port = 4000;
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
  
  
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
  
    app.get("*", (req, res) => {
      res.status(404).send("Not found");
    });
  
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
}
  
init();
  