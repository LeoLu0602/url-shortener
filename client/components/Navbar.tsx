'use client';

import { Dispatch, JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ActionType, UserType } from '@/types';
import { useAuth, useAuthDispatch } from '@/app/contexts/AuthContexts';

export default function Navbar(): JSX.Element {
    const auth: UserType | null = useAuth();
    const authDispatch: Dispatch<ActionType> | null = useAuthDispatch();
    const router = useRouter();

    function signOut(): void {
        if (authDispatch) {
            authDispatch({
                type: 'sign-out',
                newAuth: null,
            });
            router.push('/');
        }
    }

    return (
        <nav className="fixed z-10 w-full h-[92px] flex items-center justify-between px-12 bg-[#1e8aa4]">
            <Link className="text-white font-bold text-3xl" href="/">
                URL Shortener
            </Link>
            <ul className="flex bg-[#1f8244] h-[44px] text-white rounded-lg">
                {auth ? (
                    <>
                        <li>
                            <Link
                                className="h-full flex items-center px-4 hover:bg-[#2bb35d] rounded-lg"
                                href={`/dashboard/${auth.id}`}
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
