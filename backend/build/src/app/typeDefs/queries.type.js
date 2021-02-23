"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type Query{
    getCourses: Courses!
  }

  type Mutation {
    createUser(user: UserInput):User
    authentication(credentials: AuthenticationInput): Authentication
    createCourse(course: CourseInput): Course
  }
`;
