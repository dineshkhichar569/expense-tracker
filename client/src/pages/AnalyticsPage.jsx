import { TrendingDown, TrendingUp, Wallet2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getExpense } from "../services/ExpenseService";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";

function AnalyticsPage() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("expense");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getExpense();
      setTransactions(res.data);
    };

    fetchData();
  }, []);

  let totalIncome = 0;
  let totalExpense = 0;
  let expenseCategories = [];
  let incomeCategories = [];

  for (const item of transactions) {
    if (item.type === "income") {
      totalIncome += item.amount;

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

  const topCategories =
    type === "income"
      ? incomeCategories.sort((a, b) => b.price - a.price)
      : expenseCategories.sort((a, b) => b.price - a.price);

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div className="h-24 w-full bg-white px-5 rounded-[20px] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#ccfbdc] text-[#16A34A] flex items-center justify-center shrink-0">
            <TrendingUp />
          </div>
          <div>
            <p className="text-[12px] text-gray-400 tracking-[0.06] uppercase">
              Total Income
            </p>
            <p className="text-[28px] font-semibold text-[#16A34A] leading-none mt-1 tracking-[0.06] uppercase">
              ₹{totalIncome.toLocaleString("en-In")}
            </p>
          </div>
          <p className="ml-auto text-sm text-gray-500">+45%</p>
        </div>
        <div className="h-24 w-full bg-white px-5 rounded-[20px] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
            <TrendingDown />
          </div>
          <div>
            <p className="text-[12px] text-gray-400 tracking-[0.06em] uppercase">
              Total Expense
            </p>
            <p className="text-[28px] font-semibold text-[#E11D48] leading-none mt-1 tracking-[0.06em] uppercase">
              ₹{totalExpense.toLocaleString("en-In")}
            </p>
          </div>
          <p className="ml-auto text-sm text-gray-500">-3.1%</p>
        </div>
        <div className="h-24 w-full bg-black px-5 rounded-[20px] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#c6c7c7] text-black flex items-center justify-center shrink-0">
            <Wallet2 />
          </div>
          <div>
            <p className="text-[12px] text-gray-400 tracking-[0.06] uppercase">
              Net Saving
            </p>
            <p className="text-[28px] font-semibold text-white leading-none mt-1 tracking-[0.06] uppercase">
              ₹{netSaving.toLocaleString("en-In")}
            </p>
          </div>
          <p className="ml-auto text-sm text-gray-500">+45%</p>
        </div>
      </div>

      {/* for charts and graphs */}
      <div></div>

      <div className="bg-white border border-[#EAE8E4] rounded-3xl px-8 py-4 flex flex-col gap-3">
        <h2 className="font-semibold text-xl">Top Categories</h2>

        {/* expense and income switch buttons */}
        <div className="flex rounded-xl bg-[#F1F0ED] p-1 w-52">
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

        <div className="flex flex-col gap-2">
          {topCategories.map((item) => {
            const categories =
              type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
            const category = categories.find((cat) => cat.name === item.name);
            const Icon = category?.icon;

            return (
              <div
                key={item.name}
                className="flex items-center justify-between gap-5 border-b pb-2 border-[#EAE8E4] last:border-b-0"
              >
                <div className="flex items-center gap-5 w-1/6">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.bgColor}`}
                  >
                    <Icon size={16} className={category.color} />
                  </div>
                  <span className="capitalize text-sm font-medium">
                    {item.name}
                  </span>
                </div>

                {/* for the progess bar */}
                <div className="w-full flex-1 h-2.5 bg-[#F0EFED] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${category.barColor}`}
                    style={{
                      width: `${Math.round((item.price / (type === "income" ? totalIncome : totalExpense)) * 100)}%`,
                    }}
                  />
                </div>

                {/* for amount and percentage */}
                <div className="w-1/10 flex items-center gap-5 text-sm font-medium">
                  <span className="text-right">
                    {item.price.toLocaleString("en-In")}
                  </span>
                  <span className="text-right text-[#6B6F76]">
                    {Math.round(
                      (item.price /
                        (type === "income" ? totalIncome : totalExpense)) *
                        100,
                    )}{" "}
                    %
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
