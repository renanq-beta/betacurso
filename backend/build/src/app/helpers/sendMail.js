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
const mail_1 = __importDefault(require("@sendgrid/mail"));
class SendMail {
    constructor() {
        mail_1.default.setApiKey('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');
    }
    sendMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sending = mail_1.default.send(data);
                if (!sending) {
                    throw new Error("Erro ao enviar o e-mail.");
                }
                return "Mensagem enviada com sucesso.";
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = new SendMail();
