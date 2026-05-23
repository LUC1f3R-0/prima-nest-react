import { Module } from '@nestjs/common';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';
import { PersonsRepository } from './persons.repository';
import { DatabaseModule } from '../../infastructure/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PersonsController],
  providers: [PersonsService, PersonsRepository],
  exports: [PersonsService],
})
export class PersonsModule {}
