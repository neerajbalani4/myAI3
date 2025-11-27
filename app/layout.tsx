import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {/* ---- SIDEBAR + MAIN LAYOUT WRAPPER ---- */}
        <div className="flex h-screen w-screen overflow-hidden">
          
          {/* ---- SIDEBAR ---- */}
          <aside
            className="
              hidden md:flex 
              flex-col 
              w-64 
              bg-[#0f0f0f] 
              text-white 
              border-r border-white/10
              py-6 px-4
              gap-6
            "
          >
            <h1 className="text-lg font-semibold tracking-tight">MyAI3</h1>

            <button className="w-full bg-white/10 hover:bg-white/20 text-left px-4 py-2 rounded-lg transition">
              ➕ New Chat
            </button>

            <div className="text-sm opacity-70">Your Chats</div>

            <div className="flex flex-col gap-2 overflow-y-auto pr-2">
              {/* Example chat items */}
              <button className="bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-left">
                Chat #1
              </button>
              <button className="bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg text-left">
                Chat #2
              </button>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10">
              <button className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-left transition">
                📚 Library
              </button>
              <button className="w-full bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-left mt-2 transition">
                ⚙️ Settings
              </button>
            </div>
          </aside>

          {/* ---- MAIN CONTENT AREA ---- */}
          <main className="flex-1 h-full overflow-hidden">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
