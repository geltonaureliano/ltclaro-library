import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Book } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book-repository.interface';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { SearchBookDto } from '../dtos/search-book.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
  ) {}

  async findAll(options?: {
    skip?: number;
    take?: number;
    title?: string;
    author?: string;
    categories?: string[];
  }): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.findAll(options);
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async findByIsbn(isbn: string): Promise<Book> {
    const book = await this.bookRepository.findByIsbn(isbn);
    if (!book) {
      throw new NotFoundException(`Book with ISBN ${isbn} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findByIsbn(createBookDto.isbn);
    if (existingBook) {
      throw new Error(`A book with ISBN ${createBookDto.isbn} already exists`);
    }

    const book = new Book({
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      publicationYear: createBookDto.publicationYear,
      publisher: createBookDto.publisher,
      categories: createBookDto.categories,
      description: createBookDto.description,
    });

    return this.bookRepository.create(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);

    if (updateBookDto.title) {
      book.updateTitle(updateBookDto.title);
    }

    if (updateBookDto.author) {
      book.updateAuthor(updateBookDto.author);
    }

    if (updateBookDto.description !== undefined) {
      book.updateDescription(updateBookDto.description);
    }

    if (updateBookDto.categories) {
      book.updateCategories(updateBookDto.categories);
    }

    return this.bookRepository.update(book);
  }

  async delete(id: string): Promise<void> {
    const book = await this.findById(id);
    return this.bookRepository.delete(book.id);
  }

  async search(searchDto: SearchBookDto): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.searchByTerm(searchDto.term, {
      skip: searchDto.skip,
      take: searchDto.take,
    });
  }
} 