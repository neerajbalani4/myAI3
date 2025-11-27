"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { ChatHeader, ChatHeaderBlock } from "@/app/parts/chat-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Link from "next/link";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

const STORAGE_KEY = 'chat-messages';

type StorageData = {
  messages: UIMessage[];
  durations: Record<string, number>;
};

// Safe storage loader
const loadMessagesFromStorage = (): { messages: UIMessage[]; durations: Record<string, number> } => {
  if (typeof window === 'undefined') return { messages: [], durations: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { messages: [], durations: {} };
    const parsed = JSON.parse(stored);
    return {
      messages: parsed.messages || [],
      durations: parsed.durations || {},
    };
  } catch (error) {
    console.error('Failed to load messages:', error);
    return { messages: [], durations: {} };
  }
};

const saveMessagesToStorage = (messages: UIMessage[], durations: Record<string, number>) => {
  if (typeof window === 'undefined') return;
  try {
    const data: StorageData = { messages, durations };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save messages:', error);
  }
};

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  // Initialize state
  const stored = typeof window !== 'undefined' ? loadMessagesFromStorage() : { messages: [], durations: {} };
  const [initialMessages] = useState<UIMessage[]>(stored.messages);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    messages: initialMessages,
  });

  useEffect(() => {
    setIsClient(true);
    setDurations(stored.durations);
    setMessages(stored.messages);
  }, []);

  useEffect(() => {
    if (isClient) {
      saveMessagesToStorage(messages, durations);
    }
  }, [durations, messages, isClient]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [key]: duration }));
  };

  useEffect(() => {
    if (isClient && initialMessages.length === 0 && !welcomeMessageShownRef.current) {
      const welcomeMessage: UIMessage = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        parts: [{ type: "text", text: WELCOME_MESSAGE }],
      };
      setMessages([welcomeMessage]);
      saveMessagesToStorage([welcomeMessage], {});
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, initialMessages.length, setMessages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    setMessages([]);
    setDurations({});
    saveMessagesToStorage([], {});
    toast.success("Chat cleared");
  }

  // --- REFACTOR: Main layout is now a Flex Column, taking 100% height of the parent container ---
  return (
    <div className="flex flex-col h-full w-full bg-background dark:bg-black text-foreground">
      
      {/* 1. Header (Sticky or just top of flex) */}
      <div className="flex-none border-b border-white/10 bg-background/50 backdrop-blur-md z-10">
        <ChatHeader>
          <ChatHeaderBlock />
          <ChatHeaderBlock className="justify-center items-center">
            <Avatar className="size-8 ring-1 ring-primary/20">
              <AvatarImage src="/logo.png" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <p className="tracking-tight font-medium text-sm">Chat with {AI_NAME}</p>
          </ChatHeaderBlock>
          <ChatHeaderBlock className="justify-end">
            <Button variant="ghost" size="sm" className="cursor-pointer text-muted-foreground hover:text-foreground" onClick={clearChat}>
              <Plus className="size-4 mr-2" />
              {CLEAR_CHAT_TEXT}
            </Button>
          </ChatHeaderBlock>
        </ChatHeader>
      </div>

      {/* 2. Messages Area (Flex-1 takes all remaining space) */}
      <div className="flex-1 overflow-y-auto min-h-0 px-4 py-6 scroll-smooth">
        <div className="max-w-3xl mx-auto flex flex-col justify-end min-h-full space-y-4">
          {isClient ? (
            <>
              <MessageWall 
                messages={messages} 
                status={status} 
                durations={durations} 
                onDurationChange={handleDurationChange} 
              />
              {status === "submitted" && (
                <div className="flex justify-start w-full py-4">
                  <Loader2 className="size-5 animate-spin text-muted-foreground" />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* 3. Input Area (Bottom of flex) */}
      <div className="flex-none p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="chat-form-message" className="sr-only">Message</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="chat-form-message"
                        className="h-14 pr-14 pl-5 bg-secondary/50 border-white/10 rounded-[24px] focus-visible:ring-1 focus-visible:ring-primary/30 text-base"
                        placeholder="Type your message here..."
                        disabled={status === "streaming"}
                        autoComplete="off"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      />
                      <div className="absolute right-2 top-2">
                        {(status === "ready" || status === "error") && (
                          <Button
                            className="rounded-full size-10"
                            type="submit"
                            disabled={!field.value.trim()}
                            size="icon"
                          >
                            <ArrowUp className="size-5" />
                          </Button>
                        )}
                        {(status === "streaming" || status === "submitted") && (
                          <Button
                            className="rounded-full size-10"
                            size="icon"
                            variant="destructive"
                            onClick={() => stop()}
                          >
                            <Square className="size-4 fill-current" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          
          <div className="mt-3 text-center text-xs text-muted-foreground">
             © {new Date().getFullYear()} {OWNER_NAME} · <Link href="/terms" className="hover:underline">Terms</Link> · Powered by <Link href="https://ringel.ai/" className="hover:underline text-primary">Ringel.AI</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
