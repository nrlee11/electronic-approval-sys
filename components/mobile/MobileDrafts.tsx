import React, { useState, useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";

const tabs = ["상신한", "완료된", "저장된", "반려된", "반송된", "회수된"];

const MobileDrafts: React.FC<{ initialTab?: string; onBack?: () => void }> = ({
  initialTab,
  onBack,
}) => {
  const [active, setActive] = useState(initialTab || "상신한");

  useEffect(() => {
    setActive(initialTab || "상신한");
  }, [initialTab]);

  return (
    <div className="pt-16 pb-20 px-4 min-h-[calc(100vh-56px)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">기안함</h2>
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="text-sm text-muted-foreground">
            닫기
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-3 border-b border-border mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`py-2 px-3 whitespace-nowrap ${active === t ? "text-primary border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Count + Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-foreground">
          총 <span className="text-primary font-bold">0</span>건
        </div>
        <div className="flex items-center gap-2">
          <button className="py-1 px-3 bg-muted rounded-full text-sm">
            상신일:2025.10.28 ~ 2026.01.29
          </button>
          <button className="py-1 px-3 bg-muted rounded-full text-sm">
            기안양식: 전체
          </button>
        </div>
      </div>

      {/* Empty area */}
      <div className="mt-6">
        <EmptyState message="조회결과가 존재하지 않습니다." />
      </div>
    </div>
  );
};

export default MobileDrafts;
