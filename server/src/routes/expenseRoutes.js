import express from "express";
import { createExpense, deleteExpense, getExpense } from "../controllers/expenseController.js";

/**
 * Handles expense routes.
 * and mounted at /api/expenses in server.js
 */
const expenseRouter = express();

expenseRouter.post("/", createExpense);
expenseRouter.get("/", getExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;
