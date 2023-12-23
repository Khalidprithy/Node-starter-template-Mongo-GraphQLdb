import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import config from './config';
import { UserResolver } from './resolvers/userResolver';
import routes from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use('/api', routes);

// Apollo Server
const startApolloServer = async () => {
   try {
      // Connect to MongoDB
      await mongoose.connect(config.mongodbUri);
      console.log('Connected to MongoDB successfully');

      // Create GraphQL schema
      const schema = await buildSchema({
         resolvers: [UserResolver]
      });

      // Create Apollo Server
      const apolloServer = new ApolloServer({ schema });

      // Start Apollo Server
      await apolloServer.start();

      // Apply middleware to Express app
      apolloServer.applyMiddleware({ app });

      // Start the server
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`);
      });
   } catch (error) {
      console.error('Error:', error);
      process.exit(1); // Exit the process if an error occurs
   }
};

startApolloServer();
