"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const process_1 = require("process");
const envoirements_1 = require("../../../envoirements");
const hashToken = process_1.env.NODE_ENV === 'development'
    ? envoirements_1.envoirements.development.securityHash
    : envoirements_1.envoirements.production.securityHash;
class Authenticated {
    constructor() {
        this.verifyAuthenticated = (header) => {
            try {
                const { authorization } = header.req.headers;
                if (!authorization) {
                    throw new Error("Não foram enviadas credenciais.");
                }
                if (!/^Bearer\s/g.test(authorization)) {
                    throw new Error("Token bad formated");
                }
                const explodeAuthorization = authorization.split(" ");
                const type = explodeAuthorization[0];
                const token = explodeAuthorization[1];
                if (!type || type !== "Bearer") {
                    throw new Error("Token bad formated");
                }
                if (!jsonwebtoken_1.verify(token, hashToken)) {
                    throw new Error("Invalid Token");
                }
                return {
                    type,
                    token
                };
            }
            catch (error) {
                throw new Error(error);
            }
        };
        this.decodeValidatedToken = (header) => {
            const validate = this.verifyAuthenticated(header);
            if (!validate) {
                throw new Error("Invalid token");
            }
            return jsonwebtoken_1.decode(validate.token);
        };
    }
}
exports.default = new Authenticated();
