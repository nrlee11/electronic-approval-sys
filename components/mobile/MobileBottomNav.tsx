import React, { useState } from 'react';
import { Home, FileText, CheckSquare, Menu, PlusCircle } from 'lucide-react';

interface MobileBottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around z-50 pb-safe">
            <button 
                onClick={() => onTabChange('home')}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">홈</span>
            </button>
            <button 
                onClick={() => onTabChange('approvals')}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${activeTab === 'approvals' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <CheckSquare size={24} strokeWidth={activeTab === 'approvals' ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">결재</span>
            </button>
             <button 
                onClick={() => onTabChange('write')}
                className={`flex flex-col items-center justify-center p-2 flex-1 text-primary hover:text-primary-hover transition-colors -mt-6`}
            >
                <div className="bg-primary rounded-full p-3 shadow-lg">
                    <PlusCircle size={32} className="text-primary-foreground" />
                </div>
            </button>
             <button 
                onClick={() => onTabChange('documents')}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${activeTab === 'documents' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <FileText size={24} strokeWidth={activeTab === 'documents' ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">함</span>
            </button>
             <button 
                onClick={() => onTabChange('menu')}
                className={`flex flex-col items-center justify-center p-2 flex-1 ${activeTab === 'menu' ? 'text-primary' : 'text-muted-foreground'}`}
            >
                <Menu size={24} strokeWidth={activeTab === 'menu' ? 2.5 : 2} />
                <span className="text-[10px] mt-1 font-medium">전체</span>
            </button>
        </nav>
    );
};

export default MobileBottomNav;
