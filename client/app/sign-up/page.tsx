'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/global';

export default function SignUp() {
    const [formData, setFormData] = useState<{
        email: string;
        name: string;
        password: string;
    }>({
        email: '',
        name: '',
        password: '',
    });

    const router = useRouter();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await axios.post(BASE_URL + 'api/v1/user/sign-up', {
                email: formData.email,
                name: formData.name,
                password: formData.password,
            });

            router.push('/sign-in');
        } catch (error) {
            console.error(error);

            if (axios.isAxiosError(error) && error.response) {
                alert(error.response.data.message);
            }
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value,
            };
        });
    }

    return (
        <div className="min-h-screen min-w-full flex flex-col justify-center items-center gap-8">
            <h1 className="text-3xl text-white font-bold">Sign-Up</h1>
            <form
                className="bg-white p-8 rounded-lg w-[448.5px] text-xl"
                onSubmit={handleSubmit}
            >
                <div>
                    <label>
                        <span className="text-[#7a828a]">Name</span>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span className="text-[#7a828a]">Email</span>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <span className="text-[#7a828a]">Password</span>
                        <br />
                        <input
                            className="border-gray-200 border-2 rounded-lg focus:outline-none py-2 px-4 w-full my-4"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={true}
                        />
                    </label>
                </div>
                <div>
                    <input
                        className="cursor-pointer bg-[#0980a1] rounded-lg focus:outline-none py-2 w-full my-4 text-white hover:bg-[#07637d]"
                        type="submit"
                        value="Create An Account"
                    />
                </div>
            </form>
        </div>
    );
}
