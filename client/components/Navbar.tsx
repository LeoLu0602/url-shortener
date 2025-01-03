import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-4 right-12 z-10">
            <ul className="flex bg-[#1f8244] h-[44px] text-white rounded-lg">
                <li>
                    <Link
                        className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                        href="/register"
                    >
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link
                        className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                        href="/login"
                    >
                        Sign In
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
