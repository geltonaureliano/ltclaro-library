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
    categorias?: string[];
  }): Promise<{ books: Book[]; total: number }> {
    return this.bookRepository.findAll(options);
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new NotFoundException(`Book com ID ${id} não encontrado`);
    }
    return book;
  }

  async findByIsbn(isbn: string): Promise<Book> {
    const book = await this.bookRepository.findByIsbn(isbn);
    if (!book) {
      throw new NotFoundException(`Book com ISBN ${isbn} não encontrado`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findByIsbn(createBookDto.isbn);
    if (existingBook) {
      throw new Error(`Já existe um book com o ISBN ${createBookDto.isbn}`);
    }

    const book = new Book({
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      anoPublicacao: createBookDto.anoPublicacao,
      editora: createBookDto.editora,
      categorias: createBookDto.categorias,
      descricao: createBookDto.descricao,
    });

    return this.bookRepository.create(book);
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findById(id);

    if (updateBookDto.title) {
      book.atualizartitle(updateBookDto.title);
    }

    if (updateBookDto.author) {
      book.atualizarauthor(updateBookDto.author);
    }

    if (updateBookDto.descricao !== undefined) {
      book.atualizarDescricao(updateBookDto.descricao);
    }

    if (updateBookDto.categorias) {
      book.atualizarCategorias(updateBookDto.categorias);
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