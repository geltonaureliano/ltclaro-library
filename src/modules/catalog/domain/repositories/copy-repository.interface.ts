import { Copy, CopyStatus } from '../entities/exemplary.entity';

export interface CopyRepository {
  findAll(options?: {
    skip?: number;
    take?: number;
    bookId?: string;
    status?: CopyStatus;
  }): Promise<{ copies: Copy[]; total: number }>;
  
  findById(id: string): Promise<Copy | null>;
  findByCode(code: string): Promise<Copy | null>;
  findByBookId(bookId: string): Promise<Copy[]>;
  findAvailableByBookId(bookId: string): Promise<Copy[]>;
  create(copy: Copy): Promise<Copy>;
  update(copy: Copy): Promise<Copy>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
  countByBookId(bookId: string): Promise<number>;
  countByStatus(status: CopyStatus): Promise<number>;
} 