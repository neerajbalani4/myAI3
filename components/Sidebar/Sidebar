"use client";

import { useState, useEffect } from "react";
import { Plus, BookMarked, Settings, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [chats, setChats] = useState<string[]>([]);
  const [language, setLanguage] = useState("English");

  // Load stored chats securely
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("saved-chats");
        if (stored) setChats(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load chats", error);
      }
    }
  }, []);

  // Save chats securely
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("saved-chats", JSON.stringify(chats));
      } catch (error) {
        console.error("Failed to save chats", error);
      }
    }
  }, [chats]);

  const createNewChat = () => {
    const id = `Chat ${chats.length + 1}`;
    setChats([...chats, id]);
  };

  return (
    <aside className="w-64 h-screen shrink-0 bg-gradient-to-b from-black via-[#0c0c0c] to-black text-white p-5 flex flex-col border-r border-white/10 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {/* Fallback if logo is missing */}
        <div className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden">
             <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>
        <h1 className="font-semibold text-lg">Tool Scout</h1>
      </div>

      {/* New Chat Button */}
      <Button
        className="w-full flex items-center justify-center gap-2 mb-6 bg-white/10 hover:bg-white/20 text-white border border-white/5 transition-colors"
        onClick={createNewChat}
      >
        <Plus size={16} /> New Chat
      </Button>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Your Chats</p>
        <div className="space-y-2">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="w-full px-3 py-2 bg-white/5 rounded-md border border-white/5 hover:bg-white/10 hover:border-white/20 cursor-pointer transition-all text-sm text-gray-300"
            >
              {chat}
            </div>
          ))}

          {chats.length === 0 && (
            <p className="text-gray-500 text-sm italic">No chats yet.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-4 space-y-2 pt-4 border-t border-white/10">
        <Link
          href="/library"
          className="flex items-center gap-3 text-gray-400 hover:text-white px-2 py-2 rounded-md hover:bg-white/10 transition-colors text-sm"
        >
          <BookMarked size={18} /> Library
        </Link>

        {/* Settings */}
        <div className="flex items-center gap-3 text-gray-400 px-2 py-2 hover:text-white hover:bg-white/10 rounded-md cursor-pointer transition-colors text-sm">
          <Settings size={18} /> Settings
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-3 px-2 py-2 bg-white/5 rounded-md border border-white/10 mt-2">
          <Globe size={16} className="text-gray-400" />
          <select
            className="bg-transparent text-white text-sm outline-none w-full cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option className="bg-[#0c0c0c]" value="English">English</option>
            <option className="bg-[#0c0c0c]" value="Hindi">Hindi</option>
            <option className="bg-[#0c0c0c]" value="Marathi">Marathi</option>
            <option className="bg-[#0c0c0c]" value="Gujarati">Gujarati</option>
            <option className="bg-[#0c0c0c]" value="Spanish">Spanish</option>
            <option className="bg-[#0c0c0c]" value="French">French</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
