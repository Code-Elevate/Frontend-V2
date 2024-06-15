"use client";
import * as React from "react";

import { cn } from "@/utils/cn";
import * as LabelPrimitive from "@radix-ui/react-label";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-0.5 opacity-75",
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
