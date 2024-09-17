import { NextResponse } from "next/server";
import pool from '@/utils/neondb';

export async function POST(request) {
    try {
        const { plate, type } = await request.json();

        if (!plate || !type) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Insert vehicle into the registered table
        const query = "INSERT INTO registered (plate, type, registered_at) VALUES ($1, $2, NOW())";
        const values = [plate, type];

        await pool.query(query, values);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error inserting vehicle:", error);
        return NextResponse.json({ success: false, error: "Failed to register vehicle" }, { status: 500 });
    }
}
