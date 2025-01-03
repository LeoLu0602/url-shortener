import Navbar from '@/components/Navbar';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'URL Shortener',
    description: 'URL Shortener',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="" suppressHydrationWarning>
            <body className="font-sans">
                <Navbar />
                <main className="min-h-screen min-w-full bg-[#1e8aa4]">
                    {children}
                </main>
            </body>
        </html>
    );
}
