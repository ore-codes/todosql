"use server";

import pool from "@/lib/db";

export async function getTodos(userId: number): Promise<{ id: number; title: string; completed: boolean }[]> {
    const query = "SELECT * FROM get_todos_by_user($1)";
    const values = [userId];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch To-Do items");
    }
}
