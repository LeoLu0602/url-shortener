'use client';

import { UserType } from '@/types';
import { useAuth } from '@/app/contexts/AuthContexts';

export default function MyUrls({ userId }: { userId: string }) {
    const auth: UserType | null = useAuth();

    return <>userId: {userId}</>;
}
