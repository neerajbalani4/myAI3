"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageWall } from "@/components/messages/message-wall";
import { useChat } from "@ai-sdk/react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import { ArrowUp, Loader2, Square } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller as RHFController, useForm as useRHF } from "react-hook-form";
import { UIMessage } from "ai";

const formSchema = z.object({
  message: z.string().min(1).max(2000),
});

export default function ChatPage() {
  const [language, setLanguage] = useState<string>(() => {
    try {
      return typeof window !== "undefined" ? localStorage.getItem("myai_language") || "English" : "English";
    } catch {
      return "English";
    }
  });

  useEffect(() => {
    const onLang = (e: Event) => {
      // @ts-ignore
      const detail = (e as CustomEvent).detail;
      if (detail) setLanguage(detail);
    };
    window.addEventListener("language-changed", onLang);
    return () => window.removeEventListener("language-changed", onLang);
  }, []);

  // -----------------------
  // Chat logic (existing)
  // -----------------------
  const { messages, sendMessage, status, stop, setMessages } = useChat({ messages: [] });

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: UIMessage = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        parts: [{ type: "text", text: WELCOME_MESSAGE }],
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const form = useRHF({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: any) {
    sendMessage({ text: data.message });
    form.reset();
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col">
        <div className="px-6 pt-8">
          <div className="text-sm text-gray-500">Language: <strong>{language}</strong></div>
        </div>

        <div className="flex-1 overflow-auto px-8 py-6">
          <MessageWall messages={messages} status={status} />
        </div>

        <div className="p-6 border-t border-white/6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
            <FieldGroup>
              <RHFController
                name="message"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="sr-only" htmlFor="chat-message">Message</FieldLabel>
                    <div className="relative">
                      <Input {...field} id="chat-message" placeholder="Type your message here..." className="pr-16" />
                      <Button disabled={!field.value.trim()} type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
      </main>
    </div>
  );
}
