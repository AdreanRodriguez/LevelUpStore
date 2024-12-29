export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Huvudinnehållet (produktlistan eller andra undersidor) */}
      <main>{children}</main>
    </div>
  );
}
