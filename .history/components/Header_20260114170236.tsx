import React from "react";
import { User, ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { UserInfo } from "../types";
import logo from "../assets/Leadit_logo.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  user: UserInfo;
}

type Position = "top" | "bottom" | "right";

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [showStatusBar, setShowStatusBar] = React.useState<boolean>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<Position>("top");

  const menuItems = [
    "전자결재",
    "일정관리",
    "연차관리",
    "인사관리",
    "평가관리",
    "게시/공지",
  ];

  return (
    <header className="h-14 bg-brand-blue1 text-brand-blue1-foreground flex items-center justify-between px-6 z-30 fixed top-0 left-0 right-0">
      <div className="flex items-center gap-8">
        <h1 className="flex items-center">
          <a href="/">
            <img src={logo} alt="전자결재" className="h-6 w-auto" />
          </a>
        </h1>
        <nav className="flex items-center gap-10">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="typo-tab text-brand-blue1-foreground hover:text-muted transition-colors cursor-pointer"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 text-sm text-brand-blue1-foreground cursor-pointer hover:opacity-80 transition-opacity">
              <span>
                {user.name}({user.id})
              </span>
              <span className="opacity-60">|</span>
              <span>{user.department}</span>
              <div className="w-6 h-6 rounded-full bg-example-content flex items-center justify-center text-primary ml-1">
                <User size={14} fill="currentColor" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px] p-0 overflow-hidden">
            {/* User Info Section */}
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-blue2 flex items-center justify-center text-brand-blue1-foreground shrink-0">
                  <User size={24} fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-base text-foreground truncate">
                      {user.name}({user.id})
                    </span>
                    <Badge variant="default" className="bg-example-content text-brand-blue1 border-brand-blue1">겸임</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 flex flex-col">
                    <span>{user.department}</span>
                    <span>프로젝트수행팀</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex alignitems-center gap-10 p-1 bg-muted border-t border-b border-border">
                <Button variant="secondary">
                  로그아웃
                </Button>
              <div className="w-[1px] bg-border my-2"></div>
                <Button variant="secondary">
                  관리자 전환
                </Button>
            </div>

            {/* Settings Section */}
            <div className="p-5 pb-2">
              <h4 className="font-bold text-sm text-foreground mb-3">설정</h4>
              <div className="space-y-4">
                <button className="w-full flex justify-between items-center text-sm text-foreground hover:text-foreground group transition-colors">
                  <span>결재선 관리</span>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </button>
                <div className="w-full flex justify-between items-center text-sm text-foreground">
                  <span>결재암호</span>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Substitute Approver */}
            <div className="p-5 pt-2">
              <button className="w-full bg-muted/50 rounded-lg p-3.5 flex justify-between items-center text-sm hover:bg-muted transition-colors text-foreground">
                <span className="font-medium">대리결재자 설정</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

const Switch = ({
  checked = false,
  onCheckedChange,
}: {
  checked?: boolean;
  onCheckedChange?: (c: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = !isChecked;
    setIsChecked(newValue);
    onCheckedChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${isChecked ? "bg-primary" : "bg-input"
        }`}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${isChecked ? "translate-x-5" : "translate-x-0"
          }`}
      />
    </button>
  );
};

export default Header;
