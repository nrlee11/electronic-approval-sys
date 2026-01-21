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
interface FilterSectionProps {
  onSearch: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onSearch }) => {
  return (
    <div className="bg-card rounded-sm border-t border-b border-border py-8 px-4 mb-6">
      <div className="flex flex-col gap-6">
        {/* Row 1: Date range */}
       <div className="flex items-center flex-1">
          <label className="w-24 text-sm font-medium text-foreground">
            상신일
          </label>
          <div className="flex items-center gap-[11px]">
            <div className="relative">
              <Input className="w-32"></Input>
              <span className="material-icons-outlined absolute right-2 top-1.5 text-muted-foreground text-base"></span>
            </div>
            <span className="text-muted-foreground">~</span>
            <div className="relative">
              <Input className="w-32"></Input>
              <span className="material-icons-outlined absolute right-2 top-1.5 text-muted-foreground text-base"></span>
            </div>
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
              <DropdownMenuContent className="bg-background w-72">
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
            <label className="w-16 text-sm font-medium text-foreground text-center">
              검색
            </label>
            <div className="flex flex-1 gap-2 items-center">
              <div className="relative shrink-0 ">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="outline"
                        className="px-4 py-1.5 flex items-center gap-20"
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
              <Input className="flex-1" placeholder="기안제목 입력" />
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
