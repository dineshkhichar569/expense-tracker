import "dotenv/config";
import express from "express";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4050;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// connection first : start the server only after the database is connected.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
