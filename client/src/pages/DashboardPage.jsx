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
      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-6">
        <div className="flex flex-col w-full gap-2.5 h-52 bg-[#17181A] rounded-3xl p-7 overflow-hidden text-white">
          <span className="text-xs tracking-[0.06em] text-white/50">
            NET BALANCE
          </span>
          <span className="font-semibold text-4xl">
            ₹{netSaving.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex flex-row lg:flex-col w-full lg:w-1/2 gap-3 lg:gap-4">
          <div className="lg:h-24 h-18 w-full bg-white lg:px-5 px-3 lg:rounded-[20px] rounded-[15px] flex items-center gap-3.5">
            <div className="w-10 lg:w-12 h-10 lg:h-12 lg:rounded-xl rounded-lg bg-[#ccfbdc] text-[#16A34A] flex items-center justify-center shrink-0">
              <TrendingUp />
            </div>
            <div>
              <p className="text-[12px] text-gray-400 lg:tracking-[0.06] uppercase">
                Month Income
              </p>
              <p className="text-sm lg:text-[28px] font-semibold text-[#16A34A] leading-none mt-1 tracking-[0.06] uppercase">
                {incomeMonth.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="lg:h-24 h-18 w-full bg-white lg:px-5 px-3 lg:rounded-[20px] rounded-[15px] flex items-center gap-3.5">
            <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-lg lg:rounded-xl bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
              <TrendingDown />
            </div>
            <div>
              <p className="text-[12px] text-gray-400 lg:tracking-[0.06em] uppercase">
                Month Expense
              </p>
              <p className="text-sm lg:text-[28px] font-semibold text-[#E11D48] leading-none mt-1 tracking-[0.06em] uppercase">
                ₹{expenseMonth.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-6">
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
