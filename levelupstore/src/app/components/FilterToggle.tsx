"use client";

import { useState } from "react";

// Children är i games page rad 89 Genres.tsx
export default function FilterToggle({ children }: { children: React.ReactNode }) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <button className="bg-slate-600 text-white py-2 px-4 rounded mb-4 md:hidden " onClick={() => setShowFilter(!showFilter)}>
        {showFilter ? "Close Genres" : "Genres"}
      </button>
      <div className={`${showFilter ? "block" : "hidden"} md:block`}>{children}</div>
    </>
  );
}
