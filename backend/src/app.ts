import express from 'express';
import authRoutes from './routes/auth.routes';
import testRoutes from './routes/test';
import { errorHandler } from './middlewares/errorHandler';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './graphql/schema';
import { authResolvers } from './graphql/resolvers';
import { getUserFromToken } from './middlewares/auth';
import cors from 'cors';
import cron from 'node-cron';
import { updateCompletedEvents } from './jobs/updateCompletedEvents';

const app = express();
app.use(cors());
app.use(express.json());

updateCompletedEvents();

cron.schedule('0 0 * * *', updateCompletedEvents);

const server = new ApolloServer({
  typeDefs,
  resolvers: [authResolvers],
});

async function startApollo() {
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const user = getUserFromToken(req.headers.authorization);
        return { user };
      }
    })
  )
}

startApollo();

app.use(errorHandler);

app.use('/api/test', testRoutes);
app.get('/', (req, res) => {
  res.send('API is running...')
});

app.use('/api/auth', authRoutes);

export default app;