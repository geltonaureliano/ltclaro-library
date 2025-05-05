import { Exemplary, StatusExemplary } from '../entities/exemplary.entity';

export interface ExemplaryRepository {
  findAll(options?: {
    skip?: number;
    take?: number;
    bookId?: string;
    status?: StatusExemplary;
  }): Promise<{ exemplaryes: Exemplary[]; total: number }>;
  
  findById(id: string): Promise<Exemplary | null>;
  
  findByCodigo(codigo: string): Promise<Exemplary | null>;
  
  findByBookId(bookId: string): Promise<Exemplary[]>;
  
  findDisponiveisByBookId(bookId: string): Promise<Exemplary[]>;
  
  create(exemplary: Exemplary): Promise<Exemplary>;
  
  update(exemplary: Exemplary): Promise<Exemplary>;
  
  delete(id: string): Promise<void>;
  
  countByBookId(bookId: string): Promise<number>;
  
  countByStatus(status: StatusExemplary): Promise<number>;
} 