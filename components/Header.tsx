import React from "react";
import { User, ChevronDown } from "lucide-react";
import { UserInfo } from "../types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
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
    "일정관리",
    "연차관리",
    "인사관리",
    "평가관리",
    "게시/공지",
  ];

  return (
    <header className="h-14 bg-secondary text-secondary-foreground flex items-center justify-between px-6 z-30 fixed top-0 left-0 right-0">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold tracking-tight">전자결재</h1>
        <nav className="flex items-center gap-6">
          {menuItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm text-secondary-foreground hover:text-muted-foreground transition-colors cursor-pointer"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          <span>
            {user.name}({user.id})
          </span>
          <span className="opacity-60">|</span>
          <span>{user.department}</span>
          <div className="w-6 h-6 rounded-full bg-example-content flex items-center justify-center text-primary ml-1">
            <User size={14} fill="currentColor" />
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                className="px-4 py-1.5 flex items-center gap-20"
              >
                한국어
                <HugeiconsIcon
                  icon={Icons.ArrowDown01Icon}
                  strokeWidth={2}
                  data-icon="inline-end"
                />
              </Button>
            }
          />

          {/* 데모라서 고정폭 유지(OK). 버튼 너비 맞추고 싶으면 w-56 제거 */}
          <DropdownMenuContent className="bg-background">
            <DropdownMenuGroup>
              <DropdownMenuLabel>언어 Language</DropdownMenuLabel>

              <DropdownMenuItem>한국어</DropdownMenuItem>

              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
