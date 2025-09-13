import { Request, Response } from 'express';
import { db } from '../store/db.js';
export async function notifyWhatsApp(req: Request, res: Response) {
  const { to, text } = req.body || {};
  db.prepare('INSERT INTO broadcasts (ts, channel, to_recipient, message, status) VALUES (?, ?, ?, ?, ?)').run(new Date().toISOString(), 'whatsapp', to || '', text || '', 'queued');
  res.json({ status: 'queued (demo)' });
}