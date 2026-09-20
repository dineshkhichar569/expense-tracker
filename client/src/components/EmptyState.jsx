import { ReceiptText } from "lucide-react";

/**
 * It shows Message when there is no transaction
 */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <ReceiptText size={80} className="text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text text-gray-700">
        No transactions yet
      </h2>
      <p className="text-md text-gray-500 mt-2">
        Add your first expense to see your spending breakdown
      </p>
    </div>
  );
}

export default EmptyState;
