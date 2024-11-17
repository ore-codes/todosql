'use server';

import pool from '@/lib/db';
import { cookies } from 'next/headers';

interface User {
    id: number;
    email: string;
}

export async function getAuthUser() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if (!authToken) {
        return { error: 'Authentication token not found', status: 401 };
    }

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = (SELECT user_id FROM auth_tokens WHERE token = $1)`,
            [authToken]
        );
        const user: User = result.rows[0];

        if (!user) {
            return { error: 'User not found', status: 404 };
        }

        return { user, status: 200 };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to fetch user details', status: 500 };
    }
}
