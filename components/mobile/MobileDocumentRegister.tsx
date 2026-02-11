import React, { useState } from "react";
import EmptyState from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import FilterModal from "./FilterModal";

const sample = {
  id: <Badge className="text-xs">업무협조-25-000001</Badge>,
  title: "디자인시스템 개발 요청",
  author: "전세호(jun) | SI사업부",
  completed: "2025.12.26",
  dateShort: "25.12.26",
};

const MobileDocumentRegister: React.FC<{ onBack?: () => void }> = ({
  onBack,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="pt-16 pb-20 px-4 min-h-[calc(100vh-56px)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">문서대장</h2>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-sm text-muted-foreground">
            닫기
          </button>
        </div>
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

      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="py-2 px-3 bg-muted rounded-md text-sm">
            상신일: 2025.10.28 ~ 2026.01.29
          </span>
          <span className="py-2 px-3 bg-muted rounded-md text-sm">
            기안양식: 전체
          </span>
        </div>
      </div>

      {/* subtle divider */}
      <div className="border-t border-border/60 mb-4" />

      {/* List */}
      <div>
        <button
          onClick={() => {
            try {
              window.location.hash = "#/document-detail";
            } catch (e) {}
          }}
          className="w-full text-left p-4 radius-lg border border-border flex items-start justify-between bg-popover"
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

      <div className="mt-6">
        {/* keep page length visually similar to screenshot */}
      </div>
    </div>
  );
};

export default MobileDocumentRegister;
