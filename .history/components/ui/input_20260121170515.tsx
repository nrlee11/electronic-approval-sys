"use client";

import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";
import { Variable } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        [
          // layout & sizing
          "flex h-9 w-full min-w-0 px-2.5 py-1",
          "text-sm",

          // surface
          "bg-background text-foreground",
          "border border-input",
          "rounded-md",

          // placeholder
          "placeholder:text-muted-foreground",

          // focus (회사 표준)
          "focus-visible:outline-none",
          "focus-visible:ring-1 focus-visible:ring-ring",
          "focus-visible:ring-offset-background",
          "focus-visible:border-ring",

          // invalid
          "aria-invalid:border-destructive",
          "aria-invalid:focus-visible:ring-destructive/30",

          // disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          "disabled:bg-muted",

          // file input
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

          // motion
          "transition-colors",
        ].join(" "),

        className,
      )}
      {...props}
    />
  );
}

export { Input };
