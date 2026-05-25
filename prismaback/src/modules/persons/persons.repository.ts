import { Injectable } from '@nestjs/common';
import { QueryPersonDto } from './dto/query-person.dto';
import { PrismaService } from 'src/infastructure/database/prisma.service';
import { Person, Prisma } from 'generated/prisma/client';

@Injectable()
class PersonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.PersonCreateInput): Promise<Person> {
    return this.prisma.person.create({
      data,
    });
  }

  async findAll(query: QueryPersonDto): Promise<[Person[], number]> {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const search = query.search;

    const where: Prisma.PersonWhereInput = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.person.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.person.count({
        where,
      }),
    ]);

    return [data, total];
  }

  async findById(id: number): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Person | null> {
    return this.prisma.person.findUnique({
      where: {
        email,
      },
    });
  }

  async update(id: number, data: Prisma.PersonUpdateInput): Promise<Person> {
    return this.prisma.person.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.person.delete({
      where: {
        id,
      },
    });
  }
}
export { PersonsRepository };
