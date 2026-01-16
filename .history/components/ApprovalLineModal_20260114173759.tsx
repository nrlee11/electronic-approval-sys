import React, { useState } from "react";
import { X, Search, ChevronRight, ChevronDown, User, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ApprovalLineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock Data for Organization Tree
const orgData = [
  {
    id: "team_project",
    name: "프로젝트수행팀",
    isFolder: true,
    isOpen: true,
    children: [
      { id: "user_dywon", name: "원도윤(dywon)", isFolder: false, team: "프로젝트수행팀" },
      { id: "user_hwpark", name: "박현우(hwpark)", isFolder: false, team: "프로젝트수행팀" },
      { id: "user_jun", name: "전세호(jun)", isFolder: false, team: "프로젝트수행팀" },
      { id: "user_nrlee", name: "이나라(nrlee)", isFolder: false, team: "프로젝트수행팀" },
      { id: "user_ykkim", name: "김유경(ykkim)", isFolder: false, team: "프로젝트수행팀" },
      { id: "user_ywlee", name: "이양원(ywlee)", isFolder: false, team: "프로젝트수행팀" },
    ],
  },
  {
    id: "team_dev",
    name: "개발팀",
    isFolder: true,
    isOpen: true,
    children: [
      { id: "user_dev1", name: "김개발(dev1)", isFolder: false, team: "개발팀" },
      { id: "user_dev2", name: "이코딩(dev2)", isFolder: false, team: "개발팀" },
    ],
  },
  {
    id: "team_sys",
    name: "시스템사업부",
    isFolder: true,
    isOpen: false,
    children: [],
  },
  {
    id: "team_rnd",
    name: "소프트웨어 기술연구소",
    isFolder: true,
    isOpen: false,
    children: [],
  },
  {
    id: "team_mgmt",
    name: "경영지원실",
    isFolder: true,
    isOpen: false,
    children: [
        { id: "user_chob", name: "조병직(chob)", isFolder: false, team: "경영지원실" }
    ],
  },
];

type TabType = "recipient" | "reference" | "circulation";

const ApprovalLineModal: React.FC<ApprovalLineModalProps> = ({ isOpen, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("recipient");
  const [orgTree, setOrgTree] = useState(orgData);
  const [selectedUser, setSelectedUser] = useState<any>(null); // User selected in tree to be added

  // Lists for right panel
  const [approvalList, setApprovalList] = useState<any[]>([]); // 결재/협조
  const [recipientList, setRecipientList] = useState<any[]>([]); // 수신
  const [referenceList, setReferenceList] = useState<any[]>([]); // 참조
  const [circulationList, setCirculationList] = useState<any[]>([]); // 공람

  const toggleFolder = (id: string) => {
    const newTree = orgTree.map(node => {
      if (node.id === id) {
        return { ...node, isOpen: !node.isOpen };
      }
      return node;
    });
    setOrgTree(newTree);
  };

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
  };

  const addToApproval = () => {
    if (selectedUser && !selectedUser.isFolder) {
      if (!approvalList.find(u => u.id === selectedUser.id)) {
        setApprovalList([...approvalList, { ...selectedUser, type: "결재" }]);
      }
    }
  };

  const addToCoop = () => {
    if (selectedUser && !selectedUser.isFolder) {
        if (!approvalList.find(u => u.id === selectedUser.id)) {
            setApprovalList([...approvalList, { ...selectedUser, type: "협조" }]);
        }
    }
  }

  const addToTabList = (listSetter: React.Dispatch<React.SetStateAction<any[]>>, list: any[]) => {
      if (selectedUser && !selectedUser.isFolder) {
          if (!list.find(u => u.id === selectedUser.id)) {
            listSetter([...list, selectedUser]);
          }
      }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background w-[1200px] h-[800px] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <h2 className="text-xl font-bold text-foreground">결재선 설정</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X size={20} />
          </Button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Organization Chart */}
          <div className="w-[320px] border-r border-border flex flex-col bg-card">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Input placeholder="부서명, ID 또는 이름 입력" className="pl-10" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {orgTree.map(node => (
                <div key={node.id} className="mb-2">
                  <div 
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded select-none"
                    onClick={() => toggleFolder(node.id)}
                  >
                   <div className="w-4 h-4 text-muted-foreground">
                        {node.isFolder && (node.isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                    </div>
                    {node.isFolder ? <Folder size={16} className="text-muted-foreground" /> : <User size={16} />}
                    <span className="text-sm text-foreground">{node.name}</span>
                  </div>
                  {node.isOpen && node.children && (
                    <div className="pl-6 mt-1 space-y-1">
                      {node.children.map(child => (
                         <div 
                            key={child.id} 
                            className={`flex items-center gap-2 cursor-pointer p-1 rounded select-none ${selectedUser?.id === child.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50 text-foreground'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectUser(child);
                            }}
                         >
                            <span className="w-4"></span>
                            <span className="text-sm">{child.name}</span>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Center: Action Buttons */}
          <div className="w-[100px] flex flex-col items-center justify-center gap-2 border-r border-border bg-muted/30 p-2">
             <Button variant="outline" className="w-full text-xs" onClick={addToApproval}>결재</Button>
             <Button variant="outline" className="w-full text-xs" onClick={addToCoop}>협조</Button>
             <div className="h-4"></div>
             <Button variant="outline" className="w-full text-xs" onClick={() => addToTabList(setRecipientList, recipientList)}>수신</Button>
             <Button variant="outline" className="w-full text-xs" onClick={() => addToTabList(setReferenceList, referenceList)}>참조</Button>
             <Button variant="outline" className="w-full text-xs" onClick={() => addToTabList(setCirculationList, circulationList)}>공람</Button>
          </div>

          {/* Right: Selection Lists */}
          <div className="flex-1 flex flex-col bg-card">
            {/* Top: Approval Line Name */}
            <div className="p-4 border-b border-border flex items-center gap-4">
                <label className="text-sm font-medium text-muted-foreground w-16">결재선명</label>
                <Input placeholder="[업무기안] 기본결재선" className="flex-1" />
                <Button variant="outline" className="text-xs">내 결재선으로 저장</Button>
            </div>

            {/* Approval/Cooperation List */}
            <div className="flex-1 flex flex-col border-b border-border min-h-[300px]">
                <div className="p-2 px-4 bg-muted/30 border-b border-border flex justify-between items-center">
                    <span className="text-sm font-bold text-foreground">기안</span>
                    <span className="text-xs text-muted-foreground">이나라(nrlee) | 디자인팀</span>
                </div>
                <div className="bg-muted/50 p-2 border-b border-border">
                    <span className="text-sm font-bold text-foreground">결재/협조</span>
                </div>
                <div className="flex-1 bg-white p-4 overflow-y-auto">
                    {approvalList.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                            결재선을 설정해 주세요.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                             {approvalList.map((item, idx) => (
                                 <li key={idx} className="flex justify-between items-center p-2 border border-border rounded-md text-sm bg-background">
                                     <span className="flex items-center gap-2">
                                         <span className={`px-2 py-0.5 rounded text-[10px] ${item.type === '결재' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-600'}`}>{item.type}</span>
                                         {item.name}
                                     </span>
                                     <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6"
                                        onClick={() => setApprovalList(approvalList.filter((_, i) => i !== idx))}
                                     >
                                         <X size={14} />
                                     </Button>
                                 </li>
                             ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Bottom: Tabs (Recipient/Reference/Circulation) */}
            <div className="flex-1 flex flex-col">
                 <div className="flex border-b border-border">
                    <button 
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${selectedTab === 'recipient' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('recipient')}
                    >
                        수신
                    </button>
                    <button 
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${selectedTab === 'reference' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('reference')}
                    >
                        참조
                    </button>
                    <button 
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${selectedTab === 'circulation' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('circulation')}
                    >
                        공람
                    </button>
                 </div>
                 <div className="flex-1 bg-white p-4 overflow-y-auto min-h-[150px]">
                    {((selectedTab === 'recipient' && recipientList.length === 0) || 
                      (selectedTab === 'reference' && referenceList.length === 0) || 
                      (selectedTab === 'circulation' && circulationList.length === 0)) ? (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                             {selectedTab === 'recipient' && "수신자를 설정해 주세요."}
                             {selectedTab === 'reference' && "참조자를 설정해 주세요."}
                             {selectedTab === 'circulation' && "공람자를 설정해 주세요."}
                        </div>
                    ) : (
                         <ul className="space-y-2">
                             {(selectedTab === 'recipient' ? recipientList : selectedTab === 'reference' ? referenceList : circulationList).map((item, idx) => (
                                 <li key={idx} className="flex justify-between items-center p-2 border border-border rounded-md text-sm bg-background">
                                     <span>{item.name}</span>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6"
                                        onClick={() => {
                                            if (selectedTab === 'recipient') setRecipientList(recipientList.filter((_, i) => i !== idx));
                                            if (selectedTab === 'reference') setReferenceList(referenceList.filter((_, i) => i !== idx));
                                            if (selectedTab === 'circulation') setCirculationList(circulationList.filter((_, i) => i !== idx));
                                        }}
                                     >
                                         <X size={14} />
                                     </Button>
                                 </li>
                             ))}
                        </ul>
                    )}
                 </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-3 p-4 border-t border-border bg-card">
          <Button variant="outline" size="lg" className="w-32" onClick={onClose}>취소</Button>
          <Button size="lg" className="w-32 bg-brand-blue1 hover:bg-brand-blue2 text-white">적용</Button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalLineModal;
