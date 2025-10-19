import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import React from "react";

interface DropdownItem {
  id: number | null;
  title: string;
}

interface CheckableDropdownProps {
  items: DropdownItem[];
  selectedId?: number | null;
  onSelectionChange: (id: number | null) => void;
  placeholder?: string;
}

export function CheckableDropdown({
  items,
  selectedId = null,
  onSelectionChange,
  placeholder = "Select an option",
}: CheckableDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (itemId: number | null) => {
    const newSelection = selectedId === itemId ? null : itemId;
    onSelectionChange(newSelection);
    setIsOpen(false);
  };

  const getButtonText = (): string => {
    if (selectedId === null) {
      return placeholder;
    }
    const selected = items.find((item) => item.id === selectedId);
    return selected ? selected.title : placeholder;
  };

  return (
    <div className="w-80" ref={dropdownRef}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all flex items-center justify-between"
        >
          <span className="text-gray-700">{getButtonText()}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
            <ul className="py-1">
              {items.map((item) => (
                <li key={item.id === null ? "none" : item.id}>
                  <button
                    onClick={() => handleItemClick(item.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                  >
                    <span className="text-gray-700">{item.title}</span>
                    {selectedId === item.id && (
                      <Check className="w-5 h-5 text-sky-600" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
