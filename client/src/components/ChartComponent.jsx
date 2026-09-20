import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../utils/constants";

/**
 * To display the transaction category in donut chart
 *
 * @param {Object} props
 * @param {Array} props.categories  transactions categories
 * @param {number} props.total Total transaction amount
 * @param {string} props.direction the layout directtion
 * @returns {JSX.Element}
 */
function ChartComponent({ heading, categories, total, direction }) {
  return (
    <div className="bg-white border border-[#EAE8E4] rounded-2xl p-4">
      <h2 className="text-lg font-semibold">{heading}</h2>

      <div
        className={`flex items-center gap-6 mt-4 ${direction === 'row' ? "flex-col lg:flex-row" : "flex-col"} `}
      >
        {/* for Dount Chart */}
        <div className="relative w-70 h-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="price"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                stroke="white"
                strokeWidth={2}
              >
                {categories.map((item) => {
                  let color;
                  for (const category of [
                    ...INCOME_CATEGORIES,
                    ...EXPENSE_CATEGORIES,
                  ]) {
                    if (category.name === item.name) {
                      color = category.chartColor;
                    }
                  }

                  return <Cell key={item.name} fill={color || "#6B7280"} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* for the total in the middle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg text-gray-400 uppercase">Total</span>
            <span className="text-xl font-semibold">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* for Category List */}
        <div className="w-full space-y-1">
          {categories.map((item) => {
            const percentage = Math.round((item.price / total) * 100);
            let color;
            for (const category of [
              ...INCOME_CATEGORIES,
              ...EXPENSE_CATEGORIES,
            ]) {
              if (category.name === item.name) {
                color = category.chartColor;
              }
            }

            return (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3 pb-2 border-b border-[#EAE8E4] last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0`}
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-[#27272A] capitalize">
                    {item.name}
                  </span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-sm text-[#27272A]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-right w-10 text-[#27272A]">
                    {percentage}%
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

export default ChartComponent;
