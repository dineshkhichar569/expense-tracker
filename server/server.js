import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import expenseRouter from "./src/routes/expenseRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import { notFound } from "./src/middleware/notFound.js";

const PORT = process.env.PORT || 4050;
const app = express();

app.use(
  cors({
    origin: process.env.VITE_API_URL,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.send("Hello World");
});

app.use("/api/expenses", expenseRouter);
app.use(notFound);
app.use(errorHandler);

// connection first : start the server only after the database is connected.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
