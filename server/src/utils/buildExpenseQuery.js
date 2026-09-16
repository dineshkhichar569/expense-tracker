/**
 *  Creates a mongoDB filter for Expense List
 *
 * @param {Object} query Query values from url
 * @param {string} [query.category] filters by category
 * @param {string} [query.from] finds expenses from selected date
 * @param {string} [query.to] finds expenses to selected date
 * @returns {Object} A filter Object used to find expenses from MongoDB
 */
const buildExpenseQuery = (query) => {
  const filter = {};

  if (query.category) {
    filter.category = query.category.trim().toLowerCase();
  }

  if (query.from || query.to) {
    filter.date = {};

    if (query.from) {
      filter.date.$gte = new Date(query.from);
    }
    if (query.to) {
      const endDate = new Date(query.to);

      //set the time to the end of the day so the expenses on this date are included
      endDate.setHours(23, 59, 59, 999);
      filter.date.$lte = endDate;
    }
  }

  return filter;
};

export default buildExpenseQuery;
