import React from 'react';
import { Menu } from 'lucide-react';

interface MobileHeaderProps {
    onMenuClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="fixed top-0 left-0 right-0 h-14 bg-background flex items-center justify-between px-4 z-50">
           <button onClick={onMenuClick} className="p-2 -ml-2 text-foreground">
                <Menu size={24} />
           </button>
           <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-foreground">전자결재</h1>
           <div className="w-8" />
        </header>
    );
};

export default MobileHeader;
