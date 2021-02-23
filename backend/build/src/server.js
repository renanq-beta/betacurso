"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("./databases/connect");
const typeDefs_1 = __importDefault(require("./app/typeDefs"));
const resolvers_1 = __importDefault(require("./app/resolvers"));
const process_1 = require("process");
const apollo_server_express_1 = require("apollo-server-express");
const envoirements_1 = require("../envoirements");
const app = express_1.default();
const port = process_1.env.NODE_ENV === 'development' ? envoirements_1.envoirements.development.port : envoirements_1.envoirements.production.port;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req, res }) => ({ req, res }),
});
server.applyMiddleware({ app, path: "/gql" });
app.use((req, res) => {
    res.status(200);
    res.send('Hello');
    res.end();
});
app.listen({ port }, () => {
    console.log(`💥 Server is up on: http://localhost:${port}/gql`);
});
