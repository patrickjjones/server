import Database from 'better-sqlite3';
import path from 'path';
const DB_PATH = path.join(process.cwd(), 'data.sqlite');
export const db = new Database(DB_PATH);
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, type TEXT, payload TEXT);
    CREATE TABLE IF NOT EXISTS bookings (id TEXT PRIMARY KEY, customer TEXT, stylist_id TEXT, start_iso TEXT, end_iso TEXT, deposit_minor INTEGER, channel TEXT, created_at TEXT);
    CREATE TABLE IF NOT EXISTS broadcasts (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT, channel TEXT, to_recipient TEXT, message TEXT, status TEXT);
  `);
}