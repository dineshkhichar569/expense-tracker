import apiClient from "./apiClient";

/**
 * To create a Expense
 *
 * @param {object} Consist details of expense to create
 * @returns {Promise<object>} new expense created
 * @throws {Error} Error if request fails
 */
export const createExpense = async (data) => {
  const res = await apiClient.post("/expenses", data);

  return res;
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

/**
 * To deletee the transaction by _id
 *
 * @param {String} id : transaction._id
 * @returns {Object} response from server
 */
export const deleteExpense = async (id) => {
  const { data } = await apiClient.delete(`/expenses/${id}`);

  return data;
};

/**
 * To upddate the transaction
 *
 * @param {String} id : transaction._id
 * @param {Object} data : it is the updated data
 * @returns {Object} response from the server
 */
export const updateExpense = async (id, data) => {
  const res = await apiClient.patch(`/expenses/${id}`, data);
  return res;
};
