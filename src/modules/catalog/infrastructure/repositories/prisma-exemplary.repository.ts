import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { ExemplaryRepository } from '../../domain/repositories/exemplary-repository.interface';
import { Exemplary, StatusExemplary } from '../../domain/entities/exemplary.entity';

@Injectable()
export class PrismaExemplaryRepository implements ExemplaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options?: {
    skip?: number;
    take?: number;
    bookId?: string;
    status?: StatusExemplary;
  }): Promise<{ exemplaryes: Exemplary[]; total: number }> {
    const { skip = 0, take = 10, bookId, status } = options || {};

    const where: any = {};
    
    if (bookId) {
      where.bookId = bookId;
    }
    
    if (status) {
      where.status = status;
    }

    const [exemplaryes, total] = await Promise.all([
      this.prisma.exemplary.findMany({
        where,
        skip,
        take,
        orderBy: { codigo: 'asc' },
      }),
      this.prisma.exemplary.count({ where }),
    ]);

    return {
      exemplaryes: exemplaryes.map(exemplary => Exemplary.fromPersistence(exemplary)),
      total,
    };
  }

  async findById(id: string): Promise<Exemplary | null> {
    const exemplary = await this.prisma.exemplary.findUnique({
      where: { id },
    });

    if (!exemplary) {
      return null;
    }

    return Exemplary.fromPersistence(exemplary);
  }

  async findByCodigo(codigo: string): Promise<Exemplary | null> {
    const exemplary = await this.prisma.exemplary.findUnique({
      where: { codigo },
    });

    if (!exemplary) {
      return null;
    }

    return Exemplary.fromPersistence(exemplary);
  }

  async findByBookId(bookId: string): Promise<Exemplary[]> {
    const exemplaryes = await this.prisma.exemplary.findMany({
      where: { bookId },
      orderBy: { codigo: 'asc' },
    });

    return exemplaryes.map(exemplary => Exemplary.fromPersistence(exemplary));
  }

  async findDisponiveisByBookId(bookId: string): Promise<Exemplary[]> {
    const exemplaryes = await this.prisma.exemplary.findMany({
      where: {
        bookId,
        status: StatusExemplary.DISPONIVEL,
      },
      orderBy: { codigo: 'asc' },
    });

    return exemplaryes.map(exemplary => Exemplary.fromPersistence(exemplary));
  }

  async create(exemplary: Exemplary): Promise<Exemplary> {
    const data = exemplary.toJSON();
    
    const createdExemplary = await this.prisma.exemplary.create({
      data,
    });

    return Exemplary.fromPersistence(createdExemplary);
  }

  async update(exemplary: Exemplary): Promise<Exemplary> {
    const data = exemplary.toJSON();
    
    const updatedExemplary = await this.prisma.exemplary.update({
      where: { id: exemplary.id },
      data,
    });

    return Exemplary.fromPersistence(updatedExemplary);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.exemplary.delete({
      where: { id },
    });
  }

  async countByBookId(bookId: string): Promise<number> {
    return this.prisma.exemplary.count({
      where: { bookId },
    });
  }

  async countByStatus(status: StatusExemplary): Promise<number> {
    return this.prisma.exemplary.count({
      where: { status },
    });
  }
} 