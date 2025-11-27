import { cn } from "@/lib/utils";
import Image from "next/image";

export function ChatHeaderBlock({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("gap-2 flex flex-1 items-center", className)}>
      {children}
    </div>
  );
}

export function ChatHeader({ children }: { children: React.ReactNode }) {
  return (
    <header
      className="
        w-full
        flex 
        items-center 
        py-6 
        px-6 
        luxury-gradient 
        gold-border 
        rounded-b-2xl
        shadow-xl
        sticky top-0 
        z-50
      "
    >
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Markus Logo"
          width={60}
          height={60}
          className="rounded-full gold-glow"
        />

        <div>
          <h1 className="text-2xl font-bold gold-text tracking-wide">
            Tool Scout — Your AI Tool Guide
          </h1>
          <p className="text-xs text-neutral-400">
            Crafted by Neeraj Balani • Powered by AI
          </p>
        </div>
      </div>

      <div className="flex-1"></div>

      {children}
    </header>
  );
}
