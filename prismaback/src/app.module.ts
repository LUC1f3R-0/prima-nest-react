import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dataConfig, smtpConfig } from './config/app.config';
import validationSchema from './config/valivation.config';
import { DatabaseModule } from './infastructure/database/database.module';
import { SmtpModule } from './infastructure/smtp/smtp.module';
import { CorsConfig } from './common/cors/cors.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dataConfig, smtpConfig],
      validationOptions: validationSchema,
    }),
    SmtpModule,
    DatabaseModule,
  ],
  providers: [CorsConfig],
})
export class AppModule {}
