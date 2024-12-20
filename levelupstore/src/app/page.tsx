export default function Home() {
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
      <button className="p-4 mt-10 text-5xl border-solid border-2 border-indigo-600 rounded-md hover:border-indigo-300">
        Shop now
      </button>
    </div>
  );
}
