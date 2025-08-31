import express from "express";
import ENV from "./config/env.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

connectDB().then(() => {
  app.listen(ENV.PORT, () => {
    console.log(`Server is running on http://localhost:${ENV.PORT}`);
  });
});
