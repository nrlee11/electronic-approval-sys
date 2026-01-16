import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    // layout
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "gap-1.5 font-medium",
    // shape
    "rounded-md",
    // icon sizing
    "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none shrink-0",
    // interaction
    "transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    // focus (회사 토큰: --ring, --background)
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // border baseline (variant에서 주로 제어)
    "border border-transparent",
  ].join(" "),
  {
    variants: {
      variant: {
        default: ["bg-primary text-primary-foreground hover:bg-primary-hover",
        "disabled:bg-primary-disabled disabled:text-primary-disabled-foreground"],

        secondary:
          "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",

        outline:
          "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",

        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",

        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-9 px-4 min-w-[96px] text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 px-2.5  min-w-[72px] text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3  min-w-[80px] text-sm [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-5 min-w-[112px] text-base",
        icon: "size-9 px-0",
        "icon-xs": "size-7 px-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 px-0",
        "icon-lg": "size-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
