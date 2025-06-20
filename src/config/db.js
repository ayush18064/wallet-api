import {neon} from "@neondatabase/serverless"
import "dotenv/config"
// creates a sql connection
export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
        console.log("database initialized");

    } catch (error) {
        console.log("Error initializing the database", error);
        process.exit(1) // failure means status code 1 and 0 means success

    }
}
export const sql = neon(process.env.DATABASE_URL)
