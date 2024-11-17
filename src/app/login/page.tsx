'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Invalid email or password');

            const { token } = await res.json();

            // Store the token in localStorage or cookies
            localStorage.setItem('authToken', token);

            // Redirect to a protected page
            router.push('/dashboard');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-700">
                    Login
                </h1>
                {error && (
                    <p className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
                        {error}
                    </p>
                )}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-600"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-600"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    New to this platform? {" "}
                    <a
                        href="/register"
                        className="text-indigo-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    );
}
