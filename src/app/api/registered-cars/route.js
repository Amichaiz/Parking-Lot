import { NextResponse } from "next/server";
import pool from '@/utils/neondb';

export async function GET() {
    try {
        // Fetch all registered cars
        const result = await pool.query(`
      SELECT plate, type 
      FROM registered
    `);

        const registeredCars = result.rows;

        return NextResponse.json({ registeredCars });
    } catch (error) {
        console.error("Error fetching registered cars:", error);
        return NextResponse.json({ error: "Failed to fetch registered cars" }, { status: 500 });
    }
}
