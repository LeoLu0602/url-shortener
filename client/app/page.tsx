'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from '@/components/Form';
import History from '@/components/History';
import { AnalyticsType } from '@/types';
import { BASE_URL } from '@/global';

export default function Home() {
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const [history, setHistory] = useState<AnalyticsType[]>([]);

    useEffect(() => {
        setUp();
    }, []);

    function openHistory() {
        setShowHistory(true);
    }

    function hideHistory() {
        setShowHistory(false);
    }

    async function updateHistory(alias: string) {
        let newHistory: AnalyticsType[] = [...history];

        if (!new Set(history.map(({ alias }) => alias)).has(alias)) {
            try {
                const response = await fetch(
                    BASE_URL + 'api/v1/url/analytics?alias=' + alias,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                const json = await response.json();

                if (response.status !== 200) {
                    alert(json.message);
                } else {
                    newHistory.unshift(json);
                    newHistory = newHistory.slice(0, 5);
                }
            } catch (error) {
                console.error(error);
            }

            setHistory(newHistory);
            localStorage.setItem('history', JSON.stringify(newHistory));
        }
    }

    async function setUp() {
        const historyString: string | null = localStorage.getItem('history');

        if (historyString !== null) {
            const oldHistory: AnalyticsType[] = JSON.parse(historyString);
            const aliases: string[] = oldHistory.map(({ alias }) => alias);
            const updatedHistory = (
                await Promise.allSettled(
                    aliases.map((alias) =>
                        axios.get(BASE_URL + 'api/v1/url/analytics', {
                            params: {
                                alias,
                            },
                        })
                    )
                )
            )
                .filter((res) => res.status === 'fulfilled')
                .map(({ value }) => value.data);

            setHistory(updatedHistory);
        }
    }

    return (
        <main className="min-h-screen w-full bg-[#1e8aa4]">
            <div className="absolute left-12 top-[92px]">
                <Form openHistory={openHistory} updateHistory={updateHistory} />
            </div>
            {showHistory && (
                <div
                    className="fixed left-0 top-0 opacity-30 h-screen w-full bg-black z-10"
                    onClick={hideHistory}
                />
            )}
            <div className="fixed top-0 right-0 z-20">
                <History
                    showHistory={showHistory}
                    hideHistory={hideHistory}
                    history={history}
                />
            </div>
        </main>
    );
}
