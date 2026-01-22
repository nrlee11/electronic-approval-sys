"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        [
          // layout
          "relative inline-flex shrink-0 items-center justify-center",
          "size-5",
          // surface/border
          "border border-input bg-background text-foreground",
          "rounded-sm",
          // state
          "data-[checked]:bg-primary data-[checked]:text-primary-foreground",
          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // focus (회사 표준)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // bigger hit area (좋은 UX)
          "after:absolute after:-inset-x-3 after:-inset-y-2",
          // transitions
          "transition-colors",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current [&>svg]:size-3.5"
      >
        <HugeiconsIcon icon={Tick02Icon} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
