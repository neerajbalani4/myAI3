// NEW LUXURY GOLD MESSAGE UI

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, HTMLAttributes } from "react";

// MESSAGE CONTAINER
export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end gap-3 py-4 px-2",
      from === "user"
        ? "is-user justify-end"
        : "is-assistant flex-row-reverse justify-start",
      className
    )}
    {...props}
  />
);

// MESSAGE BUBBLE STYLES
const messageContentVariants = cva(
  "flex flex-col gap-2 overflow-hidden rounded-2xl text-sm shadow-xl transition-all duration-300",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[78%] px-4 py-3",
          // USER BUBBLE (dark glass bubble)
          "group-[.is-user]:chat-bubble group-[.is-user]:text-foreground group-[.is-user]:gold-border",
          // ASSISTANT BUBBLE (gold tinted)
          "group-[.is-assistant]:chat-bubble-ai group-[.is-assistant]:gold-border",
          // Smooth expansion animation
          "animate-in fade-in slide-in-from-bottom-1",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>;

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    <p className="leading-relaxed gold-text">{children}</p>
  </div>
);

// AVATARS (Premium gold border ring)
export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar
    className={cn(
      "size-10 gold-border rounded-full overflow-hidden bg-black shadow-lg",
      className
    )}
    {...props}
  >
    <AvatarImage alt="" className="object-cover" src={src} />

    <AvatarFallback className="bg-black text-[11px] gold-text font-bold">
      {name?.slice(0, 2).toUpperCase() || "AI"}
    </AvatarFallback>
  </Avatar>
);
