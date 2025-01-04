import { AnalyticsType } from '@/types';
import { BASE_URL } from '@/global';

export default function HistoryItem({
    analytics,
}: {
    analytics: AnalyticsType;
}) {
    const { alias, fullUrl, createdAt, count, lastTimeAccessed } = analytics;

    return (
        <div className="mt-4 border-2 p-4 bg-white w-full">
            <div>
                <a
                    className="font-bold text-xl"
                    href={BASE_URL + alias}
                    target="_blank"
                >
                    {BASE_URL + alias}
                </a>
            </div>
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
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
                Created:{' '}
                {new Date(createdAt).toLocaleString('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                })}
            </div>
            <div className="text-sm text-[#939aa0]">
                Last Time Accessed:{' '}
                {new Date(lastTimeAccessed) <= new Date()
                    ? new Date(lastTimeAccessed).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                      })
                    : 'N/A'}
            </div>
        </div>
    );
}
