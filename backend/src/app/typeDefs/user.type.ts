import { gql } from "apollo-server-express";

export default gql`
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