import clsx from 'clsx';

export default function History({ showHistory }: { showHistory: boolean }) {
    return (
        <div
            className={clsx(
                'bg-white min-h-screen w-[650px] transition-all duration-500',
                {
                    'translate-x-full opacity-0': !showHistory,
                    'translate-x-0 opacity-100': showHistory,
                }
            )}
        ></div>
    );
}
