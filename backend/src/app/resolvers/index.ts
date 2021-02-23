import UsersController from "../controllers/users.controllers";
import CourseController from '../controllers/course.controller'
import { ICourse, ICourses } from "../interfaces/ICourses";
import ICredentials, { ICredentialInput } from "../interfaces/ICredentials";
import IHeader from "../interfaces/IHeader";
import IUsers from "../interfaces/IUsers";
import authenticated from "../helpers/authenticated";

const resolvers = {
  Query: {
    getCourses: async (_: ParentNode, args: { filter: ICourse }) => {
      const getting = await CourseController.getAllCourses(args.filter);
      return getting;
    }
  },
  Mutation: {
    createUser: async (_: ParentNode ,args: { user: IUsers }, ctx: IHeader): Promise<IUsers> => {
      const create = await UsersController.create(args.user);
      return create;
    },
    authentication: async(_: ParentNode, args: { credentials: ICredentialInput }, ctx: IHeader): Promise<ICredentials> => {
      const auth = await UsersController.authentication(args.credentials);
      return auth;
    },
    createCourse: async(_: ParentNode, args: { course: ICourse }, ctx: IHeader): Promise<ICourse> => {
      if( !ctx || ctx.req && ctx.req.headers && !ctx.req.headers.authorization ){
        throw new Error("Usuário não autenticado.");
      }
      if(!authenticated.verifyAuthenticated(ctx)){
        throw new Error("Usuário não autenticado.");
      }
      const create = await CourseController.create(args.course);
      return create;
    },
  }
};

export default resolvers;