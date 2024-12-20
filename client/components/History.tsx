import clsx from 'clsx';
import { AnalyticsType } from '@/types';
import HistoryItem from './HistoryItem';

export default function History({
    showHistory,
    hideHistory,
    history,
}: {
    showHistory: boolean;
    hideHistory: () => void;
    history: AnalyticsType[];
}) {
    return (
        <div
            className={clsx(
                'bg-white h-screen w-[650px] transition-all duration-500 relative overflow-scroll',
                {
                    'translate-x-full opacity-0': !showHistory,
                    'translate-x-0 opacity-100': showHistory,
                }
            )}
        >
            <div className="w-full h-[76.25px] border-b-2 bg-white sticky left-0 top-0 flex items-center justify-between px-4 text-xl font-bold">
                <div>Recent history</div>
                <button
                    className="border-2 w-10 h-10 rounded-md hover:bg-[#343a40] hover:text-white transition-all duration-300"
                    onClick={hideHistory}
                >
                    &#10005;
                </button>
            </div>
            <div className="px-4 pb-4">
                {history.map((analytics) => (
                    <HistoryItem analytics={analytics} key={analytics.alias} />
                ))}
            </div>
        </div>
    );
}
