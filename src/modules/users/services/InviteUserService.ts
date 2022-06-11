import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
  company_id: string;
}

@injectable()
export default class InviteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,
  ) {}

  public async execute({ email, company_id }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = await this.usersRepository.invite({
      email,
      company_id,
    });

    const { token } = await this.userTokenRepository.generate(user.id);

    const inviteUserTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'invite_user.hbs',
    );

    await this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Stock] Invite',
      templateData: {
        file: inviteUserTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/accept-invite?token=${token}`,
        },
      },
    });

    return user;
  }
}
