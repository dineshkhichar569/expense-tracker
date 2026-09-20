import { ChartNoAxesColumn, House, List, Plus } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function BottomBar({ setOpen }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-[#EAE8E4] rounded-t-3xl">
      <div className="h-full flex items-center justify-around">
        <Link
          to="/"
          className="flex items-center justify-center text-[#2E6F4E]"
        >
          <House size={24}/>
        </Link>

        <Link
          to="/transactions"
          className="flex items-center justify-center text-gray-400"
        >
          <List size={24} />
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="w-13 h-13 rounded-full bg-[#2E6F4E] text-white flex items-center justify-center"
        >
          <Plus size={24} />
        </button>

        <Link
          to="/analytics"
          className="flex items-center justify-center text-gray-400"
        >
          <ChartNoAxesColumn size={24}/>
        </Link>
      </div>
    </div>
  );
}

export default BottomBar;
