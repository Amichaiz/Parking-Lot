import { NextResponse } from "next/server";
import pool from '@/utils/neondb';

export async function GET() {
    try {
        // Fetch all cars that have entered but haven't left yet
        const result = await pool.query(`
            SELECT plate, entered_at 
            FROM vehicles 
            WHERE leaving_at IS NULL
            ORDER BY vehicles.entered_at DESC
        `);

        const carsInside = result.rows;

        // Set Cache-Control header to disable caching
        const response = NextResponse.json({ carsInside });
        response.headers.set('Cache-Control', 'no-store');

        return response;
    } catch (error) {
        console.error("Error fetching cars inside:", error);
        return NextResponse.json({ error: "Failed to fetch cars inside" }, { status: 500 });
    }
}
