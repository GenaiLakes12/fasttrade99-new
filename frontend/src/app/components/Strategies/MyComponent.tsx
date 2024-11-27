// MyComponent.tsx
"use client";
import React, { useState } from "react";

export default function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const totalPages = 18; // Total number of pages

  const PaginationButton = ({ children, isActive, onClick }) => {
    const baseClasses = "self-stretch px-2 my-auto w-8 h-8 rounded border border-solid flex items-center justify-center transition-colors duration-200";
    const activeClasses = "text-sky-400 bg-blue-100 border-sky-400";
    const inactiveClasses = "bg-white border-neutral-300 text-neutral-700 hover:bg-gray-100";

    return (
      <button
        className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        onClick={onClick}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </button>
    );
  };

  const PaginationNav = () => {
    const renderPageButtons = () => {
      const buttons = [];
      // Show only the current page and the next page
      for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage || i === currentPage + 1) {
          buttons.push(
            <PaginationButton key={i} isActive={i === currentPage} onClick={() => setCurrentPage(i)}>
              {i}
            </PaginationButton>
          );
        }
      }
      return buttons;
    };

    return (
      <nav
        className="flex gap-2 justify-center items-center my-auto text-xs font-medium leading-loose text-center whitespace-nowrap text-neutral-600"
        aria-label="Pagination"
      >
        <button
          aria-label="Previous page"
          className="focus:outline-none"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Go to the previous page
          disabled={currentPage === 1} // Disable button if on first page
        >
          <i
            className="icon-class object-contain shrink-0 w-5 opacity-50 aspect-square"
            aria-label="Previous"
          />

        </button>
        {renderPageButtons()}
        <button
          aria-label="Next page"
          className="focus:outline-none"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} // Go to the next page
          disabled={currentPage === totalPages} // Disable button if on last page
        >
          <i
            className="object-contain shrink-0 w-5 aspect-square"
            aria-label="Next"
          />

        </button>
      </nav>
    );
  };

  const EntriesSelector = () => {
    return (
      <div className="flex items-center gap-2 my-auto text-sm">
        <label htmlFor="entriesSelect" className="text-neutral-700 ml-2">
          Show
        </label>
        <select
          id="entriesSelect"
          className="appearance-none px-2 py-1 text-center text-gray-500 bg-white rounded-md border border-solid border-neutral-300 focus:outline-none focus:ring focus:ring-blue-400"
          aria-label="Number of entries to show"
        >
          <option value="1">01</option>
          <option value="5">05</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <span className="text-neutral-700">Entries</span>
        <div className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md bg-white text-gray-700 text-center">
          00
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-wrap gap-6 justify-between items-center mr-4">
      <EntriesSelector />
      <PaginationNav />
    </section>
  );
}
