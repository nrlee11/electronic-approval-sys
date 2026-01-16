import React, { useState } from "react";
import {
  Info,
  Plus,
  ChevronDown,
  Paperclip,
  FileSearch,
  Trash2,
} from "lucide-react";
import { PenLine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import ApprovalLineModal from "@/components/ApprovalLineModal";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DocumentDetailProps {
  onBack: () => void;
}

const DocumentDetail: React.FC<DocumentDetailProps> = ({ onBack }) => {

        const sampleData = [
    {
      docId: "결재",
      formType: "이나라(nrlee) | 디자인팀",
      title: "승인",
      drafter: "2025.12.26 17:31",
      submittedAt: "승인하였습니다.",
      completedAt: <button className="text-muted-foreground hover:text-foreground"><PenLine className="h-4 w-4" /></button>,
    },
  ];
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h2 className="typo-title text-foreground mb-6">디자인시스템 개발 요청</h2>

      {/* Info Table */}
      <div className="overflow-hidden border border-border">
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
                공개여부
              </th>
              <td className="p-3.5 border-r border-border">부서공개</td>
              <td className="p-3.5">
                <div className="relative">           
                </div>
              </td>
            </tr>
            <tr>
              <th className="p-3.5 text-left border-r border-border">기안자</th>
              <td className="p-3.5 border-r border-border">이나라 (nrlee)</td>
              <th className="p-3.5 text-left border-r border-border">
                기안부서
              </th>
              <td className="p-3.5">
                <div className="relative">
                
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Approval Line Section */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
          <h3 className="text-lg font-bold text-foreground">
            결재선
          </h3>

        </div>
        <div className="flex gap-4">
          {/* Card: Drafter */}
          <div className="w-36 border border-border rounded-md shadow-sm overflow-hidden bg-card">
            <div className="bg-muted text-sm font-bold text-center py-1.5 border-b border-border text-muted-foreground uppercase tracking-tighter">
              기안
            </div>
            <div className="h-28 flex flex-col items-center justify-center text-center p-3">
              <span className="text-sm font-bold text-foreground">전세호</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                (jun)
              </span>
              <span className="text-[11px] text-muted-foreground font-medium">
                SI사업부
              </span>
              <div className="w-full h-px bg-border my-1"></div>
              <span className="text-xs">25.12.26 17:31</span>
            </div>
          </div>
          {/* Card: Drafter */}
          <div className="w-36 border border-border rounded-md shadow-sm overflow-hidden bg-card">
            <div className="bg-muted text-brand-blue1 text-sm font-bold text-center py-1.5 border-b border-border uppercase tracking-tighter">
              결재
            </div>
            <div className="h-28 flex flex-col items-center justify-center text-center p-3">
              <span className="text-sm font-bold text-foreground">이나라</span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                (nrlee)
              </span>
                            <span className="text-[11px] text-muted-foreground font-medium">
                디자인팀
              </span>
              <div className="w-full h-px bg-border my-1"></div>
              <span className="text-brand-blue1 text-xs">승인 25.12.26 17:31</span>
            </div>
          </div>

        </div>
      </section>

      {/* Reference */}
      <div className="mb-10">
        <div className="flex items-center gap-2 cursor-pointer pb-2 border-b border-border">
            <span className="text-sm font-bold">참조</span>
            <span className="text-sm font-bold text-primary">1</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="bg-example-content px-4 py-4">
            <span className="inline-flex items-center bg-muted/40 px-2 py-1 rounded text-xs text-foreground">
              박현우(hwpark) | 개발팀
            </span>
        </div>
      </div>


      {/* Draft Content */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
          <h3 className="text-lg font-bold text-foreground">기안내용</h3>
        </div>
        <div className="border border-border rounded-sm">
          <div className="grid grid-cols-12 border-b border-border">
            <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground border-r border-border flex items-center justify-center">기안제목</div>
            <div className="col-span-10 p-3 text-sm flex items-center font-medium">디자인시스템 개발 요청</div>
          </div>
          <div className="p-6 text-sm min-h-[300px]">
            <p className="mb-4">안녕하세요.<br />디자인시스템 개발 요청 합니다.</p>
          </div>
        </div>
      </div>

             {/* Approval Comments */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4 border-b border-border pb-2">
          <h3 className="text-lg font-bold text-foreground">결재의견</h3>
        </div>
                      <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>결재구분</TableHead>
                    <TableHead>결재자</TableHead>
                    <TableHead>결재 상태</TableHead>
                    <TableHead>일시</TableHead>
                    <TableHead>결재의견</TableHead>
                    <TableHead>편집</TableHead>
                  </TableRow>
                </TableHeader>
                   <TableBody>
                  {sampleData.map((item, index) => (
                    <React.Fragment key={index}>
                    <TableRow key={index} className="border-b border-border">
                      <TableCell className="text-center">{item.docId}</TableCell>
                      <TableCell className="text-center">
                        {item.formType}
                      </TableCell>
                      <TableCell className="text-left">
                        <span
                          className="cursor-pointer underline underline-offset-1"
                          onClick={() => {
                            window.location.hash = "#/document-detail";
                          }}
                        >
                          {item.title}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.drafter}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.submittedAt}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.completedAt}
                      </TableCell>
                    </TableRow>
                    <TableRow key={index} className="border-b border-border">
                      <TableCell className="text-center">{item.docId}</TableCell>
                      <TableCell className="text-center">
                        {item.formType}
                      </TableCell>
                      <TableCell className="text-left">
                        <span
                          className="cursor-pointer underline underline-offset-1"
                          onClick={() => {
                            window.location.hash = "#/document-detail";
                          }}
                        >
                          {item.title}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.drafter}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.submittedAt}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.completedAt}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                  ))}   

                </TableBody>
              </Table>
      </div>

    </div>
  );
};

export default DocumentDetail;
