import { TrendingDown, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import RecentTransactionList from "../components/RecentTransactionList";
import ChartComponent from "../components/ChartComponent";
import { getTransactionSummary } from "../utils/transactionUtils";
import { useOutletContext } from "react-router-dom";

/**
 * Main Dashboard Page.
 * Display the Net balance, Monthly Income, expense and recent transactions
 *
 * @returns {JSX.Element} Dashboard view
 */
function DashboardPage() {
  const currentDate = new Date().toISOString().slice(0, 7);
  const [month, setMonth] = useState(currentDate);

  const { transactions } = useOutletContext();

  const {
    expenseMonth,
    incomeMonth,
    netSaving,
    incomeCategories,
    expenseCategories,
  } = getTransactionSummary({
    transactions,
    month,
  });

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        <div className="flex items-center gap-2 h-10 px-3.5 rounded-lg bg-[#EFEDE9]">
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="outline-0"
          />
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5 mt-6">
        <div className="flex flex-col gap-2.5 h-52 bg-[#17181A] rounded-3xl p-7 overflow-hidden text-white">
          <span className="text-xs tracking-[0.06em] text-white/50">
            NET BALANCE
          </span>
          <span className="font-semibold text-4xl">
            ₹{netSaving.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="h-24 bg-white px-5 rounded-[20px] flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#ccfbdc] text-[#16A34A] flex items-center justify-center shrink-0">
              <TrendingUp />
            </div>
            <div>
              <p className="text-[12px] text-gray-400 tracking-[0.06] uppercase">
                Income This Month
              </p>
              <p className="text-[28px] font-semibold text-[#16A34A] leading-none mt-1 tracking-[0.06] uppercase">
                {incomeMonth}
              </p>
            </div>
          </div>
          <div className="h-24 bg-white px-5 rounded-[20px] flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
              <TrendingDown />
            </div>
            <div>
              <p className="text-[12px] text-gray-400 tracking-[0.06em] uppercase">
                Expense This Month
              </p>
              <p className="text-[28px] font-semibold text-[#E11D48] leading-none mt-1 tracking-[0.06em] uppercase">
                ₹{expenseMonth}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-6">
        <RecentTransactionList limit={6} transactions={transactions} />

        <ChartComponent
          categories={[...incomeCategories, ...expenseCategories]}
          total={netSaving}
          direction="column"
        />
      </div>
    </div>
  );
}

export default DashboardPage;
