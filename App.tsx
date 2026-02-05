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
import { Button } from "./components/ui/button";
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
import { useIsMobile } from "./hooks/use-mobile";
import MobileHeader from "./components/mobile/MobileHeader";
// import MobileBottomNav from "./components/mobile/MobileBottomNav";
import MobileDashboard from "./components/mobile/MobileDashboard";
import MobileDocumentDetail from "./components/mobile/MobileDocumentDetail";
import MobileSidebar from "./components/mobile/MobileSidebar";
import MobileBusinessDraft from "./components/mobile/MobileBusinessDraft";
import MobileDrafts from "./components/mobile/MobileDrafts";
import MobileApprovals from "./components/mobile/MobileApprovals";
import MobileInbox from "./components/mobile/MobileInbox";
import MobileDocumentRegister from "./components/mobile/MobileDocumentRegister";

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
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SUBMITTED);
  const [mobileTab, setMobileTab] = useState("home"); // home, approvals, write, documents, menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        setMobileTab("approvals");
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

  // Listen for navigation events dispatched from MobileSidebar subitems
  useEffect(() => {
    const onMobileNavigate = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as
        | { page?: string }
        | undefined;
      const page = detail?.page as PageType | undefined;
      if (!page) return;
      mobileGo(page);
    };

    window.addEventListener(
      "mobile:navigate",
      onMobileNavigate as EventListener,
    );
    return () =>
      window.removeEventListener(
        "mobile:navigate",
        onMobileNavigate as EventListener,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user: UserInfo = {
    name: "이나라",
    id: "nrlee",
    department: "디자인팀",
  };

  const status: StatusCount = {
    submitted: 0,
    rejected: 0,
    pending: 2,
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

  // --- Mobile Layout Rendering ---
  const mobileGo = (page: PageType) => {
    const approvals = new Set([
      "pending-approval",
      "approval-progress",
      "approval-completed",
      "approval-rejected",
    ]);
    const drafts = new Set([
      "submitted",
      "completed",
      "saved",
      "rejected",
      "returned",
      "retrieved",
    ]);
    const inbox = new Set(["pending-receipt", "receipt-completed"]);

    setCurrentPage(page);

    if (page === "dashboard") {
      setMobileTab("home");
    } else if (approvals.has(page)) {
      setMobileTab("approvals");
    } else if (drafts.has(page)) {
      setMobileTab("documents");
    } else if (page === "document-register") {
      setMobileTab("ledger");
    } else if (inbox.has(page)) {
      setMobileTab("inbox");
    } else if (page === "forms") {
      setMobileTab("write");
    } else {
      setMobileTab("home");
    }

    setIsSidebarOpen(false);

    // ✅ URL도 항상 동기화
    window.location.hash = page === "dashboard" ? "#/" : `#/${page}`;
  };

  if (isMobile) {
    if (currentPage === "document-detail") {
      return (
        <MobileDocumentDetail
          onBack={() => {
            setCurrentPage("dashboard");
            setMobileTab("approvals");
            window.history.back();
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={(page) => mobileGo(page as PageType)}
        />

        {/* listen for custom events from MobileSidebar subitems (for convenience) */}
        {/* This keeps MobileSidebar simpler and allows it to dispatch events without direct prop plumbing. */}

        <main className="min-h-screen pb-20">
         {mobileTab === "home" && (<MobileDashboard status={status} onNavigate={(page) => mobileGo(page as PageType)} />
)}
          {mobileTab === "approvals" && (
            <MobileApprovals
              initialTab={(() => {
                switch (currentPage) {
                  case "pending-approval":
                    return "결재전";
                  case "approval-progress":
                    return "진행중";
                  case "approval-completed":
                    return "완료된";
                  case "approval-rejected":
                    return "반려된";
                  default:
                    return "결재전";
                }
              })()}
              onBack={() => setMobileTab("home")}
            />
          )}
          {mobileTab === "inbox" && (
            <MobileInbox
              initialTab={(() => {
                switch (currentPage) {
                  case "pending-receipt":
                    return "수신전";
                  case "receipt-completed":
                    return "완료된";
                  default:
                    return "수신전";
                }
              })()}
              onBack={() => setMobileTab("home")}
            />
          )}
          {mobileTab === "ledger" && (
            <MobileDocumentRegister onBack={() => setMobileTab("home")} />
          )}
          {mobileTab === "documents" && (
            <MobileDrafts
              initialTab={(() => {
                // derive tab label from currentPage
                switch (currentPage) {
                  case "submitted":
                    return "상신한";
                  case "completed":
                    return "완료된";
                  case "saved":
                    return "저장된";
                  case "rejected":
                    return "반려된";
                  case "returned":
                    return "반송된";
                  case "retrieved":
                    return "회수된";
                  default:
                    return "상신한";
                }
              })()}
              onBack={() => setMobileTab("home")}
            />
          )}
          {mobileTab === "write" && (
            <div className="pt-16 pb-20 px-4">
              <h2 className="text-lg font-bold mb-4">기안 작성</h2>
              <FormLibrary
                onBack={() => setMobileTab("home")}
                onFormSelect={(formId) => setMobileTab("write-form")}
              />
            </div>
          )}
          {mobileTab === "write-form" && (
            <MobileBusinessDraft onBack={() => setMobileTab("write")} />
          )}
          {mobileTab === "menu" && (
            <div className="pt-16 pb-20 px-4">
              <h2 className="text-lg font-bold mb-4">전체 메뉴</h2>
              <ul className="space-y-4">
                <li className="p-4 bg-card rounded-lg shadow-sm">내 정보</li>
                <li className="p-4 bg-card rounded-lg shadow-sm">환경설정</li>
                <li className="p-4 bg-card rounded-lg shadow-sm">로그아웃</li>
              </ul>
            </div>
          )}
        </main>

        {/* <MobileBottomNav activeTab={mobileTab} onTabChange={setMobileTab} /> */}
      </div>
    );
  }

  // --- Desktop Layout Rendering ---
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

                  <div className="grid grid-cols-4 border border-border rounded-[var(--radius-md)] overflow-hidden h-32 bg-example-content divide-x divide-border">
                    <div className="flex flex-col items-center justify-center hover:bg-example-content/70 transition-colors">
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
