import React, { useEffect, useState } from "react";
import { getExpense } from "../services/ExpenseService";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";
import SelectDropdown from "./SelectDropdown";

/**
 * It is for Filter the transactions by Type, category and date
 *
 * @param {Object} props
 * @param {Function} props.setTransactions  updates the transaction list
 * @returns {JSX.Element} the filter bar
 */
function FilterBar({ setFilteredTransactions }) {
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

      setFilteredTransactions(res.data);
    };

    fetchTransactions();
  }, [type, category, from, to, setFilteredTransactions]);

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
    <div className="bg-white border border-[#EAE8E4] px-4 lg:px-5 py-3 rounded-[20px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-5 overflow-visible">
      {/* for all, expense, incomee filter */}
      <div className="flex h-8.5 p-0.75 bg-[#F1F0ED] rounded-[10px] w-full lg:w-auto">
        {["all", "expense", "income"].map((item) => (
          <button
            key={item}
            onClick={() => setType(item)}
            className={`capitalize cursor-pointer flex-1 lg:flex-none items-center px-3.5 rounded-lg font-medium text-sm transition-all duration-100 ${item === type ? "bg-white" : "bg-[#F1F0ED]"}`}
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
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex items-center justify-between lg:justify-center gap-2 shrink-0">
          <label className="text-[11px] w-10 lg:w-auto font-medium text-gray-400 uppercase">
            From
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="relative z-30 border border-[#EAE8E4] px-3 h-9.5 rounded-xl text-sm outline-none w-full lg:w-auto"
          />
        </div>
        <div className="flex items-center justify-between lg:justify-center gap-2 shrink-0">
          <label className="text-[11px] w-10 lg:w-auto font-medium text-gray-400 uppercase">
            To
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="relative z-30 border border-[#EAE8E4] px-3 h-9.5 rounded-xl text-sm outline-none w-full lg:w-auto"
          />
        </div>
      </div>

      {/* for clear all filters */}
      <button
        className="text-sm w-auto h-auto font-medium text-[#2E6F4E] cursor-pointer self-end lg:self-auto"
        onClick={clearFilters}
      >
        Clear Filter
      </button>
    </div>
  );
}

export default FilterBar;
