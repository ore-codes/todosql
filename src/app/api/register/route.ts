import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    try {
        const result = await pool.query(
            `SELECT register_user($1, $2) AS result`,
            [email, password]
        );

        const response = result.rows[0].result;

        if (response === "Email already exists") {
            return NextResponse.json({ error: response }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Registration successful!" });
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
