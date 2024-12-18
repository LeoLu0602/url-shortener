import { Geist } from 'next/font/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: 'URL Shortener',
    description: 'URL Shortener',
};

const geistSans = Geist({
    display: 'swap',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={geistSans.className}
            suppressHydrationWarning
        >
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    <div className="flex flex-col gap-20 max-w-5xl p-5">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
