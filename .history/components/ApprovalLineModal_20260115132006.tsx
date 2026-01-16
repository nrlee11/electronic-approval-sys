import React, { useState } from "react";
import { X, Search, ChevronRight, ChevronDown, User, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";



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
        { id: "user_chob", name: "조병직(chob)", isFolder: false, team: "경영지원실" },
        { id: "user_yjjeon", name: "전유진(yjjeon)", isFolder: false, team: "경영지원실" }
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
      <div className="bg-background w-[1200px] h-[800px] rounded-lg shadow-2xl flex flex-col p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">결재선 설정</h2>
          <div className="flex items-center gap-4">
             <Button variant="secondary" className="bg-muted text-foreground hover:bg-muted/80 text-xs font-medium h-9">내 결재선으로 저장</Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Left: Organization Chart */}
          <div className="w-[350px] border border-border rounded-sm flex flex-col bg-background">
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Input placeholder="부서명, ID 또는 이름 입력" />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-border">
                {/* Root Node - Hardcoded for visual match */}
                <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-black block"></span>
                        <span className="font-bold text-sm">리드정보기술(주)</span>
                    </div>
                </div>

              {orgTree.map(node => (
                <div key={node.id} className="mb-1 ml-4">
                  <div 
                    className="flex items-center gap-1.5 cursor-pointer hover:bg-muted py-1 px-1 rounded select-none group"
                    onClick={() => toggleFolder(node.id)}
                  >
                   <div className="w-4 h-4 flex items-center justify-center text-muted-foreground border border-border rounded-[2px] bg-background group-hover:border-muted-foreground">
                        {node.isOpen ? <span className="w-2 h-0.5 bg-muted-foreground"></span> : <span className="w-2 h-2 flex items-center justify-center relative"><span className="absolute w-2 h-0.5 bg-muted-foreground"></span><span className="absolute h-2 w-0.5 bg-muted-foreground"></span></span>}
                    </div>
                    {/* {node.isFolder ? <Folder size={16} className="text-yellow-500 fill-yellow-500" /> : <User size={16} />} */}
                    <span className="text-sm text-foreground font-medium">{node.name}</span>
                  </div>
                  {node.isOpen && node.children && (
                    <div className="pl-6 mt-0.5 space-y-0.5 border-l border-border ml-2">
                      {node.children.map(child => (
                         <div 
                            key={child.id} 
                            className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded-sm select-none ${selectedUser?.id === child.id ? 'bg-primary/5 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectUser(child);
                            }}
                         >
                            <span className="w-1.5 h-0.5 bg-border"></span>
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
          <div className="w-[80px] flex flex-col items-center justify-center gap-3">
             <Button size="xs" variant="outline" className="text-xs h-9 border-border text-muted-foreground" onClick={addToApproval}>결재</Button>
             <Button size="xs" variant="outline" className="text-xs h-9 border-border text-muted-foreground" onClick={addToCoop}>협조</Button>
             <Button size="xs" variant="outline" className="text-xs h-9 border-border text-muted-foreground" onClick={() => addToTabList(setRecipientList, recipientList)}>수신</Button>
             <Button size="xs" variant="outline" className="text-xs h-9 border-border text-muted-foreground" onClick={() => addToTabList(setReferenceList, referenceList)}>참조</Button>
             <Button size="xs" variant="outline" className="text-xs h-9 border-border text-muted-foreground" onClick={() => addToTabList(setCirculationList, circulationList)}>공람</Button>
          </div>

          {/* Right: Selection Lists */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
             
             {/* Top: Approval Line */}
             <div className="flex-[1.5] border border-border rounded-sm flex flex-col bg-background overflow-hidden">
                {/* Selector Header */}
                <div className="h-12 border-b border-border flex items-center px-4 justify-between bg-background">
                    <span className="text-sm text-muted-foreground font-medium w-20">결재선명</span>
                    <div className="flex-1 flex justify-end">
                        <DropdownMenu> 
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="outline"
                                className="px-4 py-1.5 flex items-center gap-52"
                              >
                                [업무기안] 기본결재선
                                <HugeiconsIcon
                                  icon={Icons.ArrowDown01Icon}
                                  strokeWidth={2}
                                  data-icon="inline-end"
                                />
                              </Button>
                            }
                          />
                          <DropdownMenuContent className="bg-background">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>전체</DropdownMenuLabel>

                              <DropdownMenuItem>업무기안</DropdownMenuItem>
                              <DropdownMenuItem>업무협조</DropdownMenuItem>
                              <DropdownMenuItem>지출결의서(기본형)</DropdownMenuItem>
                              <DropdownMenuItem>지출결의서(엑셀업로드형)</DropdownMenuItem>
                              <DropdownMenuItem>회의록</DropdownMenuItem>
                              <DropdownMenuItem>업무보고</DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col bg-background">
                    {/* Drafter Row */}
                    <div className="flex border-b border-border bg-muted">
                        <div className="w-24 p-2.5 flex items-center text-sm text-muted-foreground font-medium">기안</div>
                        <div className="flex-1 p-2.5 flex items-center justify-end text-sm text-foreground">이나라(nrlee) | 디자인팀</div>
                    </div>
                    {/* Header Row */}
                    <div className="flex border-b border-border">
                        <div className="w-full bg-muted p-2.5 flex items-center text-sm text-muted-foreground font-medium">결재/협조</div>
                    </div>
                    
                    {/* Variable List */}
                     <div className="flex-1 overflow-y-auto p-0 scrollbar-thin">
                        {approvalList.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                                결재선을 설정해 주세요.
                            </div>
                        ) : (
                             <ul className="divide-y divide-border">
                                 {approvalList.map((item, idx) => (
                                     <li key={idx} className="flex justify-between items-center p-3 hover:bg-muted text-sm">
                                         <span className="flex items-center gap-3">
                                         <Badge className={`px-2 py-0.5 text-[11px] font-medium border ${item.type === '결재' ? 'bg-background border-primary text-primary' : 'bg-background border-warning text-warning'}`}>{item.type}</Badge>
                                         <span className="text-foreground">{item.name}</span>
                                         </span>
                                         <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive"
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
             </div>

             {/* Bottom: Tabs */}
             <div className="flex-1 border border-border rounded-sm flex flex-col bg-background overflow-hidden">
                  <div className="flex border-b border-border pl-2 gap-2">
                    <button 
                        className={`typo-tab px-6 py-2 border-b-[2px] transition-all relative top-[1px] ${selectedTab === 'recipient' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('recipient')}
                    >
                        수신
                    </button>
                    <button 
                        className={`typo-tab px-6 py-2 border-b-[2px] transition-all relative top-[1px] ${selectedTab === 'reference' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('reference')}
                    >
                        참조
                    </button>
                    <button 
                        className={`typo-tab px-6 py-2 border-b-[2px] transition-all relative top-[1px] ${selectedTab === 'circulation' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setSelectedTab('circulation')}
                    >
                        공람
                    </button>
                  </div>
                   <div className="flex-1 bg-background p-0 overflow-y-auto">
                     {((selectedTab === 'recipient' && recipientList.length === 0) || 
                       (selectedTab === 'reference' && referenceList.length === 0) || 
                       (selectedTab === 'circulation' && circulationList.length === 0)) ? (
                         <div className="h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                              {selectedTab === 'recipient' && "수신자를 설정해 주세요."}
                              {selectedTab === 'reference' && "참조자를 설정해 주세요."}
                              {selectedTab === 'circulation' && "공람자를 설정해 주세요."}
                         </div>
                     ) : (
                          <ul className="divide-y divide-border">
                              {(selectedTab === 'recipient' ? recipientList : selectedTab === 'reference' ? referenceList : circulationList).map((item, idx) => (
                                   <li key={idx} className="flex justify-between items-center p-3 hover:bg-muted text-sm">
                                      <span className="text-foreground font-medium pl-2">{item.name}</span>
                                       <Button 
                                         variant="ghost" 
                                         size="icon" 
                                         className="h-6 w-6 text-muted-foreground hover:text-destructive"
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
        <div className="flex items-center justify-center gap-3 pt-6 pb-2">
          <Button variant="secondary" size="lg" onClick={onClose}>취소</Button>
          <Button variant="default" size="lg">적용</Button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalLineModal;
