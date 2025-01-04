import axios from 'axios';
import { UrlType } from '@/types';
import { BASE_URL } from '@/global';
import MyUrls from '@/components/MyUrls';

export default async function Dashboard({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId: number = parseInt((await params).id);
    const urls: UrlType[] = await getUrlsByUserId(userId);

    urls.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    async function getUrlsByUserId(userId: number) {
        try {
            const res = await axios.post(BASE_URL + 'api/v1/url/ownership', {
                userId,
            });

            return res.data;
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            }
        }
    }

    return (
        <div className="min-h-screen min-w-full pt-[92px] pb-4 px-12">
            <MyUrls urls={urls} userId={userId} />
        </div>
    );
}
