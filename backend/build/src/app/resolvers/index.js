"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_controllers_1 = __importDefault(require("../controllers/users.controllers"));
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const authenticated_1 = __importDefault(require("../helpers/authenticated"));
const resolvers = {
    Query: {
        getCourses: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const getting = yield course_controller_1.default.getAllCourses(args.filter);
            return getting;
        })
    },
    Mutation: {
        createUser: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const create = yield users_controllers_1.default.create(args.user);
            return create;
        }),
        authentication: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = yield users_controllers_1.default.authentication(args.credentials);
            return auth;
        }),
        createCourse: (_, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
            if (!ctx || ctx.req && ctx.req.headers && !ctx.req.headers.authorization) {
                throw new Error("Usuário não autenticado.");
            }
            if (!authenticated_1.default.verifyAuthenticated(ctx)) {
                throw new Error("Usuário não autenticado.");
            }
            const create = yield course_controller_1.default.create(args.course);
            return create;
        }),
    }
};
exports.default = resolvers;
