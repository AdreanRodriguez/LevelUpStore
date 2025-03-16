"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, "attribute"> {
  children: ReactNode;
  attribute: "class"; // Specifik typ för attribute
  defaultTheme: string;
  enableSystem: boolean;
}

export default function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Returnera endast children tills komponenten är monterad
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
