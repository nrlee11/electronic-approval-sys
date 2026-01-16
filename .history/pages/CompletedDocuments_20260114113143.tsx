import React, { useState } from "react";
import FilterSection from "../components/FilterSection";
import { DraftItem, TabType } from "../types";
import { Table, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { HugeiconsIcon } from "@hugeicons/react";
import * as Icons from "@hugeicons/core-free-icons";
import EmptyState from "../components/EmptyState";

const CompletedDocuments: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>(TabType.SUBMITTED);
    const [activeSubItem, setActiveSubItem] = useState("완료된");
    const [results, setResults] = useState<DraftItem[]>([]);

    const handleSearch = () => {
        console.log("Searching documents...");
    };

    const getEmptyMessage = () => {
        return "완료된 문서가 존재하지 않습니다.";
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto custom-scrollbar bg-background">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="typo-title text-foreground mb-6">{activeSubItem}</h2>

                        <FilterSection onSearch={handleSearch} />

                        <div className="mt-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="typo-body text-foreground font-bold">
                                    {" "}
                                    총{" "}
                                    <span className="font-bold text-foreground">
                                        {results.length}
                                    </span>
                                    건
                                </h2>

                                <div className="relative inline-block text-left">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    variant="outline"
                                                    className="px-4 py-1.5 flex  items-center gap-4 w-24 justify-between"
                                                >
                                                    10
                                                    <HugeiconsIcon
                                                        icon={Icons.ArrowDown01Icon}
                                                        strokeWidth={2}
                                                        data-icon="inline-end"
                                                    />
                                                </Button>
                                            }
                                        />
                                        <DropdownMenuContent className="bg-background w-24 min-w-0">
                                            <DropdownMenuGroup className="w-full justify-between">
                                                <DropdownMenuLabel className="px-2 py-1 text-xs text-muted-foreground">
                                                    전체
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem className="w-full justify-between">
                                                    10
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-full justify-between">
                                                    20
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-full justify-between">
                                                    30
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-full justify-between">
                                                    50
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-full justify-between">
                                                    100
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>기안양식</TableHead>
                                        <TableHead>기안제목</TableHead>
                                        <TableHead>최종결재자</TableHead>
                                        <TableHead>완료일시</TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>

                            <EmptyState message={getEmptyMessage()} />
                        </div>

                        {/* Footer */}
                        <footer className="mt-16 pt-8 pb-10 flex flex-col md:flex-row justify-between items-center typo-kicker text-muted-foreground gap-4">
                            <div className="flex items-center gap-4">
                                <a href="#" className="hover:text-foreground transition-colors">
                                    이용 약관
                                </a>
                                <span className="text-muted-foreground">|</span>
                                <a
                                    href="#"
                                    className="hover:text-foreground font-bold transition-colors"
                                >
                                    개인정보처리방침
                                </a>
                            </div>
                            <div>&copy; leadit Corp. All rights reserved.</div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CompletedDocuments;
