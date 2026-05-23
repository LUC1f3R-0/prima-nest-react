import { Injectable } from '@nestjs/common';
import { QueryPersonDto } from './dto/query-person.dto';
import { PrismaService } from 'src/infastructure/database/prisma.service';
import { Person } from 'generated/prisma/client';
import { Prisma } from 'generated/prisma/browser';

@Injectable()
export class PersonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({ data });
  }

  async findAll(query: QueryPersonDto): Promise<[Person[], number]> {
    const { search, page = 1, limit = 10 } = query;
    const where: Prisma.PersonWhereInput = search
      ? { name: { contains: search, mode: 'insensitive' } }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.person.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.person.count({ where }),
    ]);

    return [data, total];
  }

  async findById(id: string): Promise<Person | null> {
    return this.prisma.person.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Person | null> {
    return this.prisma.person.findUnique({ where: { email } });
  }

  async update(id: string, data: Prisma.PersonUpdateInput): Promise<Person> {
    return this.prisma.person.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.person.delete({ where: { id } });
  }
}
