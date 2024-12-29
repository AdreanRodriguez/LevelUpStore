"use client";
import Loading from "./loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // För att hantera laddningsstatus
  const router = useRouter(); // För att navigera programatiskt

  const handleShopNow = () => {
    setIsLoading(true); // Visa Loading-komponenten
    setTimeout(() => {
      router.push("/products"); // Navigera till /products efter 2 sekunder
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col p-5 items-center justify-center min-h-screen bg-gray-800 text-white"
      style={{
        backgroundImage: "url('/subtle-prism.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold">Welcome to LevelUp Store</h1>
      <p className="mt-4 text-xl">Your one-stop shop for the best gaming experience!</p>
      <button
        onClick={handleShopNow}
        className="p-4 mt-10 text-5xl border-solid border-2 border-[#213874] rounded-md hover:border-indigo-300"
      >
        Shop now
      </button>
    </div>
  );
}
