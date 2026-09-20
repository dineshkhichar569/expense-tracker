import { ChartNoAxesColumn, House, List, Plus } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

function BottomBar({ setOpen }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-[#EAE8E4] rounded-t-3xl">
      <div className="h-full flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center justify-center ${isActive ? "text-green-600" : "text-gray-400"} `
          }
        >
          <House size={24} />
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `flex items-center justify-center ${isActive ? "text-green-600" : "text-gray-400"} `
          }
        >
          <List size={24} />
        </NavLink>

        <button
          onClick={() => setOpen(true)}
          className="w-13 h-13 rounded-full bg-[#2E6F4E] text-white flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center justify-center ${isActive ? "text-green-600" : "text-gray-400"} `
          }
        >
          <ChartNoAxesColumn size={24} />
        </NavLink>
      </div>
    </div>
  );
}

export default BottomBar;
