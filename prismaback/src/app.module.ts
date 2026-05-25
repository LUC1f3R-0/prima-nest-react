import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dataConfig, smtpConfig } from './config/app.config';
import validationSchema from './config/validation.config';
import { DatabaseModule } from './infastructure/database/database.module';
import { SmtpModule } from './infastructure/smtp/smtp.module';
import { CorsConfig } from './common/cors/cors.config';
import { PersonsModule } from './modules/persons/persons.module';
import { HealthModule } from './health/indicators/health.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dataConfig, smtpConfig],
      validationSchema,
      validationOptions: {
        abortEarly: false,
        allowUnknown: true,
      },
    }),
    CommonModule,
    SmtpModule,
    DatabaseModule,
    HealthModule,
    PersonsModule,
  ],
  providers: [CorsConfig],
})
export class AppModule {}
