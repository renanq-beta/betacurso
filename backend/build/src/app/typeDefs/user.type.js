"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type User {
    Id: String
    name: String
    email: String
    rules: String
    actived: String
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input AuthenticationInput {
    email: String
    password: String
  }

  type Authentication {
    token: String
    type: String
  }

  type Users {
    total_count: Int!
    edges: [User]
  }
`;
