'use client';

import { UrlType, UserType } from '@/types';
import { useAuth } from '@/app/contexts/AuthContexts';
import HistoryItem from './HistoryItem';

export default function MyUrls({
    urls,
    userId,
}: {
    urls: UrlType[];
    userId: number;
}) {
    const auth: UserType | null = useAuth();

    return (
        <>
            {auth && auth.id === userId && (
                <>
                    <h1 className="text-white font-bold text-2xl sticky top-[92px] bg-[#1e8aa4] py-4">
                        👋 {auth.name}
                    </h1>
                    {urls.map(
                        ({
                            alias,
                            fullUrl,
                            createdAt,
                            count,
                            lastTimeAccessed,
                            id,
                            userId,
                        }) => (
                            <HistoryItem
                                key={id}
                                analytics={{
                                    alias,
                                    fullUrl,
                                    createdAt,
                                    count,
                                    lastTimeAccessed,
                                    id,
                                    userId,
                                }}
                            />
                        )
                    )}
                </>
            )}
        </>
    );
}
