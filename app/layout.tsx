import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

// import Sidebar as a client component (dynamic import works well too)
const Sidebar = dynamic(() => import("@/components/Sidebar/Sidebar"), { ssr: false });

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
  description: "MyAI3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 bg-background min-h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
