import React, { useState, useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import FilterModal from "./FilterModal";

const tabs = ["결재전", "진행중", "완료된", "반려된"];

const MobileApprovals: React.FC<{
  initialTab?: string;
  onBack?: () => void;
}> = ({ initialTab, onBack }) => {
  const [active, setActive] = useState(initialTab || "결재전");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setActive(initialTab || "결재전");
  }, [initialTab]);

  return (
    <div className="pt-16 pb-20 px-4 min-h-[calc(100vh-56px)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">결재함</h2>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-sm text-muted-foreground">
            닫기
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full gap-3 overflow-x-auto border-b border-border mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`flex-1 py-2 px-3 whitespace-nowrap ${active === t ? "text-primary border-b-2 border-primary font-semibold text-center" : "text-muted-foreground text-center"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => {
            /* future: open quick filter */
          }}
          className="text-sm text-primary font-medium hover:underline"
        >
          총 <span className="text-primary font-bold">1</span>건
        </button>
        <div className="text-sm text-muted-foreground">
          <button
            onClick={() => setShowFilter(true)}
            className="opacity-70 p-1"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18h4v-2h-4v2zM4 6v2h16V6H4zm3 6h10v-2H7v2z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

        <FilterModal
          open={showFilter}
          onClose={() => setShowFilter(false)}
          onApply={() => {}}
        />

      {/* Count + Filters */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="py-2 px-3 bg-muted rounded-md text-sm">
            상신일:2025.10.28 ~ 2026.01.29
          </span>
          <span className="py-2 px-3 bg-muted rounded-md text-sm">
            기안양식: 전체
          </span>
        </div>
      </div>
      {/* subtle divider */}
      <div className="border-t border-border mb-4" />

      {/* Content */}
      <div className="mt-6">
        {active === "완료된" ? (
          <div className="space-y-3">
            {[
              {
                id: <Badge className="text-xs">기안-2025-001</Badge>,
                title: "디자인시스템 개발 요청",
                author: "전세호(jun) | SI사업부",
                completed: "2025.01.15",
                dateShort: "25.12.26",
              },
              {
                id: <Badge className="text-xs">기안-2025-001</Badge>,
                title: "디자인시스템 개발 요청",
                author: "전세호(jun) | SI사업부",
                completed: "2025.01.12",
                dateShort: "25.12.16",
              },
            ].map((sample, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    try {
                      window.location.hash = "#/document-detail";
                    } catch (e) {}
                  }}
                  className="w-full text-left p-4 radius-lg border border-border flex items-start justify-between bg-popover rounded-lg"
                >
                  <div className="flex-1">
                    <div className="mb-2">
                      <span>{sample.id}</span>
                    </div>
                    <div className="text-base font-semibold text-foreground mb-1">
                      {sample.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      기안자: {sample.author}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      완료: {sample.completed}
                    </div>
                  </div>
                  <div className="ml-4 text-sm text-muted-foreground">
                    {sample.dateShort}
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="조회결과가 존재하지 않습니다." />
        )}
      </div>
    </div>
  );
};

export default MobileApprovals;
