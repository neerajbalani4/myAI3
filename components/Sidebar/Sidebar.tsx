"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Bookmark, Settings, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Sidebar component
 * - Stores chats into localStorage under "myai_chats"
 * - Allows creating new chats
 * - Language selector persists to localStorage under "myai_language"
 * - Broadcasts a `language-changed` CustomEvent so other client components can react
 */

const STORAGE_KEY = "myai_chats";
const LANG_KEY = "myai_language";

export default function Sidebar() {
  const [chats, setChats] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("English");

  // load chats + language
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChats(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load chats", e);
    }

    try {
      const lang = localStorage.getItem(LANG_KEY);
      if (lang) setLanguage(lang);
    } catch (e) {
      console.warn("Failed to load language", e);
    }
  }, []);

  // persist chats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
    } catch (e) {
      console.warn("Failed to save chats", e);
    }
  }, [chats]);

  // when language changes persist + broadcast
  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, language);
      // broadcast event so other components (chat page) can react
      window.dispatchEvent(new CustomEvent("language-changed", { detail: language }));
    } catch (e) {
      console.warn("Failed to save language", e);
    }
  }, [language]);

  const createNewChat = () => {
    const id = `Chat #${chats.length + 1}`;
    setChats((prev) => [id, ...prev]); // newest first
    // optionally navigate or focus on new chat — handled by your page logic
  };

  const openChat = (i: number) => {
    // Basic behaviour: rotate selected chat to top so it's treated as opened
    // You can replace this with routing or state lifting to the chat page
    setChats((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(i, 1);
      return [selected, ...copy];
    });
  };

  const deleteChat = (i: number) => {
    setChats((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white p-5 flex flex-col border-r border-white/6 min-h-screen">
      {/* BRAND */}
      <div className="flex items-center gap-3 mb-6">
        {/* replace /logo.png with your logo file in /public */}
        <img src="/logo.png" alt="logo" className="w-12 h-12 rounded-full border border-white/20 shadow-sm" />
        <div>
          <div className="text-lg font-semibold text-gold-500">Tool Scout</div>
          <div className="text-xs text-gray-400">Crafted by Neeraj Balani</div>
        </div>
      </div>

      {/* New Chat */}
      <Button
        onClick={createNewChat}
        className="w-full flex items-center justify-center gap-2 mb-4 bg-white/6 hover:bg-white/10 text-white"
      >
        <Plus size={16} /> New Chat
      </Button>

      {/* Chats list */}
      <div>
        <div className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Your Chats</div>

        <div className="flex flex-col gap-2">
          {chats.length === 0 && (
            <div className="text-gray-500 text-sm">No chats yet. Click “New Chat” to start.</div>
          )}

          {chats.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3 bg-white/4 hover:bg-white/6 rounded-md px-3 py-2 cursor-pointer"
            >
              <div onClick={() => openChat(idx)} className="text-left truncate">
                {c}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openChat(idx)}
                  className="text-xs text-gray-200 px-2 py-1 rounded-md hover:bg-white/8"
                  aria-label="Open chat"
                >
                  Open
                </button>
                <button
                  onClick={() => deleteChat(idx)}
                  className="text-xs text-red-300 px-2 py-1 rounded-md hover:bg-red-600/10"
                  aria-label="Delete chat"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom links */}
      <div className="mt-auto space-y-4 pt-6">
        <Link href="/library" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 py-2 rounded-md hover:bg-white/6">
          <Bookmark size={18} /> Library
        </Link>

        <Link href="/settings" className="flex items-center gap-3 text-gray-300 hover:text-white px-2 py-2 rounded-md hover:bg-white/6">
          <Settings size={18} /> Settings
        </Link>

        {/* language */}
        <div className="flex items-center gap-3 px-2 py-2 bg-white/4 rounded-md border border-white/6">
          <Globe size={18} className="text-gray-300" />
          <select
            aria-label="Language"
            className="bg-transparent text-white outline-none w-full"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
