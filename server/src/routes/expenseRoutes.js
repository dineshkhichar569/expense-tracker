import express from "express";
import { createExpense } from "../controllers/expenseController.js";

/**
 * Handles expense routes.
 * and mounted at /api/expenses in server.js
 */

const expenseRouter = express();

expenseRouter.post("/", createExpense);

export default expenseRouter;
