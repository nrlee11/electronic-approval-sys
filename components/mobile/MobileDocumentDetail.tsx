import React, { useState } from "react";
import {
  ChevronLeft,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileDocumentDetailProps {
  onBack: () => void;
}

const MobileDocumentDetail: React.FC<MobileDocumentDetailProps> = ({
  onBack,
}) => {
  const [showApprovalLine, setShowApprovalLine] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showOpinions, setShowOpinions] = useState(true);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background border-b border-border flex items-center justify-between px-4 h-14 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-muted-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold text-foreground truncate max-w-[200px]">
          문서대장
        </h1>
        <div className="w-8" />
      </header>

      <div className="p-5 space-y-6">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="default">진행중</Badge>
          <span className="text-xs text-muted-foreground">
            업무협조-25-000001
          </span>
        </div>
        {/* Title */}
        <div>
          <h2 className="text-xl font-semibold text-foreground leading-tight mb-2">
            디자인시스템 개발 요청
          </h2>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-y-3 text-sm text-muted-foreground border-t border-border pt-4">
          <div className="text-muted-foreground">기안양식</div>
          <div className="text-foreground text-right">업무협조</div>

          <div className="text-muted-foreground">보존연한</div>
          <div className="text-foreground text-right">5 년</div>

          <div className="text-muted-foreground">공개여부</div>
          <div className="text-foreground text-right">부서공개</div>
        </div>

        {/* Approval Line Preview */}
        <div className="">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-foreground">결재선</h3>
            <button
              onClick={() => setShowApprovalLine((v) => !v)}
              className="text-sm text-muted-foreground"
            >
              {showApprovalLine ? "결재선 접기" : "결재선 펼치기"}
            </button>
          </div>

          {showApprovalLine && (
            <div className="bg-muted rounded-xl p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-sm font-bold text-muted-foreground">
                    기안
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      전세호 (jun) | SI사업부
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      2025.12.26 17:28
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-3 border border-border flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-sm font-bold text-muted-foreground">
                      결재
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        이나라 (nrlee) | SI사업부
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        2025.12.26 17:28
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="primary">승인</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reference */}
        <div className="mt-4">
          <button className="w-full flex items-center justify-between p-4 bg-background border border-border rounded-md">
            <div className="text-sm text-muted-foreground">
              참조 <span className="text-foreground font-medium">1</span>
            </div>
            <ChevronRight />
          </button>
        </div>

        {/* Draft Content (기안내용) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
            <h3 className="text-sm font-bold text-foreground">기안내용</h3>
            <button
              onClick={() => setShowContent((v) => !v)}
              className="text-muted-foreground"
            >
              {showContent ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          {showContent && (
            <div className="bg-background border border-border radius-md p-4">
              <p className="text-foreground leading-relaxed mb-4">
                안녕하세요.
                <br />
                디자인시스템 개발 요청 합니다.
              </p>
            </div>
          )}
        </div>

        {/* Opinions (결재의견) */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
            <h3 className="text-sm font-bold text-foreground">
              결재의견{" "}
              <span className="text-muted-foreground font-normal">1</span>
            </h3>
            <button
              onClick={() => setShowOpinions((v) => !v)}
              className="text-muted-foreground"
            >
              {showOpinions ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          {showOpinions && (
            <div className="bg-white border border-border rounded-md p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="primary">승인</Badge>
                <div className="text-xs text-muted-foreground">
                  2025.12.26 17:31
                </div>
              </div>

              <div className="text-foreground mb-3">승인하였습니다.</div>

              <div className="text-sm text-muted-foreground">
                이나라 (nrlee) | 디자인팀
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDocumentDetail;
