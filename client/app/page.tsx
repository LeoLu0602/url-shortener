'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import UrlForm from '@/components/UrlForm';
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
                const res = await axios.get(BASE_URL + 'api/v1/url/analytics', {
                    params: { alias },
                });

                newHistory.unshift(res.data);
                newHistory = newHistory.slice(0, 5);
            } catch (error) {
                console.error(error);

                if (axios.isAxiosError(error) && error.response) {
                    alert(error.response.data.message);
                }
            }

            setHistory(newHistory);
            localStorage.setItem(
                'recent-history',
                JSON.stringify(newHistory.map(({ alias }) => alias))
            );
        }
    }

    async function setUp() {
        const localStorageString: string | null =
            localStorage.getItem('recent-history');

        if (localStorageString !== null) {
            const aliases: string[] = JSON.parse(localStorageString);
            const initHistory: AnalyticsType[] = (
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
                .filter((res) => res.status === 'fulfilled') // Some aliases may not be in db.
                .map(({ value }) => value.data);

            setHistory(initHistory);
            localStorage.setItem(
                'recent-history',
                JSON.stringify(initHistory.map(({ alias }) => alias))
            ); // Remove aliases that are not in db.
        }
    }

    return (
        <>
            <div className="absolute left-12 top-[92px]">
                <UrlForm
                    openHistory={openHistory}
                    updateHistory={updateHistory}
                />
            </div>
            {showHistory && (
                <div
                    className="fixed left-0 top-0 opacity-30 h-screen w-full bg-black z-10"
                    onClick={hideHistory}
                />
            )}
            <div
                className={clsx('fixed top-0 right-0', { 'z-20': showHistory })}
            >
                <History
                    showHistory={showHistory}
                    hideHistory={hideHistory}
                    history={history}
                />
            </div>
        </>
    );
}
