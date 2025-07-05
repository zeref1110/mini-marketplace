// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Marketplace Clone",
  description: "A Facebook Marketplace inspired app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 text-gray-900">
        <Header />
        {children} {/* ⬅️ HomePage will handle layout (Sidebar + Main) */}
      </body>
    </html>
  );
}
