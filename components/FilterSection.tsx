import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { Popover } from "@base-ui/react/popover";

interface FilterSectionProps {
  onSearch: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onSearch }) => {
  const [fromOpen, setFromOpen] = React.useState(false);
  const [toOpen, setToOpen] = React.useState(false);

  const [from, setFrom] = React.useState<Date | undefined>();
  const [to, setTo] = React.useState<Date | undefined>();

  const fromText = from ? format(from, "yyyy.MM.dd", { locale: ko }) : "";
  const toText = to ? format(to, "yyyy.MM.dd", { locale: ko }) : "";

  return (
    <div className="bg-card rounded-sm border-t border-b border-border py-8 px-4 mb-6">
      <div className="flex flex-col gap-6">
        {/* Row 1: Date range */}
        <div className="flex items-center flex-1">
          <label className="w-24 text-sm font-medium text-foreground">
            상신일
          </label>
          <div className="flex items-center gap-[11px]">
            {/* FROM */}
            <Popover.Root open={fromOpen} onOpenChange={setFromOpen}>
              <Popover.Trigger
                render={(triggerProps) => (
                  <div className="relative" {...triggerProps}>
                    <Input
                      readOnly
                      className="w-32 pr-8 cursor-pointer"
                      placeholder="YYYY.MM.DD"
                      value={fromText}
                    />
                    <span className="material-icons-outlined absolute right-2 top-1.5 text-muted-foreground text-base pointer-events-none">
                      calendar_today
                    </span>
                  </div>
                )}
              />

              <Popover.Portal>
                <Popover.Positioner sideOffset={8} align="start">
                  <Popover.Popup className="z-50 rounded-md border bg-background p-2 shadow-md">
                    <DayPicker
                      mode="single"
                      selected={from}
                      onSelect={(d) => {
                        setFrom(d);
                        setFromOpen(false);

                        // from이 to보다 뒤면 to 초기화
                        if (d && to && d > to) setTo(undefined);
                      }}
                      locale={ko}
                    />
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
            <span className="text-muted-foreground">~</span>
            {/* TO */}
            <Popover.Root open={toOpen} onOpenChange={setToOpen}>
              <Popover.Trigger
                render={(triggerProps) => (
                  <div className="relative" {...triggerProps}>
                    <Input
                      readOnly
                      className="w-32 pr-8 cursor-pointer"
                      placeholder="YYYY.MM.DD"
                      value={toText}
                      disabled={!from} // from 선택 전엔 비활성화 (UX)
                    />
                    <span className="material-icons-outlined absolute right-2 top-1.5 text-muted-foreground text-base pointer-events-none">
                      calendar_today
                    </span>
                  </div>
                )}
              />

              <Popover.Portal>
                <Popover.Positioner sideOffset={8} align="start">
                  <Popover.Popup className="z-50 rounded-md border bg-background p-2 shadow-md">
                    <DayPicker
                      mode="single"
                      selected={to}
                      onSelect={(d) => {
                        setTo(d);
                        setToOpen(false);
                      }}
                      // from 이후 날짜만 선택 가능
                      disabled={from ? { before: from } : undefined}
                      locale={ko}
                    />
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>

        {/* Row 2: Form & Search */}
        <div className="flex items-center">
          <div className="flex items-center flex-1">
            <label className="w-24 text-sm font-medium text-foreground">
              기안 양식
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="px-4 py-1.5 flex justify-between w-72"
                  >
                    전체
                    <HugeiconsIcon
                      icon={Icons.ArrowDown01Icon}
                      strokeWidth={2}
                      data-icon="inline-end"
                    />
                  </Button>
                }
              />
              <DropdownMenuContent className="bg-background">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>전체</DropdownMenuLabel>
                  <DropdownMenuItem>업무기안</DropdownMenuItem>
                  <DropdownMenuItem>업무협조</DropdownMenuItem>
                  <DropdownMenuItem>지출결의서(기본형)</DropdownMenuItem>
                  <DropdownMenuItem>지출결의서(엑셀업로드형)</DropdownMenuItem>
                  <DropdownMenuItem>회의록</DropdownMenuItem>
                  <DropdownMenuItem>업무보고</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center flex-1">
            <label className="w-24 text-sm font-medium text-foreground">
              검색
            </label>
            <div className="flex flex-1 gap-2 items-center">
              <div className="relative shrink-0 ">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="outline"
                        className="px-4 py-1.5 flex justify-between w-24"
                      >
                        전체
                        <HugeiconsIcon
                          icon={Icons.ArrowDown01Icon}
                          strokeWidth={2}
                          data-icon="inline-end"
                        />
                      </Button>
                    }
                  />
                  <DropdownMenuContent className="bg-background">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>전체</DropdownMenuLabel>
                      <DropdownMenuItem>기안부서</DropdownMenuItem>
                      <DropdownMenuItem>기안제목</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="material-icons-outlined absolute right-2 top-1.5 text-muted-foreground text-sm pointer-events-none"></span>
              </div>
              <Input
                className="flex-1 max-w-[184px]"
                placeholder="기안제목 입력"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button size="lg">조회</Button>
      </div>
    </div>
  );
};

export default FilterSection;
