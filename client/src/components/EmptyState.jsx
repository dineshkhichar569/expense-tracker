import { ReceiptText } from "lucide-react";

/**
 * It shows Message when there is no transaction
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-centertext-center py-16">
      <ReceiptText size={110} className="text-gray-400 mb-8" />
      <h2 className="text-4xl font-semibold text text-gray-700">
        No transactions yet
      </h2>
      <p className="text-2xl text-gray-500 mt-5">
        Add your first expense to see your spending breakdown
      </p>
    </div>
  );
}

export default EmptyState;
