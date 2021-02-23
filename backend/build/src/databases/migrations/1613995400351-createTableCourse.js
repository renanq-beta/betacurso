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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableCourse1613995400351 = void 0;
const typeorm_1 = require("typeorm");
class createTableCourse1613995400351 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'courses',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        default: 'uuid_generate_v4()',
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "views",
                        type: "int",
                        default: "0",
                    },
                    {
                        name: "video",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "duration",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                        isNullable: false,
                    }
                ],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP EXTENSION "uuid-ossp"`);
            yield queryRunner.dropTable("courses");
        });
    }
}
exports.createTableCourse1613995400351 = createTableCourse1613995400351;
