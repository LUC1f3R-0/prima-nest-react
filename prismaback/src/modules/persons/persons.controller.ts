import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { QueryPersonDto } from './dto/query-person.dto';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreatePersonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const person = await this.personsService.create(dto, file);

    return {
      message: 'Person created successfully',
      data: person,
    };
  }

  @Get()
  async findAll(@Query() query: QueryPersonDto) {
    const result = await this.personsService.findAll(query);

    return {
      message: 'Persons fetched successfully',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const person = await this.personsService.findOne(id);

    return {
      message: 'Person fetched successfully',
      data: person,
    };
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePersonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const person = await this.personsService.update(id, dto, file);

    return {
      message: 'Person updated successfully',
      data: person,
    };
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const person = await this.personsService.updateImage(id, file);

    return {
      message: 'Person image updated successfully',
      data: person,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.personsService.remove(id);

    return {
      message: 'Person deleted successfully',
      data: null,
    };
  }
}
