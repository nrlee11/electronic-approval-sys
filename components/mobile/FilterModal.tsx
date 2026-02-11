import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply?: (values?: {
    from?: Date;
    to?: Date;
    formType?: string;
    searchField?: string;
    keyword?: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply }) => {
  const [from, setFrom] = React.useState<Date | undefined>();
  const [to, setTo] = React.useState<Date | undefined>();

  const [formType, setFormType] = React.useState("전체");
  const [searchField, setSearchField] = React.useState("기안제목");
  const [keyword, setKeyword] = React.useState("");

  const fromText = from ? format(from, "yyyy.MM.dd", { locale: ko }) : "";
  const toText = to ? format(to, "yyyy.MM.dd", { locale: ko }) : "";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-end bg-black/30"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full bg-background text-foreground rounded-t-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center">
          <div className="w-8" />
          <h3 className="flex-1 text-center text-lg font-bold">검색</h3>
          <button onClick={onClose} className="w-8 text-right text-muted-foreground">
            취소
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4 max-h-[58vh] overflow-auto">
          {/* ✅ Date range (Radix Popover 방식) */}
          <div>
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">
              상신일
            </label>
            <div className="flex gap-2 items-center">
              {/* FROM */}
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="relative flex-1 text-left">
                    <Input
                      readOnly
                      className="pr-9 cursor-pointer pointer-events-none"
                      placeholder="YYYY.MM.DD"
                      value={fromText}
                    />
                    <span className="material-icons-outlined absolute right-2 top-2 text-muted-foreground text-base pointer-events-none">
                      calendar_today
                    </span>
                  </button>
                </PopoverTrigger>

                <PopoverContent align="start" side="top" className="z-[99999] w-auto p-2">
                  <DayPicker
                    mode="single"
                    selected={from}
                    onSelect={(d) => {
                      setFrom(d);
                      // from이 to보다 뒤면 to 초기화
                      if (d && to && d > to) setTo(undefined);
                    }}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex items-center px-1 text-muted-foreground">~</div>

              {/* TO */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="relative flex-1 text-left"
                    disabled={!from}
                  >
                    <Input
                      readOnly
                      className="pr-9 cursor-pointer pointer-events-none"
                      placeholder="YYYY.MM.DD"
                      value={toText}
                      disabled={!from}
                    />
                    <span className="material-icons-outlined absolute right-2 top-2 text-muted-foreground text-base pointer-events-none">
                      calendar_today
                    </span>
                  </button>
                </PopoverTrigger>

                <PopoverContent align="start" side="top" className="z-[99999] w-auto p-2">
                  <DayPicker
                    mode="single"
                    selected={to}
                    onSelect={(d) => setTo(d)}
                    disabled={from ? { before: from } : undefined}
                    locale={ko}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Form type */}
          <div>
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">
              기안양식
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="px-4 py-2 flex justify-between w-full">
                    {formType}
                    <HugeiconsIcon icon={Icons.ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                  </Button>
                }
              />
              <DropdownMenuContent zIndexClass="z-[100000]">
                <DropdownMenuGroup>
                  {[
                    "전체",
                    "업무기안",
                    "업무협조",
                    "지출결의서(기본형)",
                    "지출결의서(엑셀업로드형)",
                    "회의록",
                    "업무보고",
                  ].map((v) => (
                    <DropdownMenuItem key={v} onSelect={() => setFormType(v)}>
                      {v}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search */}
          <div>
            <label className="text-sm font-semibold text-muted-foreground mb-2 block">
              검색
            </label>
            <div className="space-y-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" className="px-4 py-2 flex justify-between w-full">
                      {searchField}
                      <HugeiconsIcon icon={Icons.ArrowDown01Icon} strokeWidth={2} data-icon="inline-end" />
                    </Button>
                  }
                />
                <DropdownMenuContent zIndexClass="z-[100000]">
                  <DropdownMenuGroup>
                    {["기안제목", "기안부서", "문서번호"].map((v) => (
                      <DropdownMenuItem key={v} onSelect={() => setSearchField(v)}>
                        {v}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Input
                placeholder={`${searchField} 입력`}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-3">
          <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
            취소
          </Button>

          <Button
            size="lg"
            className="flex-1"
            onClick={() => {
              onApply?.({ from, to, formType, searchField, keyword });
              onClose();
            }}
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
