'use client';

import { useAuth } from '@/app/contexts/AuthContexts';

export default function MyUrls({ userId }: { userId: string }) {
    const auth = useAuth();

    return <>userId: {userId}</>;
}
