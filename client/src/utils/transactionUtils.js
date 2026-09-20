/**
 * It calculates income, expense, saving from transactions
 * and also group the expense and income on the basis of category
 * and also return the month wise income and expense
 *
 * @param {Object} props
 * @param {Array} props.transactions list of all transactions
 * @param {String} props.month selected month in YYYY-MM format
 * @returns {Object} all calculated items
 */
export const getTransactionSummary = ({ transactions, month }) => {
  let totalIncome = 0;
  let totalExpense = 0;
  let incomeMonth = 0;
  let expenseMonth = 0;
  let expenseCategories = [];
  let incomeCategories = [];

  for (const item of transactions) {
    let itemMonth = item.date?.slice(0, 7);

    if (item.type === "income") {
      totalIncome += item.amount;

      // calculate the monthly income which belog to the specific month
      if (itemMonth && itemMonth === month) {
        incomeMonth += item.amount;
      }

      // checks if the category alreadyy present orr not and if not then add it
      const currCategory = incomeCategories.find(
        (cat) => cat.name === item.category,
      );

      if (currCategory) {
        currCategory.price += item.amount;
      } else {
        incomeCategories.push({
          name: item.category,
          price: item.amount,
        });
      }
    }

    if (item.type === "expense") {
      totalExpense += item.amount;

      // calculate the monthly expense which belog to the specific month
      if (itemMonth && itemMonth === month) {
        expenseMonth += item.amount;
      }

      // checks if the category alreadyy present orr not and if not then add it
      const currCategory = expenseCategories.find(
        (cat) => cat.name === item.category,
      );

      if (currCategory) {
        currCategory.price += item.amount;
      } else {
        expenseCategories.push({
          name: item.category,
          price: item.amount,
        });
      }
    }
  }

  let netSaving = totalIncome - totalExpense;

  incomeCategories.sort((a, b) => b.price - a.price);
  expenseCategories.sort((a, b) => b.price - a.price);

  return {
    totalIncome,
    totalExpense,
    incomeMonth,
    expenseMonth,
    incomeCategories,
    expenseCategories,
    netSaving,
  };
};
