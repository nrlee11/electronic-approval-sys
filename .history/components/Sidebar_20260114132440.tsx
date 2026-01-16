import React, { useState } from "react";
import { ChevronDown, Edit2, ChevronLeft, ChevronRight } from "lucide-react";

interface NavItemProps {
  label: string;
  hasSub?: boolean;
  subItems?: string[];
  onSubItemClick?: (subItem: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  hasSub = false,
  subItems = [],
  onSubItemClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li>
      <button
        onClick={() => hasSub && setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-3 text-sm text-muted-foreground hover:bg-muted/60 hover:text-primary transition-all group hover:underline"
      >
        <span className="font-medium">{label}</span>
        {hasSub && (
          <ChevronRight
            size={16}
            className={`text-muted-foreground group-hover:text-primary transition-transform ${isExpanded ? "rotate-90" : ""
              }`}
          />
        )}
      </button>
      {hasSub && isExpanded && subItems.length > 0 && (
        <ul className="bg-muted">
          {subItems.map((subItem) => (
            <li key={subItem}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubItemClick?.(subItem);
                  // setIsExpanded(false);  // 닫히지 않게
                }}
                className="w-full flex items-center px-10 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-muted transition-all"
              >
                <span className="font-medium">{subItem}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar: React.FC<{ onNavigate?: (page: string) => void }> = ({
  onNavigate,
}) => {
  const handleSubItemClick = (subItem: string) => {
    if (subItem === "상신한") {
      // update URL hash for simple routing and call optional callback
      try {
        window.location.hash = "#/submitted";
      } catch (e) {
        /* ignore in non-browser environments */
      }
      onNavigate?.("submitted");
      return;
    }

    if (subItem === "완료된") {
      try {
        window.location.hash = "#/completed";
      } catch (e) { }
      onNavigate?.("completed");
      return;
    }

    if (subItem === "저장된") {
      try {
        window.location.hash = "#/saved";
      } catch (e) { }
      onNavigate?.("saved");
      return;
    }

    if (subItem === "반려된") {
      try {
        window.location.hash = "#/rejected";
      } catch (e) { }
      onNavigate?.("rejected");
      return;
    }

    if (subItem === "반송된") {
      try {
        window.location.hash = "#/returned";
      } catch (e) { }
      onNavigate?.("returned");
      return;
    }

    if (subItem === "회수된") {
      try {
        window.location.hash = "#/retrieved";
      } catch (e) { }
      onNavigate?.("retrieved");
      return;
    }

    if (subItem === "결재전") {
      try {
        window.location.hash = "#/approval";
      } catch (e) {
        /* ignore in non-browser environments */
      }
      onNavigate?.("approval");
      return;
    }
  };

  return (
    <aside className="w-60 bg-background border-r border-border flex flex-col fixed top-14 left-0 bottom-0 z-20 transition-transform">
      {/* Collapse Toggle */}
      <button className="absolute -right-3 top-2 bg-background border border-border p-0.5 rounded-full shadow-sm hover:bg-muted/60 z-10">
        <ChevronLeft size={14} className="text-muted-foreground" />
      </button>

      {/* Primary Action */}
      <div className="border-b border-border">
        <button
          onClick={() => {
            try {
              window.location.hash = "#/forms";
            } catch (e) {
              /* ignore in non-browser environments */
            }
            onNavigate?.("forms");
          }}
          className="w-full h-[79px] flex items-center justify-between bg-background text-foreground font-bold px-4 rounded hover:bg-muted/60 border border-transparent hover:border-border transition-all shadow-sm"
        >
          <span>기안작성</span>
          <Edit2 size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto no-scrollbar py-2">
        <ul className="space-y-0.5">
          <NavItem
            label="기안함"
            hasSub
            subItems={["상신한", "완료된", "저장된", "반려된", "반송된", "회수된"]}
            onSubItemClick={handleSubItemClick}
          />
          <NavItem
            label="결재함"
            hasSub
            subItems={["결재전"]}
            onSubItemClick={handleSubItemClick}
          />
        </ul>
      </nav>

      {/* Footer Nav */}
      {/* <div className="p-6 border-t border-border">
        <h4 className="text-xs font-bold text-foreground mb-4">이용안내</h4>
        <ul className="space-y-3">
          <li>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-primary hover:underline"
            >
              사용자 매뉴얼
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-primary hover:underline"
            >
              고객센터
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-primary hover:underline"
            >
              문의하기
            </a>
          </li>
        </ul>
      </div> */}
    </aside>
  );
};

export default Sidebar;
