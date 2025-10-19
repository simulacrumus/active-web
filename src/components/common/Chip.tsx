import React, { useState } from "react";
import { X } from "lucide-react";

interface ChipProps {
  title: string;
  onRemove: () => void;
}

export const Chip: React.FC<ChipProps> = ({ title, onRemove }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-900 rounded-full transition-all duration-150">
      <span className="text-sm font-medium text-gray-200">{title}</span>
      <button
        onClick={handleRemove}
        className={
          "flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-sky-800 rounded-full p-0.5 transition-all duration-150"
        }
        aria-label={`Remove ${title}`}
      >
        <X size={14} />
      </button>
    </div>
  );
};
