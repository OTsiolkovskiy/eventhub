import express from 'express';
import authRoutes from './routes/auth.routes';
import testRoutes from './routes/test';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(errorHandler);

app.use('/api/test', testRoutes);
app.get('/', (req, res) => {
  res.send('API is running...')
});

app.use('/api/auth', authRoutes);

export default app;