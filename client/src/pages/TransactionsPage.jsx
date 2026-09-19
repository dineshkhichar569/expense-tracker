import { useState } from "react";
import FilterBar from "../components/FilterBar";
import TransactionTable from "../components/TransactionTable";
import { useOutletContext } from "react-router-dom";

/**
 * to display the transaction page
 * it consist filter and list of transactions
 *
 * @returns {JSX.Element} the transaction page
 */
function TransactionsPage() {

  // it gets the transaction data and form states from MainLayout
  const {
    transactions,
    setOpen,
    setUpdatingExpense,
  } = useOutletContext();

  const [filteredTransactions, setFilteredTransactions] = useState([]);

  let totalRecords = transactions.length;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <span className="flex items-baseline gap-2.5">
          <h1 className="font-semibold text-2xl">Transactions</h1>
          <p className="text-[#6B6F76] text-xs">{totalRecords} records</p>
        </span>
        <div
          onClick={() => {
            setOpen(true);
            setUpdatingExpense(null);
          }}
          className="flex gap-2 items-center justify-center w-auto px-4 h-12 bg-[#2E6F4E] text-white font-medium rounded-xl hover:bg-[#245A3F] cursor-pointer transition-all duration-150"
        >
          <div>+</div>
          <span>Add Transactions</span>
        </div>
      </div>

      {/* // to filter the transaction on the basis of selected options */}
      <div className="relative z-20">
        <FilterBar setFilteredTransactions={setFilteredTransactions} />
      </div>

      {/* // to display all transaction in the form of table from TransactionTable JSX Elemeent */}
      <div>
        <TransactionTable
          filteredTransactions={filteredTransactions}
          setFilteredTransactions={setFilteredTransactions}
          setOpen={setOpen}
          setUpdatingExpense={setUpdatingExpense}
        />
      </div>
    </div>
  );
}

export default TransactionsPage;
