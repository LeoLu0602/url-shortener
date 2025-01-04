import Link from 'next/link';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/app/contexts/AuthContexts';

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
                <AuthProvider>
                    <Link
                        className="fixed left-12 top-4 text-white font-bold text-3xl"
                        href="/"
                    >
                        URL Shortener
                    </Link>
                    <Navbar />
                    <main className="min-h-screen min-w-full bg-[#1e8aa4]">
                        {children}
                    </main>
                </AuthProvider>
            </body>
        </html>
    );
}
