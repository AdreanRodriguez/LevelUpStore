export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Huvudinnehållet (produktlistan eller andra undersidor) */}
      <main className="bg-custom">{children}</main>
    </div>
  );
}
