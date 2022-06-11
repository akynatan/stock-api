interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'nodemailer';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'noreply@excelsior2u.com',
      name: 'Team Excelsior',
    },
  },
} as IMailConfig;
