import { Request, Response } from 'express';
import { db } from '../store/db.js';
export async function bookingCreate(req: Request, res: Response) {
  const body = req.body || {};
  const booking_id = 'bk_' + Date.now();
  db.prepare('INSERT INTO bookings (id, customer, stylist_id, start_iso, end_iso, deposit_minor, channel, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(booking_id, JSON.stringify(body.customer || {}), body.stylist_id || '', body.start_iso, body.end_iso, (body.deposit?.amount_minor || 0), body.channel || 'chat', new Date().toISOString());
  return res.json({ booking_id, status: 'created' });
}