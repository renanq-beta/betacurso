"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type Course {
    id: ID!
    name: String
    description: String
    views: Int
    video: String
    duration: String
  }

  type Courses {
    total_count: Int!
    edges: [Course]
  }

  input CourseInput {
    name: String
    description: String
    views: Int
    video: String
    duration: String
  }

`;
