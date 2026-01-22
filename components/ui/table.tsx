"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          [
            "w-full caption-bottom",
            // 표는 기본 텍스트가 너무 작지 않게(원하면 text-xs로 되돌려도 됨)
            "text-sm",
          ].join(" "),
          className
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        [
          // 헤더 구분감 (선택: 필요 없으면 제거)
          "bg-muted",
          // 헤더 row 하단 라인
          "[&_tr]:border-b [&_tr]:border-border",
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("text-muted-foreground","[&_tr:hover]:bg-example-content", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        [
          "border-b border-border",
          "transition-colors",
          // hover/selected: 토큰 기반 (muted 또는 accent 둘 다 OK)
          "data-[state=selected]:bg-muted",
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        [
          "h-10 px-2 text-center align-middle whitespace-nowrap",
          "font-medium text-foreground",
          // 체크박스 들어가는 칼럼 정렬 보정
          "[&:has([role=checkbox])]",
          "border-r border-border",
          "[&:last-child]:border-r-0"
        ].join(" "),
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]",
        "border-r border-border",
        "[&:last-child]:border-r-0",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
