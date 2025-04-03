import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { log } from './vite';

const { Pool } = pg;

// Create a PostgreSQL connection pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create a drizzle instance
export const db = drizzle(pool);

// Initialize database tables
export async function initializeDatabase() {
  try {
    log('Initializing database...', 'db');
    
    // Check database connection
    const client = await pool.connect();
    
    try {
      // Test connection
      const result = await client.query('SELECT NOW()');
      log(`Database connection successful: ${result.rows[0].now}`, 'db');
      
      // Check if tables exist
      const tableResult = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'contact_form_submissions'
        )
      `);
      
      const tablesExist = tableResult.rows[0].exists;
      
      if (!tablesExist) {
        log('Running database schema push...', 'db');
        
        // We don't want to directly execute npm run db:push here as that would
        // require a child process, but we'll log to remind the user
        log('Please run "npm run db:push" to create tables if they do not exist', 'db');
      } else {
        log('Database tables already exist', 'db');
      }
    } finally {
      client.release();
    }
    
    log('Database initialization completed', 'db');
  } catch (error) {
    log(`Error initializing database: ${error}`, 'db');
    console.error('Database initialization error:', error);
  }
}