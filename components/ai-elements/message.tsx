import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, HTMLAttributes } from "react";

/* ----------------------------------------------
   MESSAGE WRAPPER (keeps your logic intact)
----------------------------------------------*/
export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user"
        ? "is-user"
        : "is-assistant flex-row-reverse justify-end",
      className
    )}
    {...props}
  />
);

/* ----------------------------------------------
   LUXURY GOLD MESSAGE BUBBLES
----------------------------------------------*/

const messageContentVariants = cva(
  "flex flex-col gap-2 overflow-hidden rounded-2xl text-sm shadow-lg transition-all duration-300",

  {
    variants: {
      variant: {
        contained: [
          "max-w-[80%] px-4 py-3",

          // USER BUBBLE → Gold
          "group-[.is-user]:bg-gradient-to-br group-[.is-user]:from-[#FFD46A] group-[.is-user]:to-[#CFA041] group-[.is-user]:text-black group-[.is-user]:shadow-[0_0_18px_rgba(255,215,140,0.35)]",

          // ASSISTANT BUBBLE → Black glass with gold border
          "group-[.is-assistant]:bg-[rgba(15,15,15,0.7)] group-[.is-assistant]:backdrop-blur-xl",
          "group-[.is-assistant]:border group-[.is-assistant]:border-[#E7C26C]/40",
          "group-[.is-assistant]:text-[#EEDCAA]",
        ],

        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-[#CFA041]/20 group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-[#FFD46A]",
          "group-[.is-assistant]:text-[#E7C26C]",
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
  <div className={cn(messageContentVariants({ variant, className }))} {...props}>
    {children}
  </div>
);

/* ----------------------------------------------
   LUXURY GOLD AVATAR
----------------------------------------------*/

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
      `size-9 
       ring-2 ring-[#E7C26C]/70 
       shadow-[0_0_12px_rgba(231,194,108,0.45)]
       rounded-full 
       overflow-hidden`,
      className
    )}
    {...props}
  >
    <AvatarImage
      alt=""
      className="object-cover"
      src={src}
    />
    <AvatarFallback className="bg-[#1B1A17] text-[#E7C26C]">
      {name?.slice(0, 2).toUpperCase() || "ME"}
    </AvatarFallback>
  </Avatar>
);
