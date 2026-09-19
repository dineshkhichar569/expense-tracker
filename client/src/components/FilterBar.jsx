import React, { useEffect, useState } from "react";
import { getExpense } from "../services/ExpenseService";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import SelectDropdown from "./SelectDropdown";

/**
 * It is for Filter the transactions by Type, category and date
 *
 * @param {Object} props
 * @param {Function} props.setTransactions : to update the transaction list
 * @returns {JSX.Element}
 */
function FilterBar({ setTransactions }) {
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    // to get the transactions based on the filter
    const fetchTransactions = async () => {
      let filters = {};

      if (type !== "all") {
        filters.type = type;
      }
      if (category) {
        filters.category = category;
      }
      if (from) {
        filters.from = from;
      }
      if (to) {
        filters.to = to;
      }

      const res = await getExpense(filters);

      setTransactions(res.data);
    };

    fetchTransactions();
  }, [type, category, from, to]);

  // for to add both arrays without any duplicate
  const allCategory = [];
  for (const item of [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES]) {
    if (!allCategory.some((category) => category.name === item.name)) {
      allCategory.push(item);
    }
  }

  const filterCategory =
    type === "all"
      ? allCategory
      : type === "income"
        ? INCOME_CATEGORIES
        : EXPENSE_CATEGORIES;

  // to clear all filters
  const clearFilters = () => {
    setType("all");
    setFrom("");
    setTo("");
    setCategory("");
  };

  return (
    <div className="h-18 bg-white border border-[#EAE8E4] px-5 rounded-[20px] flex items-center justify-between gap-5 overflow-visible">
      {/* for all, expense, incomee filter */}
      <div className="flex h-8.5 p-0.75 bg-[#F1F0ED] rounded-[10px] ">
        {["all", "expense", "income"].map((item) => (
          <button
            key={item}
            onClick={() => setType(item)}
            className={`capitalize cursor-pointer flex items-center px-3.5 rounded-lg font-medium text-sm transition-all duration-100 ${item === type ? "bg-white" : "bg-[#F1F0ED]"}`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* for category selection filder */}
      <div>
        <SelectDropdown
          options={[{ name: "all category" }, ...filterCategory]}
          onCategoryChange={setCategory}
        />
      </div>

      {/* for from and to filter dates */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center gap-2 shrink-0">
          <label className="text-[11px] font-medium text-gray-400 uppercase">
            From
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="relative z-30 border border-[#EAE8E4] px-3 h-9.5 rounded-xl text-sm outline-none"
          />
        </div>
        <div className="flex items-center justify-center gap-2 shrink-0">
          <label className="text-[11px] font-medium text-gray-400 uppercase">
            To
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="relative z-30 border border-[#EAE8E4] px-3 h-9.5 rounded-xl text-sm outline-none"
          />
        </div>
      </div>

      {/* for clear all filters */}
      <button
        className="text-sm w-auto h-auto font-medium text-[#2E6F4E] cursor-pointer"
        onClick={clearFilters}
      >
        Clear Filter
      </button>
    </div>
  );
}

export default FilterBar;
