import { useState, useEffect, ReactNode } from "react";

// Simple Modal Component
interface ModalProps {
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-auto max-w-7xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
