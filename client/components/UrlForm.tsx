'use client';

import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { UrlFormType, UserType } from '@/types';
import { BASE_URL } from '@/global';
import { useAuth } from '@/app/contexts/AuthContexts';

export default function Form({
    openHistory,
    updateHistory,
}: {
    openHistory: () => void;
    updateHistory: (alias: string) => void;
}) {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [formData, setFormData] = useState<UrlFormType>({
        longUrl: '',
        alias: '',
    });
    const [shortUrl, setShortUrl] = useState<string>('');
    const [copyBtnTxt, setCopyBtnTxt] = useState<'Copy' | 'Copied!'>('Copy');
    const auth: UserType | null = useAuth();

    async function handleSubmit(): Promise<void> {
        if (formData.longUrl === '') {
            alert('The URL field is required.');

            return;
        }

        try {
            const res = await axios.post(BASE_URL + 'api/v1/url/add', {
                alias: formData.alias,
                fullUrl: formData.longUrl,
                userId: auth?.id ?? null,
            });

            updateHistory(res.data.alias);
            setShortUrl(BASE_URL + res.data.alias);
            setShowResult(true);
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            }
        }
    }

    function handleLongUrlChange(e: ChangeEvent<HTMLInputElement>): void {
        setFormData((prevState) => {
            return {
                ...prevState,
                longUrl: e.target.value,
            };
        });
    }

    function handleAliasChange(e: ChangeEvent<HTMLInputElement>): void {
        setFormData((prevState) => {
            return {
                ...prevState,
                alias: e.target.value,
            };
        });
    }

    function handleVisit() {
        window.open(shortUrl, '_blank');
    }

    function handleCopy() {
        navigator.clipboard.writeText(shortUrl);
        setCopyBtnTxt('Copied!');
        setTimeout(() => {
            setCopyBtnTxt('Copy');
        }, 1000);
    }

    function handleShortenAnother() {
        setFormData({ longUrl: '', alias: '' });
        setShowResult(false);
    }

    return (
        <>
            {showResult ? (
                <section className="bg-white p-4 rounded-lg w-[448.5px] text-xl">
                    <div>
                        <label className="mb-4" htmlFor="long-url">
                            Your Long URL
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4 text-[#218345]"
                            type="text"
                            name="long-url"
                            value={formData.longUrl}
                            disabled
                        />
                    </div>
                    <div>
                        <label className="mb-4" htmlFor="short-url">
                            Your Short URL
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4 text-[#218345]"
                            type="text"
                            name="short-url"
                            value={shortUrl}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            className="border-2 py-2 w-24 mr-2 border-[#0980a1] rounded-lg text-[#0980a1] hover:bg-[#0980a1] hover:text-white transition-all"
                            onClick={handleVisit}
                        >
                            Visit
                        </button>
                        <button
                            className={clsx(
                                'py-2 w-24 rounded-lg transition-all',
                                {
                                    'border-[#1f8244] text-[#1f8244] border-2':
                                        copyBtnTxt === 'Copied!',
                                    'bg-[#1f8244] hover:bg-[#175f31] text-white':
                                        copyBtnTxt === 'Copy',
                                }
                            )}
                            onClick={handleCopy}
                        >
                            {copyBtnTxt}
                        </button>
                    </div>
                    <div className="flex gap-4">
                        <button
                            className="border-2 py-4 w-40 border-[#1f8244] rounded-lg text-[#1f8244] hover:bg-[#175f31] hover:text-white transition-all font-bold"
                            onClick={openHistory}
                        >
                            My URLs
                        </button>
                        <button
                            className="bg-[#1f8244] grow py-4 w-auto font-bold rounded-lg text-white hover:bg-[#175f31] transition-all"
                            onClick={handleShortenAnother}
                        >
                            Shorten another
                        </button>
                    </div>
                </section>
            ) : (
                <section className="bg-white p-4 rounded-lg w-[448.5px] text-xl">
                    <div>
                        <label className="mb-4" htmlFor="long-url">
                            Shorten a long URL
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4 text-[#218345]"
                            type="text"
                            name="long-url"
                            value={formData.longUrl}
                            onChange={handleLongUrlChange}
                            placeholder="Enter long link here"
                            required
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="alias">
                            Customize your link
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4 text-[#218345]"
                            type="text"
                            name="alias"
                            value={formData.alias}
                            onChange={handleAliasChange}
                            placeholder="Enter alias"
                        />
                    </div>
                    <button
                        className="w-full bg-[#1f8244] text-white rounded-lg p-4 mt-8 hover:bg-[#175f31] transition-all font-bold"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Shorten URL
                    </button>
                </section>
            )}
        </>
    );
}
