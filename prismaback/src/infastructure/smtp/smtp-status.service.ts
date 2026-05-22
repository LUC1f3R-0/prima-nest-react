import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { SmtpService } from './smtp.service';

@Injectable()
export class SmtpStatusService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SmtpStatusService.name);

  constructor(private readonly smtpService: SmtpService) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.smtpService.verify();
      this.logger.log('SMTP connection successful');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`SMTP connection failed: ${message}`);
    }
  }
}
