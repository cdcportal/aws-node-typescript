import express from "express";
import path from "path";
import dotenv from "dotenv";

if(process.env.NODE_ENV !== 'production'){
  dotenv.config({
    path: path.join(__dirname, '../.env'),
  });
}

const app = express();
 
app.get("/", function (req, res) {
  res.send("This is an updated Hello World," + process.env.sec1);
});
 
app.listen(3000, () => console.log("Listening at 3000!"));

export default app;