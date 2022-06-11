import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
class NodeMailerProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    const transporter = nodemailer.createTransport({
      host: 'mail.excelsior2u.com',
      service: 'hostgator',
      port: 465,
      secure: true,
      auth: {
        user: 'noreply@excelsior2u.com',
        pass: process.env.PASS_MAIL,
      },
    });
    this.client = transporter;
  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;

    await this.client.sendMail(
      {
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      },
    );
  }
}

export default NodeMailerProvider;
