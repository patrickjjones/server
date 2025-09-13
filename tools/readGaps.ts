import { Request, Response } from 'express';
import { addMinutes, formatISO } from 'date-fns';
import { db } from '../store/db.js';
export async function readGaps(req: Request, res: Response) {
  const { min_minutes = 60 } = req.body || {};
  const now = new Date();
  const g1 = addMinutes(now, 60);
  const g2 = addMinutes(now, 180);
  const gaps = [
    { start_iso: formatISO(g1), end_iso: formatISO(addMinutes(g1, min_minutes)), source: 'demo' },
    { start_iso: formatISO(g2), end_iso: formatISO(addMinutes(g2, min_minutes)), source: 'demo' }
  ];
  db.prepare('INSERT INTO events (ts, type, payload) VALUES (?, ?, ?)').run(new Date().toISOString(), 'tool.read_gaps', JSON.stringify(req.body || {}));
  res.json({ gaps });
}