'use client';

import { FormType } from '@/types';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form() {
    const [formData, setFormData] = useState<FormType>({
        longUrl: '',
        alias: '',
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {}

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {}

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="long-url">Shorten a long URL</label>
                <input
                    type="text"
                    name="long-url"
                    value={formData.longUrl}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="alias">Enter alias</label>
                <input
                    type="text"
                    name="alias"
                    value={formData.alias}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Shorten URL</button>
        </form>
    );
}
