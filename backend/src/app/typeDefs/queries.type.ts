import { gql } from "apollo-server-express";

export default gql`
  type Query{
    getCourses: Courses!
  }

  type Mutation {
    createUser(user: UserInput):User
    authentication(credentials: AuthenticationInput): Authentication
    createCourse(course: CourseInput): Course
  }
`;
