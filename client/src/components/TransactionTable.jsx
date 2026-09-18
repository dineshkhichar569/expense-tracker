import React from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import { Pencil, Trash2 } from "lucide-react";

/**
 * It shows all transactions in table with edit and delet options
 *
 * @param {Object} props
 * @param {Array} props.transactions :n transactions to display
 * @param {Function} props.onEdit : will be called when editing a transaction
 * @param {Function} props.onDelete : will be called when deleting a transaction
 * @returns {JSX.Element}
 */
function TransactionTable({ transactions }) {
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

  const formateDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full bg-white border border-[#EAE8E4] rounded-2xl overflow-hidden">
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
      {transactions.map((item) => {
        const category = getCategory(item);
        const Icon = category?.icon;

        return (
          <div
            key={item.id}
            className="group grid grid-cols-[205px_1fr_130px_110px_120px_80px] items-center min-h-20 px-5 border-b border-[#EAE8E4] last:border-b-0"
          >
            {/* for category */}
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${category?.bgColor}`}
              >
                <Icon size={17} className={category?.color} />
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
              {formateDate(item.date)}
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
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-[#6B6F76] cursor-pointer">
                <Pencil size={14} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-[#EAE8E4] bg-white rounded-[10px] text-red-600 cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionTable;
