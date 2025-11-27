// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyAI3",
  description: "MyAI3 — Tool Scout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased bg-background`}>
        <div className="flex h-screen w-screen">
          {/* Sidebar (client component) */}
          <Sidebar />

          {/* Main content area */}
          <main className="flex-1 h-full overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
