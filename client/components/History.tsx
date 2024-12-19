import clsx from 'clsx';

export default function History({ showHistory }: { showHistory: boolean }) {
    return (
        <div
            className={clsx('bg-white min-h-screen w-[650px]', {
                hidden: !showHistory,
                'animate-right-to-left': showHistory,
            })}
        ></div>
    );
}
