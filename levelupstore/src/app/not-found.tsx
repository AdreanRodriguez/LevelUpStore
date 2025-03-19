import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex-col justify-center text-center mt-40">
      <h1 className="text-4xl text-red-500 font-bold font-righteous">404</h1>
      <p className="sm:text-2xl text-custom font-righteous mb-7">
        Oops! This page could not be found.
      </p>
      <Link
        href="/"
        className="font-righteous text-custom border rounded-lg border-custom px-4 py-2 bg-card hover:bg-slate-700 hover:text-gray-100"
      >
        Go back to home
      </Link>
    </div>
  );
}
