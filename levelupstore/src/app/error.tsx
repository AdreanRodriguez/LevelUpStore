"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4 font-righteous">Something went wrong!</h1>
      <p className="mb-4 text-custom font-righteous">{error.message}</p>
      <button
        className="font-righteous mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
        onClick={() => reset()}
      >
        Try Again
      </button>
      <Link href="/" className="ml-2 px-4 py-3 bg-gray-600 text-white rounded hover:bg-gray-500">
        Go Home
      </Link>
    </div>
  );
}
