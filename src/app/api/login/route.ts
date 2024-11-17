import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        const result = await pool.query(
            `SELECT login_user($1, $2) AS token`,
            [email, password]
        );

        const token = result.rows[0]?.token;

        if (!token) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const response = NextResponse.json({ success: true, token });
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
