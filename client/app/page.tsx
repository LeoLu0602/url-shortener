'use client';

import { useState } from 'react';
import Form from '@/components/Form';
import History from '@/components/History';

export default function Home() {
    const [showHistory, setShowHistory] = useState<boolean>(false);

    function openHistory() {
        setShowHistory(true);
    }

    function hideHistory() {
        setShowHistory(false);
    }

    return (
        <main className="min-h-screen w-full bg-[#1e8aa4]">
            <div className="absolute left-12 top-[92px]">
                <Form openHistory={openHistory} />
            </div>
            {showHistory && (
                <div
                    className="fixed left-0 top-0 opacity-30 h-screen w-full bg-black z-10"
                    onClick={hideHistory}
                />
            )}
            <div className="fixed top-0 right-0 z-20">
                <History showHistory={showHistory} />
            </div>
        </main>
    );
}
