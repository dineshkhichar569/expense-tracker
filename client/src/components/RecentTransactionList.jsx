import { EXPENSE_CATEGORIES, formatDate, INCOME_CATEGORIES } from "../utils/constants";
import { CircleHelp } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

/**\
 * To show the recent transactions on dashborad
 *
 * @param {Object} props
 * @param {Array} props.transactions all transactions
 * @param {Array} props.limit only a specific number of transactions
 * @returns {JSX.Element}
 */
function RecentTransactionList({ transactions, limit }) {
  // to showw only the specific number of transactions only
  const transaction = limit ? transactions.slice(0, limit) : transactions;
  return (
    <>
      <div className="w-full bg-white rounded-2xl px-5">
        <div className="flex items-start justify-between py-4">
          <h2 className="font-semibold text-lg">Recent Transactions</h2>
          <Link to="/transactions" className="text-green-700 text-sm">
            See all
          </Link>
        </div>
        {transaction.length === 0 ? (
          <EmptyState />
        ) : (
          transaction.map((item) => {
            // it is for to get the category based on transaction
            const categories =
              item.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

            const category = categories.find(
              (cat) => cat.name === item.category,
            );

            // it will use the default icon is the icon does not found
            const Icon = category?.icon || CircleHelp;

            return (
              <div key={item.id}>
                <div className="flex items-center py-3 border-t border-gray-200">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${category?.bgColor} ${category?.color}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{item.note}</p>
                    <p className="text-sm text-gray-500">{formatDate(item.date)}</p>
                  </div>
                  <p
                    className={`ml-auto ${item.type === "income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.type === "income" ? "+" : "-"}₹ {item.amount}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default RecentTransactionList;
