import { Request, Response } from 'express';
import { db } from '../store/db.js';
export function dashboard(req: Request, res: Response) {
  const events = db.prepare('SELECT id, ts, type FROM events ORDER BY id DESC LIMIT 100').all();
  const bookings = db.prepare('SELECT id, customer, stylist_id, start_iso, end_iso, created_at FROM bookings ORDER BY created_at DESC LIMIT 50').all();
  const broadcasts = db.prepare('SELECT id, ts, channel, to_recipient, status FROM broadcasts ORDER BY id DESC LIMIT 50').all();
  res.send(`<html><body style="font-family:system-ui">
    <h2>Salon MCP Dashboard</h2>
    <h3>Events</h3><pre>${JSON.stringify(events, null, 2)}</pre>
    <h3>Bookings</h3><pre>${JSON.stringify(bookings, null, 2)}</pre>
    <h3>Broadcasts</h3><pre>${JSON.stringify(broadcasts, null, 2)}</pre>
  </body></html>`);
}