import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react";

interface MainLayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function MainLayout({ header, sidebar, children }: MainLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full flex flex-col items-center">
        {/* Desktop Header - Spans both columns */}
        <header className="w-full hidden md:flex justify-center border-b border-gray-200 md:col-span-2">
          {header}
        </header>
        <div className="w-full max-w-6xl md:grid md:grid-rows-[auto_1fr] md:grid-cols-[1fr_2fr] md:gap-2 gap-0">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block mb-10">
            <div className="sticky top-6">{sidebar}</div>
          </aside>

          {/* Mobile Menu Overlay */}
          <div className="md:hidden">
            {mobileSidebarOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                onClick={() => setMobileSidebarOpen(false)}
              />
            )}
            <div
              className={`fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
                mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-white p-6">{sidebar}</div>
            </div>
          </div>

          {/* Main Content */}
          <main className="w-full md:col-start-2">
            {/* Mobile Header */}
            <header className="md:hidden border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 bg-white">
              <div className="flex flex-col justify-end flex-1">{header}</div>
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="p-2 pr-4 hover:bg-gray-100 rounded-lg ml-4"
              >
                <Menu className="w-5 h-5" />
              </button>
            </header>

            {/* Main Content Area */}
            <div className="w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
