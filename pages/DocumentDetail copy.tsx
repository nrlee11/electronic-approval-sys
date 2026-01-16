import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, ChevronDown, PenLine } from "lucide-react";

interface DocumentDetailProps {
  onBack: () => void;
}

const DocumentDetail: React.FC<DocumentDetailProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background font-sans text-foreground">
          <div>
            {/* Header */}
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">디자인시스템 개발 요청</h1>
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Printer className="h-4 w-4 text-muted-foreground" />
              </Button>
            </header>

            {/* Info Table */}
            <div className="border-t border-b border-border mb-10">
              <div className="grid grid-cols-12 border-b border-border">
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center">기안양식</div>
                <div className="col-span-4 p-3 text-sm flex items-center">업무협조</div>
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center border-l border-border">문서번호</div>
                <div className="col-span-4 p-3 text-sm flex items-center">업무협조-25-000001</div>
              </div>
              <div className="grid grid-cols-12 border-b border-border">
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center">보존연한</div>
                <div className="col-span-4 p-3 text-sm flex items-center">5년</div>
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center border-l border-border">공개여부</div>
                <div className="col-span-4 p-3 text-sm flex items-center">부서공개</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center">기안자</div>
                <div className="col-span-4 p-3 text-sm flex items-center">전세호(jun)</div>
                <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground flex items-center border-l border-border">기안부서</div>
                <div className="col-span-4 p-3 text-sm flex items-center">SI사업부</div>
              </div>
            </div>

            {/* Approval Line */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-foreground">결재선</h3>
                <Button variant="outline" size="sm" className="h-8 text-xs">공람 설정</Button>
              </div>
              <div className="flex gap-4 border-t border-b border-border py-4">
                 {/* Card 1: Drafter */}
                <div className="border border-border rounded w-32 flex flex-col text-center overflow-hidden">
                  <div className="bg-muted/30 py-1 text-xs text-muted-foreground border-b border-border">기안</div>
                  <div className="flex-1 flex flex-col justify-center items-center py-3 px-2 gap-0.5">
                    <span className="text-sm font-medium truncate w-full">전세호</span>
                    <span className="text-xs text-muted-foreground truncate w-full">(jun)</span>
                    <span className="text-xs text-muted-foreground truncate w-full">SI사업부</span>
                  </div>
                   <div className="bg-muted/10 py-1 text-[10px] text-muted-foreground border-t border-border">
                    25.12.26 17:28
                  </div>
                </div>
                 {/* Card 2: Approver (Approved) */}
                 <div className="border border-border rounded w-32 flex flex-col text-center overflow-hidden">
                  <div className="bg-muted/30 py-1 text-xs text-muted-foreground border-b border-border">결재</div>
                   <div className="flex-1 flex flex-col justify-center items-center py-3 px-2 gap-0.5">
                    <span className="text-sm font-medium truncate w-full">이나라</span>
                    <span className="text-xs text-muted-foreground truncate w-full">(nrlee)</span>
                    <span className="text-xs text-muted-foreground truncate w-full">디자인팀</span>
                  </div>
                  <div className="bg-muted/10 py-1 text-[10px] text-blue-600 font-medium border-t border-border flex justify-center items-center gap-1">
                    <span>승인</span>
                    <span className="font-normal text-muted-foreground">25.12.26 17:31</span>
                  </div>
                </div>
              </div>
            </div>

             {/* Reference */}
             <div className="mb-10">
               <div className="flex items-center gap-2 cursor-pointer pb-2 border-b border-border">
                  <span className="text-sm font-bold">참조</span>
                  <span className="text-sm font-bold text-primary">1</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
               </div>
               <div className="py-4">
                  <span className="inline-flex items-center bg-muted/40 px-2 py-1 rounded text-xs text-foreground">
                    박현우(hwpark) | 개발팀
                  </span>
               </div>
             </div>

             {/* Draft Content */}
             <div className="mb-10">
                <h3 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-foreground">기안내용</h3>
                <div className="border border-border rounded-sm">
                   <div className="grid grid-cols-12 border-b border-border">
                      <div className="col-span-2 bg-muted/40 p-3 text-sm font-medium text-muted-foreground border-r border-border flex items-center justify-center">기안제목</div>
                      <div className="col-span-10 p-3 text-sm flex items-center font-medium">디자인시스템 개발 요청</div>
                   </div>
                   <div className="p-6 text-sm min-h-[300px]">
                      <p className="mb-4">안녕하세요.<br />디자인시스템 개발 요청 합니다.</p>
                      
                       {/* Placeholder for the smiley image */}
                      <div className="w-40 h-40 rounded-full bg-yellow-300 border-4 border-yellow-400 flex items-center justify-center shadow-lg relative overflow-hidden">
                           <div className="absolute top-10 left-8 w-4 h-6 bg-black rounded-full opacity-80"></div>
                           <div className="absolute top-10 right-8 w-4 h-6 bg-black rounded-full opacity-80"></div>
                           <div className="absolute bottom-8 left-8 right-8 h-12 border-b-4 border-black rounded-[50%]"></div>
                           <div className="absolute top-8 left-4 w-6 h-6 bg-white rounded-full opacity-40 blur-sm"></div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Approval Comments */}
             <div className="mb-12">
                <h3 className="text-sm font-bold text-foreground mb-3 pb-2 border-b border-primary">결재의견</h3>
                <table className="w-full text-sm">
                   <thead>
                      <tr className="bg-muted/40 text-muted-foreground border-b border-border">
                         <th className="py-2 px-4 font-medium text-center w-24">결재구분</th>
                         <th className="py-2 px-4 font-medium text-center w-40">결재자</th>
                         <th className="py-2 px-4 font-medium text-center w-20">결재상태</th>
                         <th className="py-2 px-4 font-medium text-center w-40">일시</th>
                         <th className="py-2 px-4 font-medium text-left">결재의견</th>
                         <th className="py-2 px-4 font-medium text-center w-16">편집</th>
                      </tr>
                   </thead>
                   <tbody>
                      <tr className="border-b border-border">
                         <td className="py-3 px-4 text-center">결재</td>
                         <td className="py-3 px-4 text-center">이나라(nrlee) | 디자인팀</td>
                         <td className="py-3 px-4 text-center text-blue-600 font-medium">승인</td>
                         <td className="py-3 px-4 text-center font-light text-muted-foreground">2025.12.26 17:31</td>
                         <td className="py-3 px-4 text-left">승인하였습니다.</td>
                         <td className="py-3 px-4 text-center">
                            <button className="text-muted-foreground hover:text-foreground">
                               <PenLine className="h-4 w-4" />
                            </button>
                         </td>
                      </tr>
                   </tbody>
                </table>
             </div>

             {/* Footer Actions */}
             <div className="mb-20">
                <Button variant="outline" className="w-24 border-border" onClick={onBack}>목록</Button>
             </div>

          </div>

    </div>
  );
};

export default DocumentDetail;
