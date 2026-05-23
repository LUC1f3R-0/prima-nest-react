import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { SmtpService } from 'src/infastructure/smtp/smtp.service';

@Injectable()
class SmtpHealthIndicator extends HealthIndicator {
  constructor(private readonly smtpService: SmtpService) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.smtpService.verify();
      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError(
        'SMTP check failed',
        this.getStatus(key, false, { error: (error as Error).message }),
      );
    }
  }
}

export { SmtpHealthIndicator };
