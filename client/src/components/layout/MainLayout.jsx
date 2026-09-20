import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import ExpenseForm from "../ExpenseForm";
import { getExpense } from "../../services/ExpenseService";
import BottomBar from "./BottomBar";

/**
 * Main Layout with sidebar and page content
 *
 * @returns {JSX.Element} Main Layout
 */
function MainLayout() {
  const [transactions, setTransactions] = useState([]);
  const [open, setOpen] = useState(false);
  const [updatingExpense, setUpdatingExpense] = useState(null);

  // It fetch all transactions when the application starts
  useEffect(() => {
    // to get the transactions based on the filter
    const fetchTransactions = async () => {
      try {
        const res = await getExpense();
        setTransactions(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="overflow-x-hidden flex min-h-screen">
      <div className="hidden lg:block">
        <Sidebar setOpen={setOpen} />
      </div>

      <main className="flex-1 p-3 lg:p-10 h-screen overflow-y-auto bg-stone-100 mb-16 lg:mb-0 lg:pt-6 pt-8">
        {/* // outlet renders the current page
        // and the transaction data and statesd are passed so all its children can get it. 
        */}
        <Outlet
          context={{
            transactions,
            setTransactions,
            setOpen,
            updatingExpense,
            setUpdatingExpense,
          }}
        />
      </main>

      <div className="lg:hidden">
        <BottomBar setOpen={setOpen} />
      </div>

      {/* // it opeens the add and update transactions form  */}
      <ExpenseForm
        open={open}
        setOpen={setOpen}
        setTransactions={setTransactions}
        updatingExpense={updatingExpense}
        setUpdatingExpense={setUpdatingExpense}
      />
    </div>
  );
}

export default MainLayout;
