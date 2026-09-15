import Expense from "../models/Expense.js";

/**
 * Creates a new expense
 * POST /api/expenses
 *
 * @async
 * @param {import("express").Request} req Contains the expense data.
 * @param {import("express").Response} res Send the saved expense.
 * @param {import("express").NextFunction} next Passes errors to middleware
 * @returns {Promise<void>} Returns a new expense with with status 201
 */

export const createExpense = async (req, res, next) => {
  try {
    // only take that fields whioch user allowed to save.
    const { amount, category, date, note, paymentMethod } = req.body;

    const expense = await Expense.create({
      amount,
      category,
      date,
      note,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Expense created succesfully.",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpense = () => {};
