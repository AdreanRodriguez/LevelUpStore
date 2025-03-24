"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-5 text-center">
      <h1 className="text-3xl font-bold text-red-500 mb-4 font-afacad">Something went wrong!</h1>
      <p className="mb-4  text-xl text-custom font-afacad">{error.message}</p>
      <button className="font-afacad mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 active:scale-95" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
