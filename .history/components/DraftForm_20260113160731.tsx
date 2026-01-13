import React, { useState } from "react";
import {
  Info,
  Plus,
  ChevronDown,
  Paperclip,
  FileSearch,
  Trash2,
} from "lucide-react";
import { PublicStatus } from "../types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";

const DraftForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [publicStatus, setPublicStatus] = useState<PublicStatus>(
    PublicStatus.DEPARTMENT
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h2 className="typo-title text-foreground mb-6">업무 기안</h2>

      {/* Info Table */}
      <div className="overflow-hidden rounded-md border border-border">
        <table className="w-full text-sm border-collapse table-fixed">
          <colgroup>
            <col className="w-36 bg-muted font-medium text-muted-foreground" />
            <col className="w-1/2" />
            <col className="w-36 bg-muted font-medium text-muted-foreground" />
            <col className="w-1/2" />
          </colgroup>
          <tbody>
            <tr className="border-b border-border">
              <th className="p-3.5 text-left border-r border-border">
                기안양식
              </th>
              <td className="p-3.5 border-r border-border">업무기안</td>
              <th className="p-3.5 text-left border-r border-border">
                문서번호
              </th>
              <td className="p-3.5 text-muted-foreground italic font-light">
                - 자동 생성 -
              </td>
            </tr>
            <tr className="border-b border-border">
              <th className="p-3.5 text-left border-r border-border">
                보존연한
              </th>
              <td className="p-3.5 border-r border-border">5년</td>
              <th className="p-3.5 text-left border-r border-border">
                공개여부 <span className="text-destructive">*</span>
              </th>
              <td className="p-3.5">
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          className="px-4 py-1.5 flex  items-center gap-4 w-full justify-between"
                        >
                          부서공개
                          <HugeiconsIcon
                            icon={Icons.ArrowDown01Icon}
                            strokeWidth={2}
                            data-icon="inline-end"
                          />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="bg-background min-w-[var(--anchor-width)] max-w-[calc(100vw-2rem)]">
                      <DropdownMenuGroup className="w-full justify-between">
                        <DropdownMenuLabel className="px-2 py-1 text-xs text-muted-foreground">
                          전체
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="w-full justify-between">
                          부서공개
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full justify-between">
                          비공개
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full justify-between">
                          전사공개
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
            <tr>
              <th className="p-3.5 text-left border-r border-border">
                기안자
              </th>
              <td className="p-3.5 border-r border-border">이나라 (nrlee)</td>
              <th className="p-3.5 text-left border-r border-border">
                기안부서 <span className="text-destructive">*</span>
              </th>
              <td className="p-3.5">
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          variant="outline"
                          className="px-4 py-1.5 flex  items-center gap-4 w-full justify-between"
                        >
                          디자인팀
                          <HugeiconsIcon
                            icon={Icons.ArrowDown01Icon}
                            strokeWidth={2}
                            data-icon="inline-end"
                          />
                        </Button>
                      }
                    />
                    <DropdownMenuContent className="bg-background min-w-[var(--anchor-width)] max-w-[calc(100vw-2rem)]">
                      <DropdownMenuGroup className="w-full justify-between">
                        <DropdownMenuLabel className="px-2 py-1 text-xs text-muted-foreground">
                          전체
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="w-full justify-between">
                          디자인팀
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full justify-between">
                          경영지원팀
                        </DropdownMenuItem>
                        <DropdownMenuItem className="w-full justify-between">
                          개발팀
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Approval Line Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            결재선 <span className="text-destructive">*</span>
          </h3>

          <Button>결재선 설정</Button>
        </div>
        <div className="flex gap-4">
          {/* Card: Drafter */}
          <div className="w-36 border border-border rounded-md shadow-sm overflow-hidden bg-card">
            <div className="bg-muted text-[10px] font-bold text-center py-1.5 border-b border-border text-muted-foreground uppercase tracking-tighter">
              기안
            </div>
            <div className="h-28 flex flex-col items-center justify-center text-center p-3">
              <span className="text-sm font-bold text-foreground">이나라</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">(nrlee)</span>
              <div className="w-full h-px bg-border my-2"></div>
              <span className="text-[11px] text-muted-foreground font-medium">
                디자인팀
              </span>
            </div>
          </div>

          {/* Empty Placeholder for next approver */}
          <div className="w-36 border border-dashed border-input rounded-md flex flex-col items-center justify-center text-muted-foreground/40 hover:border-brand-blue1/50 hover:text-brand-blue1 transition-colors cursor-pointer group">
            <Plus size={20} className="mb-1" />
            <span className="text-[10px] font-medium">결재자 추가</span>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <div className="bg-example-content border border-brand-blue1/20 p-5 rounded-lg flex items-start gap-3">
        <div className="bg-example-content p-1.5 rounded-full">
          <Info size={18} className="text-brand-blue3" />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="font-bold text-brand-blue5 text-sm">작성 안내</p>
          <p className="text-sm text-brand-blue4">
            업무기안 내용을 상세히 기술해 주세요. 상신 후에는 수정이
            불가능합니다.
          </p>
        </div>
      </div>

      {/* Draft Content */}
      <section className="space-y-8">
        <div className="border-b border-border pb-2">
          <h3 className="text-lg font-bold text-foreground">기안내용</h3>
        </div>

        <div className="space-y-6">
          {/* Title Input */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-muted-foreground">
              기안제목 <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Input className="flex-1" placeholder="기안제목을 입력해 주세요" type="text" />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 50))}
                className="w-full border-border rounded-lg py-2.5 px-4 text-sm focus:ring-primary focus:border-primary placeholder-muted-foreground/50 shadow-sm"
                placeholder="기안제목을 입력해 주세요"
                type="text"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground font-medium">
                {title.length}/49
              </span>
            </div>
          </div>

          {/* Attachments */}
          <div className="grid grid-cols-[100px_1fr] items-start gap-4">
            <label className="text-sm font-semibold text-muted-foreground mt-2">
              파일첨부
            </label>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <button className="w-12 h-12 flex flex-col items-center justify-center border-2 border-dashed border-input rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-all bg-muted/50">
                  <Paperclip size={18} />
                </button>
                {/* Simulated file list */}
                <div className="h-12 flex items-center bg-muted border border-border rounded-lg px-3 gap-3">
                  <div className="bg-brand-blue1/10 text-brand-blue3 p-1.5 rounded-md">
                    <Paperclip size={14} />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground max-w-[150px] truncate">
                    업무협조문_참조자료.pdf
                  </span>
                  <button className="text-muted-foreground hover:text-destructive">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg border border-border">
                <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed list-disc pl-3">
                  <li>
                    20mb 미만의 이미지(jpg, png) 또는 문서(doc, pdf, xls) 파일만
                    첨부 가능 (최대 10개)
                  </li>
                  <li>
                    개인정보가 포함된 문서를 첨부 시 반드시 마스킹 처리해
                    주세요.
                  </li>
                  <li>
                    첨부문서 내 특수기호가 포함되어 있는 경우 비정상적으로
                    노출될 수 있습니다.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reference Docs */}
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <label className="text-sm font-semibold text-muted-foreground">
              참조문서
            </label>
            <button className="w-10 h-10 flex items-center justify-center border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary bg-background transition shadow-sm">
              <FileSearch size={18} />
            </button>
          </div>

          {/* Editor Placeholder */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-muted-foreground">
              본문 <span className="text-destructive">*</span>
            </label>
            <div className="border border-border rounded-xl overflow-hidden shadow-sm flex flex-col bg-card">
              {/* Fake Toolbar */}
              <div className="bg-muted border-b border-border px-4 py-2.5 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1 border-r border-border pr-3">
                  <button className="p-1.5 hover:bg-accent rounded transition font-bold text-foreground">
                    B
                  </button>
                  <button className="p-1.5 hover:bg-accent rounded transition italic text-foreground">
                    I
                  </button>
                  <button className="p-1.5 hover:bg-accent rounded transition underline text-foreground">
                    U
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-accent rounded transition">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-1.5 hover:bg-accent rounded transition">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Content Area */}
              <div
                className="min-h-[400px] p-8 focus:outline-none overflow-y-auto no-scrollbar text-sm leading-relaxed text-foreground bg-card"
                contentEditable="true"
              >
                <p className="text-muted-foreground/40 italic">
                  여기에 기안 내용을 상세히 입력해 주세요...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DraftForm;
