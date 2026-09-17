import React, { useState } from "react";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import { createExpense } from "../services/ExpenseService";
import { X } from "lucide-react";

/**
 * Transaction Form Modal
 * Handle adding expense and income
 *
 * @param {Object} props
 * @param {boolean} props.open show and hide the modal
 * @param {Function} props.setOpen closes the modal
 * @returns {JSX.Element}
 */
function ExpenseForm({ open, setOpen }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [error, setError] = useState("");

  //   income and expense have different category
  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  /**
   * Validates andd submit the transaction
   *
   * @async
   * @param {React.FormEvent} e Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setError("Enter a valid number.");
      return;
    }
    if (!category) {
      setError("Select a category.");
      return;
    }

    try {
      const data = {
        type,
        amount: Number(amount),
        category,
        date,
        note,
        paymentMethod,
      };
      await createExpense(data);

      setAmount("");
      setCategory("");
      setNote("");
      setPaymentMethod("cash");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className={`fixed z-50 left-1/2 -translate-x-1/2 top-32 w-1/3 bg-white p-8 rounded-3xl transform transition-all duration-300 ease-in-out ${open ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex items-start justify-between space-y-4">
        <span className="font-semibold text-lg">Add Transaction</span>
        <span
          onClick={() => setOpen(false)}
          className="w-7 h-7 border border-[#EAE8E4] bg-white rounded-[10px] hover:border-[#D9D6D0] flex items-center justify-center text-[#8e8e8d] cursor-pointer"
        >
          <X size={16} />
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex rounded-xl bg-[#F1F0ED] p-1">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`w-1/2 rounded-lg py-1.5 text-sm transition-all duration-150 cursor-pointer ${type === "expense" ? "bg-white shadow-sm" : "text-gray-500"}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`w-1/2 rounded-md py-1.5 text-sm transition-all duration-150 cursor-pointer ${type === "income" ? "bg-white shadow-sm" : "text-gray-500"}`}
          >
            Income
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[10px] text-gray-400 uppercase">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₹ 0"
            className="mt-1 w-full border-b border-gray-200 py-2 text-center text-xl font-semibold outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-[10px] text-gray-400 uppercase">
            Category
          </label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setCategory(item.name)}
                  className={`cursor-pointer rounded-lg p-2 text-xs ${category === item.name ? "ring-1 ring-gray-400" : ""} ${item.bgColor}`}
                >
                  <Icon size={16} className={`mx-auto ${item.color}`} />
                  <span className="mt-1 capitalize">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Date and Note */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-gray-400">DATE</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400">Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note..."
              className="mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm outline-none"
            />
          </div>
        </div>

        {/* Payment Options */}
        <div>
          <label className="text-[10px] text-gray-400">PAYMENT METHOD</label>

          <div className="mt-2 flex gap-2">
            {["cash", "upi", "card"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setPaymentMethod(item)}
                className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${paymentMethod === item ? "border-green-600 bg-green-50" : "border-gray-200"}`}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* for Errors popup */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* for buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-2/3 rounded-lg border border-gray-200 bg-white py-2 text-sm text-black cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full rounded-lg bg-green-700 py-2 text-sm text-white cursor-pointer"
          >
            Add {type === "expense" ? "Expense" : "Income"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;
