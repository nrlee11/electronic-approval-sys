import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmptyState from "./components/EmptyState";
import SubmittedDocuments from "./pages/SubmittedDocuments";
import PendingApprovals from "./pages/PendingApprovals";
import ApprovalProgress from "./pages/ApprovalProgress";
import ApprovalCompleted from "./pages/ApprovalCompleted";
import ApprovalRejected from "./pages/ApprovalRejected";
import PendingReceipt from "./pages/PendingReceipt";
import ReceiptCompleted from "./pages/ReceiptCompleted";
import DocumentRegister from "./pages/DocumentRegister";
import DocumentDetail from "./pages/DocumentDetail";
import FormLibrary from "./pages/FormLibrary";
import BusinessDraft from "./pages/BusinessDraft";
import CompletedDocuments from "./pages/CompletedDocuments";
import SavedDocuments from "./pages/SavedDocuments";
import RejectedDocuments from "./pages/RejectedDocuments";
import ReturnedDocuments from "./pages/ReturnedDocuments";
import RetrievedDocuments from "./pages/RetrievedDocuments";
import AdminPage from "./pages/AdminPage";
import { UserInfo, TabType, StatusCount } from "./types";
import { Button } from "./components/ui/button"; // Example usage of the Button component
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type PageType =
  | "dashboard"
  | "submitted"
  | "pending-approval"
  | "approval-progress"
  | "approval-completed"
  | "approval-rejected"
  | "forms"
  | "business-draft"
  | "completed"
  | "saved"
  | "rejected"
  | "returned"
  | "retrieved"
  | "pending-receipt"
  | "receipt-completed"
  | "document-register"
  | "document-detail"
  | "admin";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SUBMITTED);

  useEffect(() => {
    const checkHash = () => {
      const hash = (window.location.hash || "").replace("#", "");
      if (hash === "/submitted" || hash === "submitted") {
        setCurrentPage("submitted");
      } else if (hash === "/pending-approval" || hash === "pending-approval") {
        setCurrentPage("pending-approval");
      } else if (
        hash === "/approval-progress" ||
        hash === "approval-progress"
      ) {
        setCurrentPage("approval-progress");
      } else if (
        hash === "/approval-completed" ||
        hash === "approval-completed"
      ) {
        setCurrentPage("approval-completed");
      } else if (
        hash === "/approval-rejected" ||
        hash === "approval-rejected"
      ) {
        setCurrentPage("approval-rejected");
      } else if (hash === "/forms" || hash === "forms") {
        setCurrentPage("forms");
      } else if (hash === "/completed" || hash === "completed") {
        setCurrentPage("completed");
      } else if (hash === "/saved" || hash === "saved") {
        setCurrentPage("saved");
      } else if (hash === "/rejected" || hash === "rejected") {
        setCurrentPage("rejected");
      } else if (hash === "/returned" || hash === "returned") {
        setCurrentPage("returned");
      } else if (hash === "/retrieved" || hash === "retrieved") {
        setCurrentPage("retrieved");
      } else if (hash === "/pending-receipt" || hash === "pending-receipt") {
        setCurrentPage("pending-receipt");
      } else if (
        hash === "/receipt-completed" ||
        hash === "receipt-completed"
      ) {
        setCurrentPage("receipt-completed");
      } else if (
        hash === "/document-register" ||
        hash === "document-register"
      ) {
        setCurrentPage("document-register");
      } else if (hash === "/document-detail" || hash === "document-detail") {
        setCurrentPage("document-detail");
      } else if (hash === "/admin" || hash === "admin") {
        setCurrentPage("admin");
      } else {
        setCurrentPage("dashboard");
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const user: UserInfo = {
    name: "이나라",
    id: "nrlee",
    department: "디자인팀",
  };

  const status: StatusCount = {
    submitted: 0,
    rejected: 0,
    pending: 0,
    received: 0,
    public: 0,
  };

  const tabs = [
    { id: TabType.SUBMITTED, label: "내가 상신한 문서" },
    { id: TabType.TO_APPROVE, label: "내가 결재할 문서" },
    { id: TabType.RECENT_COMMENTS, label: "최근 결재 의견" },
  ];

  const getEmptyMessage = () => {
    switch (activeTab) {
      case TabType.SUBMITTED:
        return "내가 상신한 문서가 존재하지 않습니다.";
      case TabType.TO_APPROVE:
        return "내가 결재할 문서가 존재하지 않습니다.";
      case TabType.RECENT_COMMENTS:
        return "최근 결재 의견이 존재하지 않습니다.";
      default:
        return "데이터가 없습니다.";
    }
  };
  const tableHeaders: Record<TabType, string[]> = {
    [TabType.SUBMITTED]: ["기안양식", "기안제목", "결재대기자", "상신일시"],
    [TabType.TO_APPROVE]: [
      "결재구분",
      "기안양식",
      "기안제목",
      "기안자 ",
      "상신일시",
    ],
    [TabType.RECENT_COMMENTS]: [
      "결재구분",
      "결재처리",
      "결재의견",
      "결재자",
      "상신일시",
    ],
  };
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header user={user} />

      <div className="flex pt-14">
        <Sidebar
          onNavigate={(page) => {
            console.log("[App] onNavigate called with:", page);
            setCurrentPage(page as PageType);
          }}
        />

        <main className="flex-1 ml-60 p-10 lg:p-14 transition-all overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-12">
            {currentPage === "dashboard" ? (
              <>
                {/* Dashboard Stats */}
                <section>
                  <h2 className="typo-title text-foreground mb-6">나의 현황</h2>

                  <div className="grid grid-cols-4 border border-border rounded-[var(--radius-md)] overflow-hidden h-32 bg-[color:var(--example-content)] divide-x divide-border">
                    <div className="flex flex-col items-center justify-center hover:bg-[color:var(--example-content)]/70 transition-colors">
                      <span className="typo-caption text-primary mb-2">
                        상신한
                      </span>
                      <span className="text-3xl font-medium text-foreground/85">
                        {status.submitted}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center hover:bg-muted/70 transition-colors">
                      <span className="typo-caption text-primary mb-2">
                        반려된
                      </span>
                      <span className="text-3xl font-medium text-foreground/85">
                        {status.rejected}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center hover:bg-muted/70 transition-colors">
                      <span className="typo-caption text-primary mb-2">
                        결재전
                      </span>
                      <span className="text-3xl font-medium text-foreground/85">
                        {status.pending}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center hover:bg-muted/70 transition-colors">
                      <span className="typo-caption text-primary mb-2">
                        수신/공람
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-medium text-foreground/85">
                          {status.received}
                        </span>
                        <span className="text-2xl font-medium text-muted-foreground/60">
                          /
                        </span>
                        <span className="text-3xl font-medium text-foreground/85">
                          {status.public}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Documents List */}
                <section>
                  <div className="flex border-b border-border">
                    {tabs.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`typo-tab px-6 py-4 transition-colors relative ${
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {tab.label}
                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {tableHeaders[activeTab].map((head) => (
                          <TableHead key={head}>{head}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                  </Table>
                  <EmptyState message={getEmptyMessage()} />
                </section>
                {/* Recent Forms */}
                <section>
                  <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                    <h2 className="typo-body text-foreground font-bold">
                      최근 사용한 양식
                    </h2>

                    <Button>기안 양식함</Button>
                  </div>

                  <div className="border-b border-border/60">
                    <EmptyState message="최근 사용한 양식이 존재하지 않습니다." />
                  </div>
                </section>
                {/* Footer */}
                <footer className="mt-16 pt-8 pb-10 flex flex-col md:flex-row justify-between items-center typo-kicker text-muted-foreground gap-4">
                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors"
                    >
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
              </>
            ) : currentPage === "submitted" ? (
              <SubmittedDocuments onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "pending-approval" ? (
              <PendingApprovals onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "approval-progress" ? (
              <ApprovalProgress onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "approval-completed" ? (
              <ApprovalCompleted onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "approval-rejected" ? (
              <ApprovalRejected onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "pending-receipt" ? (
              <PendingReceipt onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "receipt-completed" ? (
              <ReceiptCompleted onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "document-register" ? (
              <DocumentRegister onBack={() => setCurrentPage("dashboard")} />
            ) : currentPage === "document-detail" ? (
              <DocumentDetail onBack={() => window.history.back()} />
            ) : currentPage === "forms" ? (
              <FormLibrary
                onBack={() => setCurrentPage("dashboard")}
                onFormSelect={(formId) => {
                  if (formId === "1") {
                    setCurrentPage("business-draft");
                  }
                }}
              />
            ) : currentPage === "business-draft" ? (
              <BusinessDraft onBack={() => setCurrentPage("forms")} />
            ) : currentPage === "completed" ? (
              <CompletedDocuments />
            ) : currentPage === "saved" ? (
              <SavedDocuments />
            ) : currentPage === "rejected" ? (
              <RejectedDocuments />
            ) : currentPage === "returned" ? (
              <ReturnedDocuments />
            ) : currentPage === "retrieved" ? (
              <RetrievedDocuments />
            ) : currentPage === "admin" ? (
              <AdminPage />
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
