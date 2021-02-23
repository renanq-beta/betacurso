import { decode, verify } from "jsonwebtoken";
import { env } from "process";
import { envoirements } from "../../../envoirements";
import ICredentials from "../interfaces/ICredentials";
import IHeader from "../interfaces/IHeader";

const hashToken =
  env.NODE_ENV === 'development'
    ? envoirements.development.securityHash
    : envoirements.production.securityHash;

class Authenticated {
  verifyAuthenticated = (header: IHeader): ICredentials => {
    try {
      const { authorization } = header.req.headers;
      if(!authorization){
        throw new Error("Não foram enviadas credenciais.");
      }
  
      if(!/^Bearer\s/g.test(authorization)){
        throw new Error("Token bad formated");
      }
      const explodeAuthorization = authorization.split(" ");
      const type = explodeAuthorization[0];
      const token = explodeAuthorization[1];
  
      if(!type || type !== "Bearer"){
        throw new Error("Token bad formated");
      }
      
      if(!verify(token, hashToken)){
        throw new Error("Invalid Token");
      }
  
      return {
        type,
        token
      }
    } catch (error) {
      throw new Error(error);
      
    }
  }

  decodeValidatedToken = (header: IHeader): { [key: string]: any } | string | null => {
    const validate = this.verifyAuthenticated(header);
    if(!validate){
      throw new Error("Invalid token");      
    }
    return decode(validate.token);
  }
}

export default new Authenticated();