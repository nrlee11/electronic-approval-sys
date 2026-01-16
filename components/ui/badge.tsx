import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    // layout
    "inline-flex w-fit shrink-0 items-center justify-center whitespace-nowrap",
    "gap-1",
    // shape & typography
    "rounded-full text-xs font-medium",
    // sizing (pill)
    "h-5 px-2",
    // border baseline (variant에서 제어)
    "border border-transparent",
    // icon sizing
    "[&>svg]:size-3 [&>svg]:pointer-events-none",
    // overflow
    "overflow-hidden",
    // interaction
    "transition-colors",
    // focus (회사 토큰: --ring, --background)
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        // “상태 표시” 기본 배지: primary를 너무 강하게 쓰고 싶지 않으면 아래를 secondary로 바꿔도 됨
        default: "bg-primary text-primary-foreground",

        secondary: "bg-secondary text-secondary-foreground",

        // 상태 표현은 accent: hover/selected 계열로 통일
        outline: "bg-transparent text-foreground border-border",

        // destructive는 “에러/위험 상태”
        destructive:
          "bg-destructive/15 text-destructive border border-destructive/25",

        // muted/ghost는 “약한 라벨”
        ghost: "bg-muted text-muted-foreground",

        // 링크형 배지
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
