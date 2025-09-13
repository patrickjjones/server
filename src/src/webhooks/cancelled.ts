import { Request, Response } from 'express';
import { db } from '../store/db.js';
export async function appointmentCancelled(req: Request, res: Response) {
  const payload = req.body || {};
  db.prepare('INSERT INTO events (ts, type, payload) VALUES (?, ?, ?)').run(new Date().toISOString(), 'webhook.appointment.cancelled', JSON.stringify(payload));
  return res.json({ received: true, created_gap: true });
}