import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { DatabaseStatusService } from './database-status.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService, DatabaseStatusService],
  exports: [PrismaService],
})
export class DatabaseModule {}
