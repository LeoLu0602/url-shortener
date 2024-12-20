import { AnalyticsType } from '@/types';

export default function HistoryItem({
    analytics,
}: {
    analytics: AnalyticsType;
}) {
    const { alias, fullUrl, createdAt, count, lastTimeAccessed } = analytics;

    const BASE_URL = 'http://localhost:8080/';

    return (
        <div className="mt-4 border-2 p-4">
            <div>
                <a
                    className="font-bold text-xl"
                    href={BASE_URL + alias}
                    target="_blank"
                >
                    {BASE_URL + alias}
                </a>
            </div>
            <div>
                <a
                    className="font-bold text-sm text-[#95aa54]"
                    href={fullUrl}
                    target="_blank"
                >
                    {fullUrl}
                </a>
            </div>
            <div className="text-sm text-[#939aa0]">Clicks: {count}</div>
            <div className="text-sm text-[#939aa0]">
                Created: {new Date(createdAt).toLocaleString()}
            </div>
            <div className="text-sm text-[#939aa0]">
                Last Time Accessed:{' '}
                {new Date(lastTimeAccessed).toLocaleString()}
            </div>
        </div>
    );
}
