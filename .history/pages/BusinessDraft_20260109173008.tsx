
import React from 'react';
import DraftForm from '../components/DraftForm';

const App: React.FC = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white text-gray-800">
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-y-auto bg-white p-12 no-scrollbar relative">
                    <div className="pb-32"> {/* Space for sticky footer */}
                        <DraftForm />
                    </div>

                    {/* Sticky Footer */}
                    <div className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 p-6 flex justify-center gap-4 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
                        <button className="px-16 py-3.5 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                            임시저장
                        </button>
                        <button className="px-16 py-3.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                            상신하기
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
