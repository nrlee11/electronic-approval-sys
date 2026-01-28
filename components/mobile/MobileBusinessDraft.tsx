import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronDown,
  User,
  Settings,
  Info,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";

interface MobileBusinessDraftProps {
  onBack: () => void;
}

const MobileBusinessDraft: React.FC<MobileBusinessDraftProps> = ({
  onBack,
}) => {
  const [disclosure, setDisclosure] = useState("dept"); // public, dept, private

  return (
    <div className="bg-background min-h-screen pb-24 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border flex items-center justify-between px-4 h-14 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold text-foreground">기안작성</h1>
        <div className="w-8" />
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-32">
        <h2 className="text-xl font-bold text-foreground mb-4">업무기안</h2>

        {/* Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-sm border-b border-border pb-2">
            <span className="text-muted-foreground w-24">기안양식</span>
            <span className="text-foreground font-medium text-right">
              업무기안
            </span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-border pb-2">
            <span className="text-muted-foreground w-24">보존연한</span>
            <span className="text-foreground font-medium text-right">5년</span>
          </div>

          {/* Disclosure Option */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              공개여부
            </label>
            <div className="flex min-w-0 overflow-hidden gap-2">
              <Button
                onClick={() => setDisclosure("public")}
                variant="outline"
                size="lg"
                className="min-w-0 w-0 flex-1 py-2"
              >
                공개
              </Button>
              <Button
                onClick={() => setDisclosure("dept")}
                variant="outline"
                className="min-w-0 w-0 flex-1 py-2"
                size="lg"
              >
                부서공개
              </Button>
              <Button
                onClick={() => setDisclosure("private")}
                variant="outline"
                size="lg"
                className="min-w-0 w-0 flex-1 py-2"
              >
                비공개
              </Button>
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              기안부서
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    className="px-4 py-1.5 flex justify-between w-full"
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
                  <DropdownMenuItem>디자인팀</DropdownMenuItem>
                  <DropdownMenuItem>si사업부</DropdownMenuItem>
                  <DropdownMenuItem>경영지원팀</DropdownMenuItem>
                  <DropdownMenuItem>시스템사업부</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <div className="relative">
                             <select className="w-full appearance-none bg-background border border-border rounded-lg py-3 px-4 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                                 <option>디자인팀</option>
                             </select>
                             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                         </div> */}
          </div>
        </div>

        {/* Approval Line */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-foreground">결재선</h3>
            <button className="text-xs text-primary flex items-center gap-1">
              [업무기안] 기본결재선 <Settings size={12} />
            </button>
          </div>

          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-8">기안</span>
              <div>
                <div className="text-sm font-bold text-foreground">
                  이나라 (nrlee)
                </div>
                <div className="text-xs text-muted-foreground">디자인팀</div>
              </div>
            </div>
          </div>

          <Button variants="primary" size="lg" className="w-full">
            결재선 설정
          </Button>
          {/* Additional Settings */}
          <div className="flex min-w-0 overflow-hidden gap-2">
            <Button
              variant="outline"
              size="lg"
              className="min-w-0 w-0 flex-1 py-2"
            >
              수신설정
            </Button>
            <Button
              variant="outline"
              className="min-w-0 w-0 flex-1 py-2"
              size="lg"
            >
              참조설정
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-0 w-0 flex-1 py-2"
            >
              공람설정
            </Button>
          </div>
          {/* Info Banner */}
          <div className="bg-example-content border border-brand-blue1/20 p-5 radius-lg flex items-start gap-3">
            <div className="bg-example-content p-1.5 rounded-full">
              <Info size={18} className="text-brand-blue3" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-bold text-primary text-sm">안내</p>
              <p className="text-sm text-brand-blue4">업무기안 작성하세요.</p>
            </div>
          </div>
        </div>

        {/* Content Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-foreground">기안내용</h3>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              기안제목 <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="기안제목 입력"
              className="bg-background border-border text-foreground"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              참조 문서
            </label>
            <Button
              variant="outline"
              className="w-full border-border text-foreground h-12 hover:bg-muted flex items-center justify-center gap-1 font-normal"
            >
              문서추가 <Plus size={16} />
            </Button>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              첨부파일{" "}
              <Info
                size={16}
                className="inline ml-1 align-text-top text-muted-foreground"
              />
            </label>
            <Button
              variant="outline"
              className="w-full border-border text-foreground h-12 hover:bg-muted flex items-center justify-center gap-1 font-normal"
            >
              파일추가 <Plus size={16} />
            </Button>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              내용작성
            </label>
            <Textarea
              className="min-h-[300px] bg-background border-border text-foreground resize-none p-4"
              placeholder="내용을 입력하세요"
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-0 flex z-20">
        <button className="flex-1 bg-muted-foreground text-white font-bold h-14 text-base">
          임시저장
        </button>
        <button className="flex-1 bg-primary text-primary-foreground font-bold h-14 text-base">
          상신하기
        </button>
      </div>
    </div>
  );
};

export default MobileBusinessDraft;
