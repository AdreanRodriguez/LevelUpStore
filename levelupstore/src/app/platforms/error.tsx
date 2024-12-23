"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong!</h1>
      <p className="mb-4">{error.message}</p>
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
