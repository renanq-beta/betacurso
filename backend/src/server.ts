import 'reflect-metadata';
import express from 'express';
import './databases/connect';
import typeDefs from './app/typeDefs';
import resolvers from './app/resolvers';
import { env } from 'process';
import { ApolloServer } from 'apollo-server-express';
import { envoirements } from '../envoirements';

const app = express();
const port = env.NODE_ENV === 'development' ? envoirements.development.port : envoirements.production.port;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({req, res}),
});

server.applyMiddleware({ app, path: "/gql" });

app.use((req, res) => {
  res.status(200);
  res.send('Hello');
  res.end();
})

app.listen({ port }, () => {
  console.log(`💥 Server is up on: http://localhost:${port}/gql`);
});
