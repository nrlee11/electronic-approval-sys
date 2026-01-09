import React from "react";
import { User, ChevronDown } from "lucide-react";
import { UserInfo } from "../types";
import logo from "../assets/Leadit_logo.svg";

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
        <div className="flex items-center gap-2 text-sm text-brand-blue1-foreground">
          <span>
            {user.name}({user.id})
          </span>
          <span className="opacity-60">|</span>
          <span>{user.department}</span>
          <div className="w-6 h-6 rounded-full bg-example-content flex items-center justify-center text-primary ml-1">
            <User size={14} fill="currentColor" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
