import sgMail from '@sendgrid/mail';
import { IMessage } from '../interfaces/IMessage';

class SendMail {
  constructor() {
    sgMail.setApiKey('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');
  }

  async sendMessage(data: IMessage): Promise<string> {
    try {
      const sending = sgMail.send(data);
      if (!sending) {
        throw new Error("Erro ao enviar o e-mail.");
      }
      return "Mensagem enviada com sucesso.";
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new SendMail();