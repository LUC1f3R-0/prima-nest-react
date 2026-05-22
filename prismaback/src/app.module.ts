import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dataConfig, smtpConfig } from './config/app.config';
import validationSchema from './config/valivation.config';
import { DatabaseModule } from './infastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dataConfig, smtpConfig],
      validationOptions: validationSchema,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
