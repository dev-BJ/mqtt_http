import {drizzle} from 'drizzle-orm/neon-http';
import {neon} from '@neondatabase/serverless';
import 'dotenv/config'

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const db = drizzle({client: neon(databaseUrl)});

export default db;