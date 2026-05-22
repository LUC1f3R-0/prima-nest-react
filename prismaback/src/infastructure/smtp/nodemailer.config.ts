import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export const SMTP_TRANSPORTER = 'SMTP_TRANSPORTER';

const nodemailerConfig = (configService: ConfigService) => {
  return {
    host: configService.getOrThrow<string>('smtp.host'),
    port: configService.getOrThrow<number>('smtp.port'),
    secure: configService.get<boolean>('smtp.secure') ?? false,

    auth: {
      user: configService.getOrThrow<string>('smtp.user'),
      pass: configService.getOrThrow<string>('smtp.password'),
    },
  };
};

export const createSmtpTransporter = (
  configService: ConfigService,
): Transporter => {
  return nodemailer.createTransport(nodemailerConfig(configService));
};
