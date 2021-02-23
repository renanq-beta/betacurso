import IUsers from '../interfaces/IUsers';
import ICredentials, { ICredentialInput } from '../interfaces/ICredentials';
import { getRepository, Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';

import UsersModel from '../models/Users';
import { sign } from 'jsonwebtoken';
import { envoirements } from '../../../envoirements';
import { env } from 'process';
import sendMail from '../helpers/sendMail';

const hashToken =
  env.NODE_ENV === 'development'
    ? envoirements.development.securityHash
    : envoirements.production.securityHash;

class UsersControllers {
  private get repository(): Repository<UsersModel> {
    return getRepository(UsersModel);
  }

  create = async (user: IUsers): Promise<IUsers> => {
    const userExists = await this.repository.findOne({
      where: { email: user.email },
    });

    const generateSalt = await genSalt(10);
    const passwordHashed = await hash(user.password, generateSalt);
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
    await this.repository.save(userToCreate);

    return {
      name: userToCreate.name,
      email: userToCreate.email,
      id: userToCreate.id,
    };
  };

  authentication = async (
    credentials: ICredentialInput,
  ): Promise<ICredentials> => {
    const getUser = await this.repository.findOne({
      where: { email: credentials.email },
    });

    if (!getUser) {
      throw new Error('Usuário ou senha incorretos.');
    }

    if (!compare(credentials.password, getUser.password)) {
      throw new Error('Usuário ou senha incorretos.');
    }

    const token = sign({ id: getUser.id, email: getUser.email }, hashToken, {
      expiresIn: '2h',
    });

    return {
      token,
      type: 'Bearer',
    };
  };

}

export default new UsersControllers();
