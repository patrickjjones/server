import { Request, Response } from 'express';
export async function chargeDeposit(req: Request, res: Response) {
  const { amount_minor, currency = 'GBP', customer_email } = req.body || {};
  if (!amount_minor || !customer_email) return res.status(400).json({ error: 'amount_minor and customer_email are required' });
  return res.json({ status: 'requires_action (demo)', payment_intent_id: 'pi_demo_' + Date.now() });
}