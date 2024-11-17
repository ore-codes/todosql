import {NextRequest, NextResponse} from 'next/server';
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
    const {title, userId} = await req.json();

    const query = "SELECT create_todo($1, $2) AS result";
    const values = [userId, title];

    try {
        const result = await pool.query(query, values);
        const item = result.rows[0].result;
        return NextResponse.json({success: true, item}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: 'Error creating to-do', error: (error as Error).message}, {status: 500});
    }
}
