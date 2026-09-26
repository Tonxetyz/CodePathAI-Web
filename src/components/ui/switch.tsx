"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-[var(--line)] bg-white/10 transition-colors data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[var(--violet-2)] data-[state=checked]:to-[var(--violet)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--violet)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block h-4.5 w-4.5 translate-x-1 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-5.5" />
  </SwitchPrimitive.Root>
));
Switch.displayName = SwitchPrimitive.Root.displayName;
