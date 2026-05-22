import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmtpService } from './smtp.service';
import { SmtpStatusService } from './smtp-status.service';

@Module({
  imports: [ConfigModule],
  providers: [SmtpService, SmtpStatusService],
  exports: [SmtpService],
})
export class SmtpModule {}
