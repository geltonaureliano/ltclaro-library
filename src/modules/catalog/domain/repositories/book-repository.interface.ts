import { Book } from '../entities/book.entity';

export interface BookRepository {
  findAll(options?: {
    skip?: number;
    take?: number;
    title?: string;
    author?: string;
    categories?: string[];
  }): Promise<{ books: Book[]; total: number }>;
  
  findById(id: string): Promise<Book | null>;
  
  findByIsbn(isbn: string): Promise<Book | null>;
  
  create(book: Book): Promise<Book>;
  
  update(book: Book): Promise<Book>;
  
  delete(id: string): Promise<void>;
  
  searchByTerm(term: string, options?: {
    skip?: number;
    take?: number;
  }): Promise<{ books: Book[]; total: number }>;
} 