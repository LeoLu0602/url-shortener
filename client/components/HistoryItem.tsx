export default function HistoryItem({ shortUrl }: { shortUrl: string }) {
    return (
        <div className="mt-4 border-2 p-4">
            <a className="font-bold" href={shortUrl} target="_blank">
                {shortUrl}
            </a>
        </div>
    );
}
