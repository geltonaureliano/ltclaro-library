import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service';
import { BookRepository } from '../../domain/repositories/book-repository.interface';
import { Book } from '../../domain/entities/book.entity';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(options?: {
    skip?: number;
    take?: number;
    title?: string;
    author?: string;
    categorias?: string[];
  }): Promise<{ books: Book[]; total: number }> {
    const { skip = 0, take = 10, title, author, categorias } = options || {};

    const where = {};
    
    if (title) {
      where.title = { contains: title, mode: 'insensitive' };
    }
    
    if (author) {
      where.author = { contains: author, mode: 'insensitive' };
    }
    
    if (categorias && categorias.length > 0) {
      where.categorias = { hasSome: categorias };
    }

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take,
        orderBy: { title: 'asc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      books: books.map(book => Book.fromPersistence(book)),
      total,
    };
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return null;
    }

    return Book.fromPersistence(book);
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: { isbn },
    });

    if (!book) {
      return null;
    }

    return Book.fromPersistence(book);
  }

  async create(book: Book): Promise<Book> {
    const data = book.toJSON();
    
    const createdBook = await this.prisma.book.create({
      data,
    });

    return Book.fromPersistence(createdBook);
  }

  async update(book: Book): Promise<Book> {
    const data = book.toJSON();
    
    const updatedBook = await this.prisma.book.update({
      where: { id: book.id },
      data,
    });

    return Book.fromPersistence(updatedBook);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }

  async searchByTerm(term: string, options?: {
    skip?: number;
    take?: number;
  }): Promise<{ books: Book[]; total: number }> {
    const { skip = 0, take = 10 } = options || {};
    
    const where = {
      OR: [
        { title: { contains: term, mode: 'insensitive' } },
        { author: { contains: term, mode: 'insensitive' } },
        { isbn: { contains: term, mode: 'insensitive' } },
        { editora: { contains: term, mode: 'insensitive' } },
        { descricao: { contains: term, mode: 'insensitive' } },
      ],
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        skip,
        take,
        orderBy: { title: 'asc' },
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      books: books.map(book => Book.fromPersistence(book)),
      total,
    };
  }
} 