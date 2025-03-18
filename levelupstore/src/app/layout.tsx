import "@/app/styles/globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import ErrorBoundary from "@/app/components/errorBoundary/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Level Up Store",
  description: "Your ultimate destination for games and gear!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-custom`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <Header />
            <main className="max-w-mainSize min-h-screen mx-auto bg-custom">{children}</main>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
