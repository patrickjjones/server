import 'dotenv/config';
import express from 'express';
import { CronJob } from 'cron';
import { initDb } from './store/db.js';
import { readGaps } from './tools/readGaps.js';
import { notifySms } from './tools/notify.sms.send.js';
import { notifyWhatsApp } from './tools/notify.whatsapp.send.js';
import { notifyTwilioSms } from './tools/notify.twilio.sms.js';
import { chargeDeposit } from './tools/payments.stripe.charge_deposit.js';
import { bookingCreate } from './tools/salon.booking.create.js';
import { appointmentCancelled } from './webhooks/cancelled.js';
import { runDailyReport } from './reports/daily.js';
import { dashboard } from './routes/dashboard.js';

initDb();
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/dashboard', dashboard);

app.post('/tools/salon.schedule.read_gaps', readGaps);
app.post('/tools/notify.sms.send', notifySms);
app.post('/tools/notify.whatsapp.send', notifyWhatsApp);
app.post('/tools/notify.twilio.sms', notifyTwilioSms);
app.post('/tools/payments.stripe.charge_deposit', chargeDeposit);
app.post('/tools/salon.booking.create', bookingCreate);

app.post('/webhooks/appointment.cancelled', appointmentCancelled);

const tz = process.env.TIMEZONE || 'Europe/London';
const job = new CronJob('15 18 * * *', async () => {
  const d = new Date().toISOString().slice(0,10);
  try { await runDailyReport(d); } catch {}
}, null, true, tz);
job.start();

process.on('unhandledRejection', (e:any)=>{ console.error('UNHANDLED REJECTION', e); });
process.on('uncaughtException',(e:any)=>{ console.error('UNCAUGHT EXCEPTION', e); });

const port = Number(process.env.PORT || 8080);
app.listen(port, () => console.log('Salon MCP running on', port));
