import React from "react";

import FormGrid from "../components/FormGrid";
import { DRAFT_FORMS } from "../constants";

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden text-foreground">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-background p-8 md:p-12 no-scrollbar min-w-0">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col">
            <h2 className="typo-title text-foreground mb-6">기안 양식함</h2>

            <section className="flex-1 w-full">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    기본양식
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {DRAFT_FORMS.length}
                  </span>
                </div>
              </div>

              <FormGrid forms={DRAFT_FORMS} />
            </section>
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

export default App;
