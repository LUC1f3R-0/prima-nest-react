import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { SendMailOptions, Transporter } from 'nodemailer';

@Injectable()
export class SmtpService implements OnModuleDestroy {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('smtp.host'),
      port: this.configService.getOrThrow<number>('smtp.port'),
      secure: this.configService.get<boolean>('smtp.secure') ?? false,

      auth: {
        user: this.configService.getOrThrow<string>('smtp.user'),
        pass: this.configService.getOrThrow<string>('smtp.password'),
      },
    });
  }

  async verify(): Promise<boolean> {
    return this.transporter.verify();
  }

  async sendMail(options: SendMailOptions) {
    return this.transporter.sendMail({
      from: this.configService.getOrThrow<string>('smtp.user'),
      ...options,
    });
  }

  onModuleDestroy(): void {
    this.transporter.close();
  }
}
