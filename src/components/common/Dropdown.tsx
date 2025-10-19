import { useState, useRef, useEffect, JSX } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";

export interface DropdownProps<T> {
  availableItems: T[];
  disabledItems?: T[];
  selected?: T | null;
  onSelectionChange: (item: T | null) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  getKey: (item: T) => string | number;
  getLabel: (item: T) => string;
}

export function Dropdown<T>({
  availableItems = [],
  disabledItems = [],
  selected = null,
  onSelectionChange,
  placeholder = "Select an option",
  inputPlaceholder = "Search..",
  getKey,
  getLabel,
}: DropdownProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus the search input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleItemClick = (item: T): void => {
    const newSelection =
      selected && getKey(selected) === getKey(item) ? null : item;
    onSelectionChange(newSelection);
    setIsOpen(false);
    setSearchQuery("");
  };

  const getButtonText = (): string => {
    if (!selected) return placeholder;
    const found =
      availableItems.find((item) => getKey(item) === getKey(selected)) ??
      disabledItems.find((item) => getKey(item) === getKey(selected));

    return found ? getLabel(found) : placeholder;
  };

  const filterItems = (items: T[]): T[] =>
    items.filter((item) =>
      getLabel(item).toLowerCase().includes(searchQuery.toLowerCase())
    );

  const filteredEnabled = filterItems(availableItems);
  const filteredDisabled = filterItems(disabledItems || []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* BUTTON / INPUT */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`w-full px-4 py-3 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-between transition-all
            ${selected ? "border-sky-800" : "border-gray-200"}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={selected ? "text-sky-800" : "text-gray-500"}>
            {getButtonText()}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
      ) : (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={inputPlaceholder}
            className="w-full pl-10 pr-10 py-3 bg-white border border-sky-800 rounded-lg shadow-sm focus:outline-none transition-all"
            aria-label="Search dropdown"
          />
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-180" />
        </div>
      )}

      {/* MENU */}
      {isOpen && (
        <ul
          className="absolute w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-auto"
          style={{ maxHeight: "20rem" }}
          role="listbox"
        >
          {[...filteredEnabled, ...filteredDisabled].length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">
              No results found
            </li>
          )}

          {[...filteredEnabled, ...filteredDisabled].map((item) => {
            const key = getKey(item);
            const label = getLabel(item);
            const isSelected = selected && getKey(selected) === key;
            const isDisabled = filteredDisabled.some((d) => getKey(d) === key);

            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setHoveredKey(key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between transition-colors ${
                    isDisabled ? "text-gray-700" : "text-sky-800"
                  } ${isSelected ? "bg-sky-50" : ""}`}
                  role="option"
                  aria-selected={isSelected || undefined}
                >
                  <span>{label}</span>
                  {isSelected &&
                    (hoveredKey === key ? (
                      <X className="w-5 h-5 text-sky-800" />
                    ) : (
                      <Check className="w-5 h-5 text-sky-800" />
                    ))}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
