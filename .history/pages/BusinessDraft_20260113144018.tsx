
import React from 'react';
import DraftForm from '../components/DraftForm';

const App: React.FC = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-background p-12 no-scrollbar relative">
                    <div className="pb-32"> {/* Space for sticky footer */}
                        <DraftForm />
                    </div>

                    {/* Sticky Footer */}
                    <div className="fixed bottom-0 left-64 right-0 bg-background/80 backdrop-blur-md border-t border-border p-6 flex justify-center gap-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                        <button className="px-16 py-3.5 bg-secondary text-secondary-foreground rounded-lg font-bold hover:bg-secondary/80 transition-all shadow-lg active:scale-95">
                            임시저장
                        </button>
                        <button className="px-16 py-3.5 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 active:scale-95">
                            상신하기
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
