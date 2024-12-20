"use client";

import * as React from "react";
import { FaRegUser } from "react-icons/fa6";

import { cn } from "@/utils/cn";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-11 w-11 shrink-0 overflow-hidden rounded-full items-center justify-center border",
      className
    )}
  >
    <FaRegUser className="h-5 w-5" />
  </AvatarPrimitive.Root>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar };
