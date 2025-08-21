
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';

export const app = express();

app.use(cors({ origin: true, credentials: false }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api', authRoutes);        // /api/register, /api/login
app.use('/api/tasks', taskRoutes);  // protected CRUD

// Global error safety net
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

export async function start() {
  const PORT = process.env.PORT || 5000;
  await connectDB(process.env.MONGODB_URI);
  return app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

export default app;
