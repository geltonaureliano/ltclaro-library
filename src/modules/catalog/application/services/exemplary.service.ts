import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Copy, CopyStatus, CopyCondition } from '../../domain/entities/exemplary.entity';
import { CopyRepository } from '../../domain/repositories/copy-repository.interface';
import { BookService } from './book.service';
import { CreateCopyDto } from '../dtos/create-copy.dto';
import { UpdateCopyDto } from '../dtos/update-copy.dto';

@Injectable()
export class CopyService {
  constructor(
    @Inject('CopyRepository')
    private readonly copyRepository: CopyRepository,
    private readonly bookService: BookService,
  ) {}

  async findAll(options?: {
    skip?: number;
    take?: number;
    bookId?: string;
    status?: CopyStatus;
  }): Promise<{ copies: Copy[]; total: number }> {
    return this.copyRepository.findAll(options);
  }

  async findById(id: string): Promise<Copy> {
    const copy = await this.copyRepository.findById(id);
    if (!copy) {
      throw new NotFoundException(`Copy with ID ${id} not found`);
    }
    return copy;
  }

  async findByCode(code: string): Promise<Copy> {
    const copy = await this.copyRepository.findByCode(code);
    if (!copy) {
      throw new NotFoundException(`Copy with code ${code} not found`);
    }
    return copy;
  }

  async findByBookId(bookId: string): Promise<Copy[]> {
    await this.bookService.findById(bookId);
    return this.copyRepository.findByBookId(bookId);
  }

  async findAvailableByBookId(bookId: string): Promise<Copy[]> {
    await this.bookService.findById(bookId);
    return this.copyRepository.findAvailableByBookId(bookId);
  }

  async create(createCopyDto: CreateCopyDto): Promise<Copy> {
    await this.bookService.findById(createCopyDto.bookId);
    
    const existingCopy = await this.copyRepository.findByCode(createCopyDto.code);
    if (existingCopy) {
      throw new Error(`A copy with code ${createCopyDto.code} already exists`);
    }

    const copy = new Copy({
      code: createCopyDto.code,
      status: createCopyDto.status,
      condition: createCopyDto.condition,
      location: createCopyDto.location,
      bookId: createCopyDto.bookId,
    });

    return this.copyRepository.create(copy);
  }

  async update(id: string, updateCopyDto: UpdateCopyDto): Promise<Copy> {
    const copy = await this.findById(id);

    if (updateCopyDto.condition) {
      copy.updateCondition(updateCopyDto.condition);
    }

    if (updateCopyDto.location) {
      copy.updateLocation(updateCopyDto.location);
    }

    if (updateCopyDto.status) {
      switch (updateCopyDto.status) {
        case CopyStatus.BORROWED:
          copy.borrow();
          break;
        case CopyStatus.AVAILABLE:
          copy.return();
          break;
        case CopyStatus.IN_MAINTENANCE:
          copy.sendToMaintenance();
          break;
        case CopyStatus.LOST:
          copy.markAsLost();
          break;
      }
    }

    return this.copyRepository.update(copy);
  }

  async delete(id: string): Promise<void> {
    const copy = await this.findById(id);
    return this.copyRepository.delete(copy.id);
  }

  async countByBookId(bookId: string): Promise<number> {
    await this.bookService.findById(bookId);
    return this.copyRepository.countByBookId(bookId);
  }

  async countByStatus(status: CopyStatus): Promise<number> {
    return this.copyRepository.countByStatus(status);
  }

  async borrow(id: string): Promise<Copy> {
    const copy = await this.findById(id);
    copy.borrow();
    return this.copyRepository.update(copy);
  }

  async return(id: string): Promise<Copy> {
    const copy = await this.findById(id);
    copy.return();
    return this.copyRepository.update(copy);
  }

  async sendToMaintenance(id: string): Promise<Copy> {
    const copy = await this.findById(id);
    copy.sendToMaintenance();
    return this.copyRepository.update(copy);
  }

  async markAsLost(id: string): Promise<Copy> {
    const copy = await this.findById(id);
    copy.markAsLost();
    return this.copyRepository.update(copy);
  }
} 