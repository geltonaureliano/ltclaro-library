import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BookService } from '../../application/services/book.service';
import { CreateBookDto } from '../../application/dtos/create-book.dto';
import { UpdateBookDto } from '../../application/dtos/update-book.dto';
import { SearchBookDto } from '../../application/dtos/search-book.dto';
import { BookResponseDto } from '../dtos/book-response.dto';
import { BooksListResponseDto } from '../dtos/books-list-response.dto';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os books' })
  @ApiResponse({
    status: 200,
    description: 'Lista de books retornada com sucesso',
    type: BooksListResponseDto,
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('title') title?: string,
    @Query('author') author?: string,
    @Query('categorias') categorias?: string[],
  ): Promise<BooksListResponseDto> {
    const { books, total } = await this.bookService.findAll({
      skip,
      take,
      title,
      author,
      categorias,
    });

    return {
      items: books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        categories: book.categories,
        description: book.description,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      })),
      total,
      skip: skip || 0,
      take: take || 10,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um book pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do book' })
  @ApiResponse({
    status: 200,
    description: 'Book encontrado com sucesso',
    type: BookResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  async findById(@Param('id') id: string): Promise<BookResponseDto> {
    const book = await this.bookService.findById(id);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      categories: book.categories,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  @Get('isbn/:isbn')
  @ApiOperation({ summary: 'Obter um book pelo ISBN' })
  @ApiParam({ name: 'isbn', description: 'ISBN do book' })
  @ApiResponse({
    status: 200,
    description: 'Book encontrado com sucesso',
    type: BookResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  async findByIsbn(@Param('isbn') isbn: string): Promise<BookResponseDto> {
    const book = await this.bookService.findByIsbn(isbn);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      categories: book.categories,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar books por termo' })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: BooksListResponseDto,
  })
  async search(@Body() searchDto: SearchBookDto): Promise<BooksListResponseDto> {
    const { books, total } = await this.bookService.search(searchDto);
    
    return {
      items: books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publicationYear: book.publicationYear,
        publisher: book.publisher,
        categories: book.categories,
        description: book.description,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      })),
      total,
      skip: searchDto.skip || 0,
      take: searchDto.take || 10,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo book' })
  @ApiResponse({
    status: 201,
    description: 'Book criado com sucesso',
    type: BookResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createBookDto: CreateBookDto): Promise<BookResponseDto> {
    const book = await this.bookService.create(createBookDto);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      categories: book.categories,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um book existente' })
  @ApiParam({ name: 'id', description: 'ID do book' })
  @ApiResponse({
    status: 200,
    description: 'Book atualizado com sucesso',
    type: BookResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookResponseDto> {
    const book = await this.bookService.update(id, updateBookDto);
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      categories: book.categories,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um book' })
  @ApiParam({ name: 'id', description: 'ID do book' })
  @ApiResponse({ status: 204, description: 'Book removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.bookService.delete(id);
  }
} 