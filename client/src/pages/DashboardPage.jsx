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

      {/* ffor net balance and monthly income and expense */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 mt-6">
        <div className="relative flex flex-col w-full gap-2.5 h-52 bg-[#17181A] rounded-3xl p-7 overflow-hidden text-white">

          {/* // for little bit of decoration  */}
          <div className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-[#212327]" />
          <div className="absolute -bottom-8 right-24 w-36 h-36 rounded-full bg-[#1E1F23]" />
          <div className="absolute z-10 top-6 right-8 w-20 h-20 rounded-full border border-white/5" />
          <div className="absolute -top-6 right-32 w-28 h-28 rounded-full border border-white/3" />
          <div className="absolute bottom-8 left-[45%] w-1 h-1 rounded-full bg-white/20" />
          <div className="absolute top-12 right-[40%] w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="absolute bottom-16 left-[30%] w-0.5 h-0.5 rounded-full bg-white/30" />

          

          <span className="relative z-10 text-xs tracking-[0.06em] text-white/50">
            NET BALANCE
          </span>
          <span className="relative z-10 font-semibold text-5xl">
            ₹{netSaving.toLocaleString("en-IN")}
          </span>
          <span className="relative z-10 font-semibold text-[11px] text-white/25 mt-auto uppercase">
            {new Date().toLocaleString("en-IN", {
              month: "long",
              year: "numeric",
            })}
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
        {/* //for the recennt transaction list with a limit */}
        <RecentTransactionList limit={6} transactions={transactions} />

        {/* to display chart on dashboard */}
        <ChartComponent
          heading="Breakdown by Category"
          categories={[...incomeCategories, ...expenseCategories]}
          total={netSaving}
          direction="column"
        />
      </div>
    </div>
  );
}

export default DashboardPage;
