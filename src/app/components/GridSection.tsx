import { ReactNode } from "react";

interface GridSectionProps {
  children: ReactNode;
}

export default function GridSection({ children }: GridSectionProps) {
  return <section className="grid grid-cols-autoFit gap-4 flex-1">{children}</section>;
}
