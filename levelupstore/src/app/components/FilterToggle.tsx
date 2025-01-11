"use client";

import { useState } from "react";

// Children är i games/page.tsx rad 13 Genres.tsx
export default function FilterToggle({ children }: { children: React.ReactNode }) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div>
      {/* Knapp för att toggla filtret */}
      <button
        className="bg-slate-600 text-white py-2 px-4 rounded mb-4 md:hidden "
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Close Genres" : "Genres"}
      </button>

      {/* Filtret visas eller göms baserat på state */}
      <div className={`${showFilter ? "block" : "hidden"} md:block`}>{children}</div>
    </div>
  );
}
