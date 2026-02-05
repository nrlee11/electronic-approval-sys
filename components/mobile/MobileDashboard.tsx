import React from "react";
import { PenLine, Send, Folder, BookOpen, AlertCircle } from "lucide-react"; // Using icons to match visually
import { StatusCount } from "../../types";

interface MobileDashboardProps {
  status: StatusCount;
  onNavigate: (page: string) => void;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ status, onNavigate }) => {
  return (
    <div className="min-h-screen bg-background pb-32 pt-20 px-5 relative">
      {/* Greeting Section */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-1 font-medium">
          안녕하세요.
        </p>
        <h2 className="text-xl font-bold text-foreground leading-tight">
          이나라 (nrlee) 님
        </h2>
      </div>

      {/* Dashboard Cards Stack */}
      <div className="space-y-3">
        {/* 1. 상신한 문서 (Blue) */}
        <div className="bg-example-content2 radius-lg p-5 flex items-center justify-between h-20 shadow-sm animate-fadeUp stagger-0">
          <div className="flex items-center gap-3 text-foreground">
            <Send size={20} className="text-muted-foreground" />
            <span className="font-bold text-sm">상신한 문서</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground">
              {status.submitted}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              건
            </span>
          </div>
        </div>

        {/* 2. 결재전 문서 (Blue) */}
        <div className="bg-example-content2 radius-lg p-5 flex items-center justify-between h-20 shadow-sm animate-fadeUp stagger-1">
          <div className="flex items-center gap-3 text-foreground">
            <Folder size={20} className="text-muted-foreground" />
            <span className="font-bold text-sm">결재전 문서</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground">
              {status.pending}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              건
            </span>
          </div>
        </div>

        {/* 3. 반려된 문서 (Light Gray) */}
        <div className="bg-muted radius-lg p-5 flex items-center justify-between h-20 shadow-sm animate-fadeUp stagger-2">
          <div className="flex items-center gap-3 text-foreground">
            <AlertCircle size={20} className="text-muted-foreground" />
            <span className="font-bold text-sm">반려된 문서</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground">
              {status.rejected}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              건
            </span>
          </div>
        </div>

        {/* 4. 수신/공람 (Light Gray) */}
        <div className="bg-muted radius-lg p-5 flex items-center justify-between h-20 shadow-sm animate-fadeUp stagger-3">
          <div className="flex items-center gap-3 text-foreground">
            <BookOpen size={20} className="text-muted-foreground" />
            <span className="font-bold text-sm">수신/공람</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-foreground">
              {status.received}
            </span>
            <span className="font-normal text-muted-foreground mx-1">/</span>
            <span className="text-lg font-bold text-foreground">
              {status.public}
            </span>
            <span className="text-sm text-muted-foreground font-medium ml-1">
              건
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center pb-20">
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-3">
          <button className="hover:text-foreground transition-colors">
            이용 약관
          </button>
          <span className="w-px h-2.5 bg-border"></span>
          <button className="hover:text-foreground transition-colors">
            개인정보처리방침
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground/60 font-light">
          &copy; leadit Corp. All rights reserved.
        </p>
      </footer>

      {/* Floating Action Button (FAB) */}
      <button 
      onClick={() => onNavigate("forms")}
      className="fixed bottom-24 right-5 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary-hover transition-colors z-50">
        <PenLine size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default MobileDashboard;
