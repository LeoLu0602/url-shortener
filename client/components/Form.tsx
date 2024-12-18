'use client';

import { FormType } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form() {
    const [formData, setFormData] = useState<FormType>({
        longUrl: '',
        alias: '',
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {}

    function handleLongUrlChange(e: ChangeEvent<HTMLInputElement>): void {
        setFormData((prev) => {
            return {
                ...prev,
                longUrl: e.target.value,
            };
        });
    }

    function handleAliasChange(e: ChangeEvent<HTMLInputElement>): void {
        setFormData((prev) => {
            return {
                ...prev,
                alias: e.target.value,
            };
        });
    }

    return (
        <form
            className="bg-white p-8 rounded-lg text-xl w-[448.5px]"
            onSubmit={handleSubmit}
        >
            <div>
                <label className="mb-4" htmlFor="long-url">
                    Shorten a long URL
                </label>
                <br />
                <input
                    className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4"
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
                    className="border-gray-200 border-2 rounded-lg focus:outline-none p-2 w-full my-4"
                    type="text"
                    name="alias"
                    value={formData.alias}
                    onChange={handleAliasChange}
                    placeholder="Enter alias"
                    required
                />
            </div>
            <button
                className="w-full bg-[#1f8244] text-white rounded-lg p-4 mt-4 hover:bg-[#175f31]"
                type="submit"
            >
                Shorten URL
            </button>
        </form>
    );
}
