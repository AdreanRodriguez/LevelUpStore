export default function getPriceByYear(year: number): number {
  if (year >= 2020) return 59.99;
  if (year >= 2015) return 49.99;
  if (year >= 2010) return 39.99;
  return 9.99;
}
