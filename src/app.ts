import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import userRoutes from './api_rest/routes/userRoutes';
import savedListingRoutes from './api_rest/routes/savedListingRoutes';
import { errorHandler } from './api_rest/middlewares/errorHandler';
import dotenv from 'dotenv';
import dataSource from './config/db';
import { createApolloServer } from './api_graphql/apolloServer';
import http from 'http';

dotenv.config();

export const app = express();

// rest api
// rest api: Middleware
app.use(cors());
app.use(express.json());
// rest api: Routes
app.use('/api/users', userRoutes);
app.use('/api/saved-listings', savedListingRoutes);

let server: http.Server;
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

export async function addGraphqlApiToServer() {
  // graphQL api
  const apolloServer = await createApolloServer();
  await apolloServer.start();
  // @ts-ignore
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}

export const startServer = async (port = PORT) => {
  try {
    await dataSource.initialize();
    const apolloServer = await addGraphqlApiToServer();

    // start server
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(
        `GraphQL endpoint available at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (error: any) {
    console.error('Error:', error);
  }
};

export const stopServer = async () => {
  await dataSource.destroy();
  if (server)
    server.close(() => {
      console.log('Server stopped');
    });
};
