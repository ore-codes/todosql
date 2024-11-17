'use client';

export default function LogoutButton() {
    return (
        <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }}
        >
            Logout
        </button>
    )
}
