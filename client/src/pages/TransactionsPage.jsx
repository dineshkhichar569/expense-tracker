import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import FilterBar from "../components/FilterBar";
import TransactionTable from "../components/TransactionTable";


/**
 * to display the transaction page
 * it consist filter and list of transactions
 * 
 * @returns {JSX.Element} the transaction page
 */
function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [updatingExpense, setUpdatingExpense] = useState(null);

  let totalRecords = transactions.length;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="flex items-baseline gap-2.5">
          <h1 className="font-semibold text-2xl">Transactions</h1>
          <p className="text-[#6B6F76] text-xs">{totalRecords} records</p>
        </span>
        <div
          onClick={() => setOpen(!open)}
          className="flex gap-2 items-center justify-center w-auto px-4 h-12 bg-[#2E6F4E] text-white font-medium rounded-xl hover:bg-[#245A3F] cursor-pointer transition-all duration-150"
        >
          <div>+</div>
          <span>Add Transactions</span>
        </div>

        {/* // to open the form to add orr update the transaction. */}
        <ExpenseForm
          open={open}
          setOpen={setOpen}
          setTransactions={setTransactions}
          updatingExpense={updatingExpense}
          setUpdatingExpense={setUpdatingExpense}
        />
      </div>

      {/* // to filter the transaction on the basis of selected options */}
      <div className="relative z-20">
        <FilterBar setTransactions={setTransactions} />
      </div>

      {/* // to display all transaction in the form of table from TransactionTable JSX Elemeent */}
      <div>
        <TransactionTable
          transactions={transactions}
          setTransactions={setTransactions}
          setOpen={setOpen}
          setUpdatingExpense={setUpdatingExpense}
        />
      </div>
    </div>
  );
}

export default TransactionsPage;
