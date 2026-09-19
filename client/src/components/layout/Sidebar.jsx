import {
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  List,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import ExpenseForm from "../ExpenseForm";
import { NavLink } from "react-router-dom";

// keeping the array outside the component so it does not create on every render
const sidebarItems = [
  { icon: <LayoutDashboard />, value: "Dashboard", path: "" },
  { icon: <List />, value: "Trasactions", path: "transactions" },
  {
    icon: <ChartNoAxesColumnIncreasing />,
    value: "Analytics",
    path: "analytics",
  },
];

/**
 * Sidebar Navigation for the app
 *
 * @returns {JSX.Element} Sidebar components
 */
function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-60 px-4 py-6 bg-white h-screen flex flex-col">
      <div className="flex items-center gap-2.5 h-8 px-2">
        <div className="w-9 h-9 rounded-xl bg-[#2E6F4E] flex items-center justify-center text-white">
          <Wallet className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg">Expense Tracker</span>
      </div>
      <div className="flex flex-col gap-1 justify-between h-full mt-8">
        <div>
          {sidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 h-11 px-3 rounded-xl font-medium text-lg cursor-pointer transition-all duration-150 ${isActive ? "hover:bg-[#EAF2ED] hover:text-[#2E6F4E] bg-[#EAF2ED] text-[#2E6F4E]" : "hover:bg-[#f7fdf9] hover:text-[#478465] text-[#6B6F76]"}`
              }
            >
              <div>{item.icon}</div>
              <span>{item.value}</span>
            </NavLink>
          ))}
        </div>
        <div
          onClick={() => setOpen(!open)}
          className="flex gap-2 items-center justify-center w-full h-12 bg-[#2E6F4E] text-white font-medium rounded-xl hover:bg-[#245A3F] cursor-pointer transition-all duration-150"
        >
          <div>+</div>
          <span>Add Transactions</span>
        </div>
        <ExpenseForm open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default Sidebar;
