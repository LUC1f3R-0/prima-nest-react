import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { QueryPersonDto } from './dto/query-person.dto';
import { PersonsRepository } from './persons.repository';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Person, Prisma } from 'generated/prisma/client';

const SALT_ROUNDS = 12;
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'persons');

type SafePerson = Omit<Person, 'password'>;

@Injectable()
export class PersonsService {
  constructor(private readonly personsRepository: PersonsRepository) {}

  async create(
    dto: CreatePersonDto,
    file?: Express.Multer.File,
  ): Promise<SafePerson> {
    const existing = await this.personsRepository.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const image = file ? this.saveImage(file) : null;

    const person = await this.personsRepository.create({
      name: dto.name,
      email: dto.email,
      password,
      dateOfBirth: new Date(dto.dateOfBirth),
      addresses: dto.addresses as unknown as Prisma.InputJsonValue,
      image,
    });

    return this.toSafePerson(person);
  }

  async findAll(query: QueryPersonDto): Promise<{
    data: SafePerson[];
    total: number;
    page: number;
    limit: number;
  }> {
    const [data, total] = await this.personsRepository.findAll(query);

    return {
      data: data.map((person) => this.toSafePerson(person)),
      total,
      page: Number(query.page ?? 1),
      limit: Number(query.limit ?? 10),
    };
  }

  async findOne(id: number): Promise<SafePerson> {
    const person = await this.findOneOrThrow(id);

    return this.toSafePerson(person);
  }

  async update(
    id: number,
    dto: UpdatePersonDto,
    file?: Express.Multer.File,
  ): Promise<SafePerson> {
    await this.findOneOrThrow(id);

    const data: Prisma.PersonUpdateInput = {};

    if (dto.name !== undefined) {
      data.name = dto.name;
    }

    if (dto.email !== undefined) {
      const existing = await this.personsRepository.findByEmail(dto.email);

      if (existing && existing.id !== id) {
        throw new ConflictException('Email already in use');
      }

      data.email = dto.email;
    }

    if (dto.addresses !== undefined) {
      data.addresses = dto.addresses as unknown as Prisma.InputJsonValue;
    }

    if (dto.password !== undefined) {
      data.password = await bcrypt.hash(dto.password, SALT_ROUNDS);
    }

    if (dto.dateOfBirth !== undefined) {
      data.dateOfBirth = new Date(dto.dateOfBirth);
    }

    if (file) {
      data.image = this.saveImage(file);
    }

    const person = await this.personsRepository.update(id, data);

    return this.toSafePerson(person);
  }

  async updateImage(
    id: number,
    file: Express.Multer.File,
  ): Promise<SafePerson> {
    await this.findOneOrThrow(id);

    const image = this.saveImage(file);

    const person = await this.personsRepository.update(id, {
      image,
    });

    return this.toSafePerson(person);
  }

  async remove(id: number): Promise<void> {
    await this.findOneOrThrow(id);

    await this.personsRepository.remove(id);
  }

  private async findOneOrThrow(id: number): Promise<Person> {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new NotFoundException(`Person ${id} not found`);
    }

    return person;
  }

  private toSafePerson(person: Person): SafePerson {
    const { password, ...safePerson } = person;

    return safePerson;
  }

  private saveImage(file: Express.Multer.File): string {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, {
        recursive: true,
      });
    }

    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filepath, file.buffer);

    return path.join('uploads', 'persons', filename);
  }
}
