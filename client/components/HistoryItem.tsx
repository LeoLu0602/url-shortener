export default function HistoryItem({ shortUrl }: { shortUrl: string }) {
    return (
        <div className="mt-4" key={shortUrl}>
            <div>{shortUrl}</div>
        </div>
    );
}
