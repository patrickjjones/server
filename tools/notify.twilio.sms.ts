import { Request, Response } from 'express';
import { db } from '../store/db.js';
export async function notifyTwilioSms(req: Request, res: Response) {
  const { to, message } = req.body || {};
  db.prepare('INSERT INTO broadcasts (ts, channel, to_recipient, message, status) VALUES (?, ?, ?, ?, ?)').run(new Date().toISOString(), 'sms', to || '', message || '', 'queued');
  res.json({ status: 'queued (demo)' });
}