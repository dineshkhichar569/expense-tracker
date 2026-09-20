import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

/**
 * It is the dropdown for selecting Category
 *
 * @param {Object} props
 * @param {Array} props.options - catrgories array
 * @returns {JSX.Element}
 */
function SelectDropdown({ options, onCategoryChange }) {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("all category");

  /**
   * for select category and close the dropdown
   * @param {string} Select category
   */
  const handleSelect = (item) => {
    setSelect(item);
    setOpen(false);

    // so all category sends a empty string otherwise nothing will dispaly
    if (item === "all category") {
      onCategoryChange("");
    } else {
      onCategoryChange(item);
    }
  };

  return (
    <div className="relative min-w-40">
      <div
        className="h-10 px-3 flex items-center justify-between bg-white border border-[#EAE8E4] rounded-xl text-sm capitalize cursor-pointer hover:bg-[#e0ddd6] transition-all duration-150"
        onClick={() => setOpen(!open)}
      >
        <span>{select}</span>
        <span
          className={`text-xs transition-all duration-150 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={16} />
        </span>
      </div>

      {/* for dropdown options */}
      <div
        className={`absolute z-50 top-12 left-0 w-full bg-white border border-[#EAE8E4] rounded-xl shadow-lg p-1 flex flex-col transition-all duration-150 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      >
        {options.map((option) => (
          <span
            key={option.name}
            onClick={() => handleSelect(option.name)}
            className="cursor-pointer capitalize px-3 py-2 rounded-lg text-sm text-[#6B6F76] hover:bg-[#F7F6F3] hover:text-[#2E6F4E] transition-colors duration-100"
          >
            {option.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SelectDropdown;
