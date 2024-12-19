'use client';

import { FormType } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form() {
    const [showResult, setShowResult] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormType>({
        longUrl: '',
        alias: '',
    });
    const [shortUrl, setShortUrl] = useState<string>('');

    const BASE_URL = 'http://localhost:8080/';

    async function handleSubmit(): Promise<void> {
        try {
            const response = await fetch(BASE_URL + 'api/v1/url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    alias: formData.alias,
                    fullUrl: formData.longUrl,
                }),
            });

            const json = await response.json();

            if (response.status !== 200) {
                alert(json.message);
            } else {
                setShortUrl(BASE_URL + json.alias);
                setShowResult(true);
            }
        } catch (error) {
            console.error(error);
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

    return (
        <>
            {showResult ? (
                <section className="bg-white p-8 rounded-lg text-xl w-[448.5px]">
                    <div>
                        <label className="mb-4" htmlFor="long-url">
                            Your Long URL
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4 text-[#218345]"
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
                            className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4 text-[#218345]"
                            type="text"
                            name="short-url"
                            value={shortUrl}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <button className="border-2 py-2 px-4 mr-2 border-[#0980a1] rounded-lg text-[#0980a1] hover:bg-[#0980a1] hover:text-white transition-all">
                            Visit
                        </button>
                        <button className="bg-[#1f8244] py-2 px-4 rounded-lg text-white hover:bg-[#175f31] transition-all">
                            Copy
                        </button>
                    </div>
                    <div>
                        <button className="border-2 py-4 w-1/3 mr-2 border-[#1f8244] rounded-lg text-[#1f8244] hover:bg-[#175f31] hover:text-white transition-all font-bold">
                            My URLs
                        </button>
                        <button
                            className="bg-[#1f8244] py-4 w-1/2 font-bold rounded-lg text-white hover:bg-[#175f31] transition-all"
                            onClick={() => {
                                setShowResult(false);
                            }}
                        >
                            Shorten another
                        </button>
                    </div>
                </section>
            ) : (
                <section className="bg-white p-8 rounded-lg text-xl w-[448.5px]">
                    <div>
                        <label className="mb-4" htmlFor="long-url">
                            Shorten a long URL
                        </label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4 text-[#218345]"
                            type="text"
                            name="long-url"
                            value={formData.longUrl}
                            onChange={handleLongUrlChange}
                            placeholder="Enter long link here"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="alias">Customize your link</label>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4 text-[#218345]"
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
