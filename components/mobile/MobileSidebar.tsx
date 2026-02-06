import React, { useState } from "react";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((i) => i !== menu) : [...prev, menu],
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[60]" onClick={onClose} />

      <aside className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-background z-[70] overflow-y-auto animate-in slide-in-from-left duration-300 border-r border-border">
        {/* Profile */}
        <div className="p-5 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-example-content flex items-center justify-center text-primary ml-1">
                <User size={14} fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">
                    이나라 (nrlee)
                  </span>
                  <Badge className="bg-example-content text-brand-blue1 border-brand-blue1">
                    겸임
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mt-1 flex flex-col">
                  <span>디자인팀</span>
                  <span>프로젝트수행팀</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full bg-muted border-border text-muted-foreground hover:bg-muted h-10"
          >
            로그아웃
          </Button>
        </div>

        {/* Action */}
        <div className="p-4 pb-2">
          <Button
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground h-10 text-md font-bold"
            onClick={() => {
              onNavigate?.("forms");
              onClose();
            }}
          >
            기안작성
          </Button>
        </div>

        {/* Nav */}
        <nav className="p-4">
          <ul>
            <li>
              <button
                onClick={() => {
                  onNavigate?.("dashboard");
                  onClose();
                }}
                className="w-full text-left px-3 py-3 text-foreground font-bold hover:bg-muted transition-colors border-b border-border"
              >
                홈
              </button>
            </li>

            <MenuItem
              label="기안함"
              section="drafts"
              isExpanded={expandedMenus.includes("drafts")}
              onToggle={() => toggleMenu("drafts")}
              subItems={[
                "상신한",
                "완료된",
                "저장된",
                "반려된",
                "반송된",
                "회수된",
              ]}
            />

            <MenuItem
              label="결재함"
              section="approvals"
              isExpanded={expandedMenus.includes("approvals")}
              onToggle={() => toggleMenu("approvals")}
              subItems={["결재전", "진행중", "완료된", "반려된"]}
            />

            <MenuItem
              label="수신함"
              section="inbox"
              isExpanded={expandedMenus.includes("inbox")}
              onToggle={() => toggleMenu("inbox")}
              subItems={["수신전", "완료된"]}
            />

            <li>
              <button
                onClick={() => {
                  onNavigate?.("document-register");
                  onClose();
                }}
                className="w-full text-left px-3 py-3 border-b border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                문서대장
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

const MenuItem: React.FC<{
  label: string;
  section?: string;
  isExpanded: boolean;
  onToggle: () => void;
  subItems: string[];
}> = ({ label, section, isExpanded, onToggle, subItems }) => {
  const handleClick = (item: string) => {
    let page = "";

    if (section === "drafts") {
      const draftMap: Record<string, string> = {
        상신한: "submitted",
        완료된: "completed",
        저장된: "saved",
        반려된: "rejected",
        반송된: "returned",
        회수된: "retrieved",
      };
      page = draftMap[item] || "";
    } else if (section === "approvals") {
      const approvalMap: Record<string, string> = {
        결재전: "pending-approval",
        진행중: "approval-progress",
        완료된: "approval-completed",
        반려된: "approval-rejected",
      };
      page = approvalMap[item] || "";
    } else if (section === "inbox") {
      const inboxMap: Record<string, string> = {
        수신전: "pending-receipt",
        완료된: "receipt-completed",
      };
      page = inboxMap[item] || "";
    }

    if (page) {
      const ev = new CustomEvent("mobile:navigate", { detail: { page } });
      window.dispatchEvent(ev);
    }
  };

  return (
    <li>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-3 text-foreground hover:bg-muted group transition-colors border-b border-border"
      >
        <span className="font-medium">{label}</span>
        {isExpanded ? (
          <ChevronUp size={20} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={20} className="text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <ul className="bg-muted py-2 px-4 space-y-1">
          {subItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => handleClick(item)}
                className="w-full text-left py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default MobileSidebar;
