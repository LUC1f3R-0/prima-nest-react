import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import type { Transporter } from 'nodemailer';
import { SMTP_TRANSPORTER } from './nodemailer.config';

@Injectable()
class SmtpStatusService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SmtpStatusService.name);

  constructor(
    @Inject(SMTP_TRANSPORTER)
    private readonly transporter: Transporter,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection successful');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SMTP connection failed: ${message}`);
    }
  }
}

export { SmtpStatusService };
