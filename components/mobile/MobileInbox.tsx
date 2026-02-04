import React, { useState, useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const tabs = ["수신전", "완료된"];

const MobileInbox: React.FC<{ initialTab?: string; onBack?: () => void }> = ({
  initialTab,
  onBack,
}) => {
  const [active, setActive] = useState(initialTab || "수신전");

  useEffect(() => {
    setActive(initialTab || "수신전");
  }, [initialTab]);

  return (
    <div className="pt-16 pb-20 px-4 min-h-[calc(100vh-56px)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">수신함</h2>
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
          {/* filter icon placeholder */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-70"
          >
            <path
              d="M10 18h4v-2h-4v2zM4 6v2h16V6H4zm3 6h10v-2H7v2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>


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

      {/* Empty area */}
      <div className="mt-6">
        <EmptyState message="조회결과가 존재하지 않습니다." />
      </div>
    </div>
  );
};

export default MobileInbox;
