import React from "react";
import {
  ChartNoAxesColumnIncreasing,
  LayoutDashboard,
  List,
  Tag,
  Wallet,
} from "lucide-react";

function Sidebar() {
  const sidebarItems = [
    { icon: <LayoutDashboard />, value: "Dashboard" },
    { icon: <List />, value: "Trasactions" },
    { icon: <ChartNoAxesColumnIncreasing />, value: "Analytics" },
    { icon: <Tag />, value: "Categories" },
  ];
  return (
    <div className="w-60 px-4 py-6 bg-white h-screen flex flex-col border-r">
      <div className="flex items-center gap-2.5 h-8 px-2">
        <div className="w-9 h-9 rounded-xl bg-[#2E6F4E] flex items-center justify-center text-white">
          <Wallet className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg">Expense Tracker</span>
      </div>
      <div className="flex flex-col gap-1 justify-between h-full mt-8">
        <div>
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 h-11 px-3 rounded-xl hover:bg-[#EAF2ED] hover:text-[#2E6F4E] font-medium text-lg cursor-pointer transition-all duration-150 text-[#6B6F76]"
            >
              <div>{item.icon}</div>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center justify-center w-full h-12 bg-[#2E6F4E] text-white font-medium rounded-xl hover:bg-[#245A3F] cursor-pointer transition-all duration-150">
            <div>
                +
            </div>
            <span>Add Transactions</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
