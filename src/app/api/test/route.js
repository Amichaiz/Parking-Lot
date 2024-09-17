// app/api/test-connection/route.js
import pool from '@/utils/neondb';

export async function GET(req, res) {
    try {
        const client = await pool.connect();
        const { rows } = await client.query('SELECT NOW()'); // Simple query to get the current timestamp
        client.release();

        return new Response(JSON.stringify({ success: true, timestamp: rows[0].now }), {
            status: 200,
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
}
