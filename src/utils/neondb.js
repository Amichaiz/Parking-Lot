// lib/neondb.js
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.NEON_POSTGRESQL_URL,
});

export default pool;
