import { gql } from "apollo-server-express";

export default gql`
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
