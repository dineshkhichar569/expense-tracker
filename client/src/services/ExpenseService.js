import apiClient from "./apiClient";

/**
 * To create a Expense
 *
 * @param {object} Consist details of expense to create
 * @returns {Promise<object>} new expense created
 * @throws {Error} Error if request fails
 */
export const createExpense = async (expenseData) => {
  const { data } = await apiClient.post("/expenses", expenseData);

  return data;
};

/**
 * To get all Expenses
 *
 * @param {Object} [filters={}] optional filters
 * @returns {Promise<Array>} List of Expenses
 * @throws {Error} Error if request fails
 */
export const getExpense = async (filters = {}) => {
  const { data } = await apiClient.get("/expenses", { params: filters });

  return data;
};
