import { NextResponse } from 'next/server';
import pool from '@/lib/db';

interface Params {
    params: {
        todoId: string;
    };
}

export async function POST(req: Request, { params }: Params): Promise<Response> {
    const { todoId } = params;

    try {
        // Ensure todoId is a valid number
        const todoIdNumber = parseInt(todoId, 10);
        if (isNaN(todoIdNumber)) {
            return NextResponse.json(
                { error: 'Invalid todoId provided' },
                { status: 400 }
            );
        }

        // Mark todo as completed in the database
        await pool.query('SELECT mark_todo_completed($1)', [todoIdNumber]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to mark todo as completed:', error);
        return NextResponse.json(
            { error: 'Failed to mark todo as completed' },
            { status: 500 }
        );
    }
}
