"use client";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface CustomThemeProviderProps extends ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Returnera endast barn tills komponenten är monterad
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
