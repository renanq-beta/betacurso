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
const typeorm_1 = require("typeorm");
const Courses_1 = __importDefault(require("../models/Courses"));
class CourseController {
    constructor() {
        this.create = (course) => __awaiter(this, void 0, void 0, function* () {
            const courseToCreate = this.repository.create({
                name: course.name,
                description: course.description,
                duration: course.duration,
                video: course.video,
                views: course.views,
            });
            yield this.repository.save(courseToCreate);
            return Object.assign({}, courseToCreate);
        });
        this.getAllCourses = (filter) => __awaiter(this, void 0, void 0, function* () {
            const getCourses = yield this.repository.find({ where: Object.assign({}, filter) });
            return {
                total_count: getCourses.length,
                edges: getCourses,
            };
        });
    }
    get repository() {
        return typeorm_1.getRepository(Courses_1.default);
    }
    ;
}
exports.default = new CourseController();
