import React from "react";
import EmptyState from "../components/EmptyState";
import { Button } from "@/components/ui/button";

const AdminPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto no-scrollbar bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="typo-title text-foreground mb-6">관리자 페이지</h2>
            
            <div className="mt-12">
                <div className="p-6 border border-border rounded-lg bg-card text-card-foreground shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">관리자 설정</h3>
                    <p className="text-muted-foreground flex mb-4">
                        시스템 설정 및 사용자 관리를 할 수 있는 페이지입니다.
                    </p>
                    <div className="flex gap-4">
                         <Button variant="default">사용자 관리</Button>
                         <Button variant="outline">시스템 설정</Button>
                    </div>
                </div>
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

export default AdminPage;
