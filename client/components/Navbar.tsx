'use client';

import Link from 'next/link';
import { useAuth, useAuthDispatch } from '@/app/contexts/AuthContexts';

export default function Navbar() {
    const auth = useAuth();
    const authDispatch = useAuthDispatch();

    function signOut() {
        authDispatch({
            type: 'sign-out',
        });
    }

    return (
        <nav className="fixed top-4 right-12 z-10">
            <ul className="flex bg-[#1f8244] h-[44px] text-white rounded-lg">
                {auth ? (
                    <>
                        <li>
                            <Link
                                className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <button
                                className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                                onClick={signOut}
                            >
                                Sign Out
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                                href="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                                href="/sign-in"
                            >
                                Sign In
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
