"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queries_type_1 = __importDefault(require("./queries.type"));
const course_type_1 = __importDefault(require("./course.type"));
const user_type_1 = __importDefault(require("./user.type"));
const typeDefs = [course_type_1.default, user_type_1.default, queries_type_1.default];
exports.default = typeDefs;
