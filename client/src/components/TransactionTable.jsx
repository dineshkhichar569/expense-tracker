import {
  EXPENSE_CATEGORIES,
  formatDate,
  INCOME_CATEGORIES,
} from "../utils/constants";
import { CircleHelp, Pencil, Trash2 } from "lucide-react";
import EmptyState from "./EmptyState";
import { deleteExpense } from "../services/ExpenseService";

/**
 * It shows all transactions in table with edit and delet options
 *
 * @param {Object} props
 * @param {Array} props.transactions : List of transactions to display
 * @param {Function} props.setTransactions : to update the transaction list
 * @param {Function} props.setOpen : to open and close the trannsactions
 * @param {Function} props.setUpdatingExpense : to set the transaction which is being updating
 * @returns {JSX.Element} the transaction table
 */
function TransactionTable({
  filteredTransactions,
  setFilteredTransactions,
  setOpen,
  setUpdatingExpense,
}) {
  /**
   * it ffinds the category details for the transaction.
   *
   * @param {Object} item : Transaction Data
   * @returns {Object} category details
   */
  const getCategory = (item) => {
    const categories =
      item.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

    return categories.find((category) => category.name === item.category);
  };

  /**
   * To delete the transaction from database and instantly remove it from frontend without page reload
   *
   * @param {String} id of transaction to delete
   */
  const handleDelete = async (id) => {
    await deleteExpense(id);
    // to deleted item in frontend without refreshing the page
    setFilteredTransactions((prev) => prev.filter((item) => item._id !== id));
  };

  /**
   * to open the selected transaction in Expense.jsx form with prefill fields
   *
   * @param {Object} item Transaction to update
   */
  const handleUpdate = (item) => {
    setUpdatingExpense(item);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full bg-white border border-[#EAE8E4] rounded-2xl overflow-hidden hidden lg:block">
        {/* for taber headings */}
        <div className="grid grid-cols-[205px_1fr_130px_110px_120px_80px] items-center h-11 px-5 border-b border-[#EAE8E4] uppercase text-gray-400 text-xs">
          <span>Category</span>
          <span>Description</span>
          <span>Date</span>
          <span>Method</span>
          <span>Amount</span>
          <span></span>
        </div>

        {/* for table details */}
        {filteredTransactions.length === 0 ? (
          <EmptyState />
        ) : (
          filteredTransactions.map((item) => {
            const category = getCategory(item);
            const Icon = category?.icon || CircleHelp;

            return (
              <div
                key={item._id}
                className="group grid grid-cols-[205px_1fr_130px_110px_120px_80px] items-center min-h-20 px-5 border-b border-[#EAE8E4] last:border-b-0"
              >
                {/* for category */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${category?.bgColor || "bg-gray-100"}`}
                  >
                    <Icon
                      size={17}
                      className={category?.color || "text-gray-600"}
                    />
                  </div>
                  <span className="font-medium text-sm capitalize">
                    {item.category}
                  </span>
                </div>

                {/* for note */}
                <div>
                  <p className="text-sm font-medium text-[#6B6F76]">
                    {item.note || "No Description"}
                  </p>
                </div>

                {/* for date */}
                <span className="text-xs text-gray-500">
                  {formatDate(item.date)}
                </span>

                {/* for paymenbt Method */}
                <div>
                  <span className="px-3 py-1 rounded-full border border-[#EAE8E4] text-xs text-gray-500 capitalize">
                    {item.paymentMethod}
                  </span>
                </div>

                {/* for amount */}
                <div>
                  <p
                    className={`ml-auto ${item.type === "income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.type === "income" ? "+" : "-"}₹{item.amount}
                  </p>
                </div>

                {/* for edit and delet buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-[#6B6F76] cursor-pointer"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-red-600 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* for mobile view */}
      <div className="lg:hidden flex flex-col gap-3">
        {/* for table details */}
        {filteredTransactions.length === 0 ? (
          <EmptyState />
        ) : (
          filteredTransactions.map((item) => {
            const category = getCategory(item);
            const Icon = category?.icon || CircleHelp;

            return (
              <div
                key={item._id}
                className="bg-white border border-[#EAE8E4] rounded-2xl p-4"
              >

                {/* for top section category, icon and amount */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${category.bgColor || "bg-gray-100"} `}
                    >
                      <Icon
                        size={20}
                        className={category.color || "text-gray-600"}
                      />
                    </div>

                    <div className="font-medium text-sm capitalize">
                      {item.category}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 capitalize">
                      {item.note || "No Description"}
                    </div>
                  </div>

                  <p
                    className={`font-semibold ${item.type === "income" ? "text-green-500" : " text-red-500"}`}
                  >
                    {item.type === "income" ? "+" : "-"}₹{item.amount}
                  </p>
                </div>

                {/* ffor bottom section with date and edit and delete buttons */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#EAE8E4]">
                  <span className="text-xs text-gray-400">
                    {formatDate(item.date)}
                  </span>

                  {/* for edit and delet buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-[#6B6F76] cursor-pointer"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-red-600 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default TransactionTable;
