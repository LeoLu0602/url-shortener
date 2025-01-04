import MyUrls from '@/components/MyUrls';

export default async function Dashboard({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId: string = (await params).id;

    return (
        <div className="min-h-screen min-w-full pt-[92px] pb-4 px-12">
            <MyUrls userId={userId} />
        </div>
    );
}
