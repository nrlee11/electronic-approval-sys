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
import { Table, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { useIsMobile } from "./hooks/use-mobile";
import MobileHeader from "./components/mobile/MobileHeader";
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

  // ✅ 페이지는 PC/모바일 공통 single source
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  // (PC 대시보드용)
  const [activeTab, setActiveTab] = useState<TabType>(TabType.SUBMITTED);

  // (모바일 UI 표시용 탭 값 - 페이지 결정에는 사용하지 않음)
  const [mobileTab, setMobileTab] = useState("home");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // ✅ page -> mobileTab 계산 (UI 용)
  const getMobileTabByPage = (page: PageType) => {
    const approvals = new Set<PageType>([
      "pending-approval",
      "approval-progress",
      "approval-completed",
      "approval-rejected",
      "document-detail",
    ]);
    const drafts = new Set<PageType>([
      "submitted",
      "completed",
      "saved",
      "rejected",
      "returned",
      "retrieved",
    ]);
    const inbox = new Set<PageType>(["pending-receipt", "receipt-completed"]);

    if (page === "dashboard") return "home";
    if (approvals.has(page)) return "approvals";
    if (drafts.has(page)) return "documents";
    if (page === "document-register") return "ledger";
    if (inbox.has(page)) return "inbox";
    if (page === "forms" || page === "business-draft") return "write";
    if (page === "admin") return "menu";
    return "home";
  };

  // ✅ 모바일/PC 공통: "페이지 이동" 함수 (기존 기능 최대 유지: currentPage만 바꿈)
  const go = (page: PageType) => {
    setCurrentPage(page);
    setMobileTab(getMobileTabByPage(page)); // 모바일 UI 탭도 자연스럽게 맞춰줌
    setIsSidebarOpen(false);
  };

  // ✅ hash -> currentPage 동기화 (있을 때만)
  useEffect(() => {
    const checkHash = () => {
      const hash = (window.location.hash || "").replace("#", "");

      let nextPage: PageType = "dashboard";
      if (hash === "/submitted" || hash === "submitted") nextPage = "submitted";
      else if (hash === "/pending-approval" || hash === "pending-approval")
        nextPage = "pending-approval";
      else if (hash === "/approval-progress" || hash === "approval-progress")
        nextPage = "approval-progress";
      else if (hash === "/approval-completed" || hash === "approval-completed")
        nextPage = "approval-completed";
      else if (hash === "/approval-rejected" || hash === "approval-rejected")
        nextPage = "approval-rejected";
      else if (hash === "/forms" || hash === "forms") nextPage = "forms";
      else if (hash === "/business-draft" || hash === "business-draft")
        nextPage = "business-draft";
      else if (hash === "/completed" || hash === "completed")
        nextPage = "completed";
      else if (hash === "/saved" || hash === "saved") nextPage = "saved";
      else if (hash === "/rejected" || hash === "rejected")
        nextPage = "rejected";
      else if (hash === "/returned" || hash === "returned")
        nextPage = "returned";
      else if (hash === "/retrieved" || hash === "retrieved")
        nextPage = "retrieved";
      else if (hash === "/pending-receipt" || hash === "pending-receipt")
        nextPage = "pending-receipt";
      else if (hash === "/receipt-completed" || hash === "receipt-completed")
        nextPage = "receipt-completed";
      else if (hash === "/document-register" || hash === "document-register")
        nextPage = "document-register";
      else if (hash === "/document-detail" || hash === "document-detail")
        nextPage = "document-detail";
      else if (hash === "/admin" || hash === "admin") nextPage = "admin";

      setCurrentPage(nextPage);
      setMobileTab(getMobileTabByPage(nextPage));
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ mobile sidebar custom event 유지 (기존 기능 유지)
  useEffect(() => {
    const onMobileNavigate = (e: Event) => {
      const detail = (e as CustomEvent)?.detail as
        | { page?: string }
        | undefined;
      const page = detail?.page as PageType | undefined;
      if (!page) return;
      go(page);
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

  // ✅ 모바일 화면은 "mobileTab"이 아니라 "currentPage"로 렌더링 (핵심)
  const renderMobilePage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <MobileDashboard
            status={status}
            onNavigate={(page) => go(page as PageType)}
          />
        );

      case "document-detail":
        return (
          <MobileDocumentDetail
            onBack={() => {
              window.history.back();
              // history.back은 hashchange를 트리거할 수 있으니 state는 checkHash가 맞춰줌
            }}
          />
        );

      case "document-register":
        return <MobileDocumentRegister onBack={() => go("dashboard")} />;

      case "pending-receipt":
        return (
          <MobileInbox initialTab="수신전" onBack={() => go("dashboard")} />
        );

      case "receipt-completed":
        return (
          <MobileInbox initialTab="완료된" onBack={() => go("dashboard")} />
        );

      case "pending-approval":
        return (
          <MobileApprovals initialTab="결재전" onBack={() => go("dashboard")} />
        );

      case "approval-progress":
        return (
          <MobileApprovals initialTab="진행중" onBack={() => go("dashboard")} />
        );

      case "approval-completed":
        return (
          <MobileApprovals initialTab="완료된" onBack={() => go("dashboard")} />
        );

      case "approval-rejected":
        return (
          <MobileApprovals initialTab="반려된" onBack={() => go("dashboard")} />
        );

      case "submitted":
        return (
          <MobileDrafts initialTab="상신한" onBack={() => go("dashboard")} />
        );

      case "completed":
        return (
          <MobileDrafts initialTab="완료된" onBack={() => go("dashboard")} />
        );

      case "saved":
        return (
          <MobileDrafts initialTab="저장된" onBack={() => go("dashboard")} />
        );

      case "rejected":
        return (
          <MobileDrafts initialTab="반려된" onBack={() => go("dashboard")} />
        );

      case "returned":
        return (
          <MobileDrafts initialTab="반송된" onBack={() => go("dashboard")} />
        );

      case "retrieved":
        return (
          <MobileDrafts initialTab="회수된" onBack={() => go("dashboard")} />
        );

      case "forms":
        return (
          <div className="pt-16 pb-20 px-4">
            <h2 className="text-lg font-bold mb-4">기안 양식함</h2>
            <FormLibrary
              onBack={() => go("dashboard")}
              onFormSelect={(formId) => {
                // 기존 로직 유지: 특정 양식 선택 시 draft로
                if (formId === "1") go("business-draft");
                else go("business-draft");
              }}
            />
          </div>
        );

      case "business-draft":
        return <MobileBusinessDraft onBack={() => go("forms")} />;

      case "admin":
        return (
          <div className="pt-16 pb-20 px-4">
            <AdminPage />
          </div>
        );

      default:
        return (
          <MobileDashboard
            status={status}
            onNavigate={(page) => go(page as PageType)}
          />
        );
    }
  };

  // ------------------ MOBILE ------------------
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <MobileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <MobileSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={(page) => go(page as PageType)}
        />

        <main className="min-h-screen pb-20">{renderMobilePage()}</main>

        {/* mobileTab은 이제 페이지 결정이 아니라 UI 용 상태로만 남겨둠 */}
        {/* <MobileBottomNav activeTab={mobileTab} onTabChange={setMobileTab} /> */}
      </div>
    );
  }

  // ------------------ DESKTOP ------------------
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header user={user} />

      <div className="flex pt-14">
        <Sidebar
          onNavigate={(page) => {
            console.log("[App] onNavigate called with:", page);
            go(page as PageType); // ✅ PC도 동일 go 사용
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
                    <Button onClick={() => go("forms")}>기안 양식함</Button>
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
              <SubmittedDocuments onBack={() => go("dashboard")} />
            ) : currentPage === "pending-approval" ? (
              <PendingApprovals onBack={() => go("dashboard")} />
            ) : currentPage === "approval-progress" ? (
              <ApprovalProgress onBack={() => go("dashboard")} />
            ) : currentPage === "approval-completed" ? (
              <ApprovalCompleted onBack={() => go("dashboard")} />
            ) : currentPage === "approval-rejected" ? (
              <ApprovalRejected onBack={() => go("dashboard")} />
            ) : currentPage === "pending-receipt" ? (
              <PendingReceipt onBack={() => go("dashboard")} />
            ) : currentPage === "receipt-completed" ? (
              <ReceiptCompleted onBack={() => go("dashboard")} />
            ) : currentPage === "document-register" ? (
              <DocumentRegister onBack={() => go("dashboard")} />
            ) : currentPage === "document-detail" ? (
              <DocumentDetail onBack={() => window.history.back()} />
            ) : currentPage === "forms" ? (
              <FormLibrary
                onBack={() => go("dashboard")}
                onFormSelect={(formId) => {
                  if (formId === "1") go("business-draft");
                }}
              />
            ) : currentPage === "business-draft" ? (
              <BusinessDraft onBack={() => go("forms")} />
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
