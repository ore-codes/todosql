'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setIsError(false);

        // Call the API route
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            // Success: Show the success message and redirect
            setMessage(data.message);
            setIsError(false);
            // Redirect to login page or home page
            router.push("/login");
        } else {
            // Error: Show the error message
            setMessage(data.error);
            setIsError(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
            >
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-700">
                    Register
                </h1>

                {/* Show message */}
                {message && (
                    <p
                        className={`mb-4 text-sm font-medium ${
                            isError ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {message}
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
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
                >
                    Register
                </button>

                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-indigo-600 hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </form>
        </div>
    );
}
