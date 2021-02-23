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
const bcrypt_1 = require("bcrypt");
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = require("jsonwebtoken");
const envoirements_1 = require("../../../envoirements");
const process_1 = require("process");
const hashToken = process_1.env.NODE_ENV === 'development'
    ? envoirements_1.envoirements.development.securityHash
    : envoirements_1.envoirements.production.securityHash;
class UsersControllers {
    constructor() {
        this.create = (user) => __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.repository.findOne({
                where: { email: user.email },
            });
            const generateSalt = yield bcrypt_1.genSalt(10);
            const passwordHashed = yield bcrypt_1.hash(user.password, generateSalt);
            const tempPassword = Math.random().toString(36).substring(7);
            if (userExists) {
                throw new Error('Usuário já existente');
            }
            const userToCreate = this.repository.create({
                name: user.name,
                email: user.email,
                password: passwordHashed,
                password_recovery: tempPassword,
                actived: 'CREATED',
            });
            yield this.repository.save(userToCreate);
            return {
                name: userToCreate.name,
                email: userToCreate.email,
                id: userToCreate.id,
            };
        });
        this.authentication = (credentials) => __awaiter(this, void 0, void 0, function* () {
            const getUser = yield this.repository.findOne({
                where: { email: credentials.email },
            });
            if (!getUser) {
                throw new Error('Usuário ou senha incorretos.');
            }
            if (!bcrypt_1.compare(credentials.password, getUser.password)) {
                throw new Error('Usuário ou senha incorretos.');
            }
            const token = jsonwebtoken_1.sign({ id: getUser.id, email: getUser.email }, hashToken, {
                expiresIn: '2h',
            });
            return {
                token,
                type: 'Bearer',
            };
        });
    }
    get repository() {
        return typeorm_1.getRepository(Users_1.default);
    }
}
exports.default = new UsersControllers();
