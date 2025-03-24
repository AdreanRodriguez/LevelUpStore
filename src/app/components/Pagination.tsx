"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  page: number;
  totalPages: number;
  maxVisiblePages: number;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, maxVisiblePages }) => {
  const router = useRouter();

  // Funktion för att byta sida
  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      router.push(`/games?page=${newPage}`);
    }
  };

  // Pagination logic
  const totalPageCount = totalPages;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  // startPage = Början av sidnumreringen, vilket normalt är (page - halfVisible).
  // Om det blir mindre än 1, justeras det till 1.
  let startPage = Math.max(1, page - halfVisible);

  // Startar från startPage och räknar upp till maxVisiblePages, men får inte överstiga totalPageCount.
  const endPage = Math.min(totalPageCount, startPage + maxVisiblePages - 1);

  // När man når slutet, justera startPage så att maxVisiblePages alltid visas
  // Om endPage - startPage + 1 (antal sidor) är mindre än maxVisiblePages,
  // betyder det att det är nära slutet och måste flytta startPage bakåt.
  // Math.max(1, endPage - maxVisiblePages + 1) ser till att vi inte får negativa sidnummer.
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Skapa sidlistan
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-wrap justify-center text-xs items-center mt-16 space-x-2">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-2 font-afacad border rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition active:scale-95"
      >
        Previous
      </button>

      {startPage > 1 && <span className="pt-4 font-afacad sm:inline dark:text-white">...</span>}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`px-3 py-2 font-afacad border rounded transition active:scale-95 ${p === page ? "bg-gray-900 text-white border-gray-700" : "bg-gray-200 hover:bg-gray-300 hover:scale-105"}`}
        >
          {p}
        </button>
      ))}

      {endPage < totalPages && <span className="pt-4 font-afacad sm:inline dark:text-white">...</span>}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-2 sm:py-2 font-afacad border rounded bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition active:scale-95"
      >
        Next
      </button>
    </div>
  );
};
