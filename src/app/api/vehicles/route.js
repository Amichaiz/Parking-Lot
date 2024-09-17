import { NextResponse } from "next/server";
import pool from "@/utils/neondb"; // Import Neon DB connection

export async function POST(req) {
    const { plate, entered_at } = await req.json();

    try {
        const client = await pool.connect();
        const query = `
      INSERT INTO vehicles (plate, entered_at)
      VALUES ($1, $2)
      RETURNING *;
    `;

        const values = [plate, entered_at];
        const result = await client.query(query, values);
        client.release();

        return NextResponse.json({ success: true, vehicle: result.rows[0] });
    } catch (error) {
        console.error("Error inserting vehicle entry:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
