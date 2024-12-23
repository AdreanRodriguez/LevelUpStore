// Funktion för att hämta data (tex med React Query)
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

// export async function fetchAllGames() {

//   if (!API_KEY) {
//     throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set in .env.local");
//   }

//   const res = await fetch(
//     `https://api.rawg.io/api/games?key=${API_KEY}&page_size=20&ordering=-rating`,
//     { cache: "no-store" } // Ingen caching sker.
//                           // Varje förfrågan går direkt till servern, och svaret lagras inte i cachen.
//                           // Används när du alltid vill ha den senaste datan.
//   );

//   if (!res.ok) {
//     throw new Error(`Failed to fetch games: ${res.status}`);
//   }

//   return res.json();
// }
