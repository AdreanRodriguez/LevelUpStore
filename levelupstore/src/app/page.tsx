"use client";
import Loading from "./loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // För att hantera laddningsstatus
  const navigateToRoute = useRouter(); // För att navigera programatiskt

  const handleShopNow = () => {
    setIsLoading(true); // Visa Loading-komponenten
    setTimeout(() => {
      navigateToRoute.push("/products"); // Navigera till /products efter 1.5 sekunder
    }, 1500);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <header className="text-textColor">Här ska header vara</header>
      <div className="flex flex-col p-5 items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold">Welcome to LevelUp Store</h1>
        <p className="mt-4 text-xl">Your one-stop shop for the best gaming experience!</p>
        <button
          onClick={handleShopNow}
          className="p-4 mt-10 text-5xl border-solid border-2 border-[#000] rounded-md hover:border-[#fff]"
        >
          Shop now
        </button>
      </div>
      <footer className="text-textColor">Här ska footer vara</footer>
    </>
  );
}
