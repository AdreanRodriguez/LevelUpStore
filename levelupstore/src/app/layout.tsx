import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeSwitcher />
          {/* <Header /> */}
          <main className="w-max[1200]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export const ErrorBoundary = ({ error, reset }: { error: Error; reset: () => void }) => (
  <div className="p-5 text-center">
    <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong globally!</h1>
    <p className="mb-4">{error.message}</p>
    <button
      className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
      onClick={() => reset()}
    >
      Try Again
    </button>
  </div>
);
