import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dataConfig } from 'src/config/app.config';
import validationSchema from 'src/config/valivation.config';
import { PrismaService } from './prisma.service';
import { DatabaseStatusService } from './database-status.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dataConfig],
      validationSchema: validationSchema,
    }),
  ],
  providers: [PrismaService, DatabaseStatusService],
  exports: [PrismaService],
})
export class DatabaseModule {}
