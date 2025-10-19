import { useState, useRef, useEffect, JSX } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  debounceMs?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search..",
  onClear,
  debounceMs = 500,
}: SearchBarProps): JSX.Element {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);
  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounced onChange
  useEffect(() => {
    // Skip the effect on initial mount to prevent unnecessary onChange calls
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceMs > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange(localValue);
      }, debounceMs);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    } else {
      onChange(localValue);
    }
  }, [localValue, debounceMs, onChange]);

  const handleClear = (): void => {
    setLocalValue("");
    onChange("");
    if (onClear) {
      onClear();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLocalValue(e.target.value);
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-3 bg-white border rounded-lg shadow-sm focus:outline-none focus:border-sky-800 transition-all ${
          localValue ? "border-sky-800" : "border-gray-200"
        }`}
        aria-label="Search"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
