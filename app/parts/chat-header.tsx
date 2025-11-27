

import { cn } from "@/lib/utils";

export function ChatHeaderBlock({
    children,
    className
}: {
    children?: React.ReactNode,
    className?: string
}) {
    return (
        <div className={cn("gap-2 flex flex-1 items-center", className)}>
            {children}
        </div>
    );
}

export function ChatHeader({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={cn(
                "w-full flex items-center justify-between px-6 py-4",
                // 🔥 PREMIUM UI STYLES BELOW
                "backdrop-blur-md bg-white/10 dark:bg-black/20",
                "border-b border-white/10 dark:border-white/5",
                "shadow-lg shadow-black/5",
                "sticky top-0 z-50"
            )}
        >
            {children}
        </div>
    );
}
