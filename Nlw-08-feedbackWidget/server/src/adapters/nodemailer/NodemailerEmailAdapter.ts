import nodemailer, { Transporter } from 'nodemailer';
import process from 'process';

import { EmailAdapter, SendEmailDTO } from "../EmailAdapter";

export class NodemailerEmailAdapter implements EmailAdapter {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASSWORD,
      }
    });
  }

  transport: Transporter;

  async sendEmail({ body, subject }: SendEmailDTO) {
    await this.transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Marcelo Lupatini <mar.lupatini@gmail.com>',
      subject,
      html: body,
    });
  };
}
