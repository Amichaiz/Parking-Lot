/*import pool from '@/utils/neondb';

export async function GET(req, res) {
    try {
        const client = await pool.connect();

        // SQL query to create 'vehicles' table
        const createVehiclesTable = `
      CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        plate VARCHAR(255) NOT NULL,
        entered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        leaving_at TIMESTAMP
      );
    `;

        // SQL query to create 'registered' table
        const createRegisteredTable = `
      CREATE TABLE IF NOT EXISTS registered (
        id SERIAL PRIMARY KEY,
        plate VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

        // Execute both table creation queries
        await client.query(createVehiclesTable);
        await client.query(createRegisteredTable);

        client.release();

        return new Response(JSON.stringify({ success: true, message: 'Tables created successfully!' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error creating tables:', error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
        });
    }
}*/
