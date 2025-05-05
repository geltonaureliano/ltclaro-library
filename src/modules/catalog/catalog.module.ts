import { Module } from '@nestjs/common';
import { BookService } from './application/services/book.service';
import { ExemplaryService } from './application/services/exemplary.service';

import { BookController } from './interface/controllers/book.controller';
import { ExemplaryController } from './interface/controllers/exemplary.controller';

import { PrismaBookRepository } from './infrastructure/repositories/prisma-book.repository';
import { PrismaExemplaryRepository } from './infrastructure/repositories/prisma-exemplary.repository';

const bookRepositoryProvider = {
  provide: 'BookRepository',
  useClass: PrismaBookRepository,
};

const exemplaryRepositoryProvider = {
  provide: 'ExemplaryRepository',
  useClass: PrismaExemplaryRepository,
};

@Module({
  imports: [],
  controllers: [
    BookController,
    ExemplaryController,
  ],
  providers: [
    BookService,
    ExemplaryService,
    bookRepositoryProvider,
    exemplaryRepositoryProvider,
  ],
  exports: [
    BookService,
    ExemplaryService,
  ],
})
export class CatalogModule {} 