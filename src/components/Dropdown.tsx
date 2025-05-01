import { useState, useRef, useEffect, useCallback } from "react";

import DropdownIcon from "@/assets/icon/dropdown-down.svg?react";
import DropUpIcon from "@/assets/icon/dropdown-up.svg?react";

interface DropdownProps {
  placeholder?: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function Dropdown({
  placeholder = "선택",
  options,
  selected,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      e.target instanceof Node &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-[21.875rem] md:w-[20.625rem] lg:w-[19.25rem]
             h-[3.625rem] border border-gray-30 rounded-[0.375rem]
             px-[1.25rem] py-[1rem] flex justify-between items-center"
      >
        <span className={selected ? "text-black" : "text-gray-40"}>
          {selected || placeholder}
        </span>

        <span className="ml-2">
          {isOpen ? (
            <DropUpIcon className="w-4 h-4" />
          ) : (
            <DropdownIcon className="w-4 h-4" />
          )}
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute left-0 top-full mt-1 z-10
             w-[21.875rem] md:w-[20.625rem] lg:w-[19.25rem]
             max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-center hover:bg-gray-100 cursor-pointer text-sm font-normal border-b border-gray-20"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
