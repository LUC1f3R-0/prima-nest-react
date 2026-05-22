import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
class SmtpService implements OnModuleDestroy {
  private readonly transporter: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {
    const smtpOptions: SMTPTransport.Options = {
      host: this.configService.getOrThrow<string>('smtp.host'),
      port: this.configService.getOrThrow<number>('smtp.port'),
      secure: this.configService.get<boolean>('smtp.secure') ?? false,
      auth: {
        user: this.configService.getOrThrow<string>('smtp.user'),
        pass: this.configService.getOrThrow<string>('smtp.password'),
      },
    };

    this.transporter = nodemailer.createTransport(smtpOptions);
  }

  async verify(): Promise<boolean> {
    return this.transporter.verify();
  }

  async sendMail(
    options: SendMailOptions,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('smtp.user'),
      ...options,
    });
  }

  onModuleDestroy(): void {
    this.transporter.close();
  }
}
export { SmtpService };
