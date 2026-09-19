import express from "express";
import { createExpense, deleteExpense, getExpense, updateExpense } from "../controllers/expenseController.js";

/**
 * Handles expense routes.
 * and mounted at /api/expenses in server.js
 */
const expenseRouter = express();

expenseRouter.post("/", createExpense);
expenseRouter.get("/", getExpense);
expenseRouter.delete("/:id", deleteExpense);
expenseRouter.patch("/:id", updateExpense);

export default expenseRouter;
