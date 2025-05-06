import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CopyService } from '../../application/services/copy.service';
import { CreateCopyDto } from '../../application/dtos/create-copy.dto';
import { UpdateCopyDto } from '../../application/dtos/update-copy.dto';
import { CopyResponseDto } from '../dtos/copy-response.dto';
import { Copy, CopyStatus } from '../../domain/entities/copy.entity';

@ApiTags('copies')
@Controller('copies')
export class CopyController {
  constructor(private readonly copyService: CopyService) {}

  @Get()
  @ApiOperation({ summary: 'List all copies' })
  @ApiResponse({ status: 200, description: 'List of copies', type: [CopyResponseDto] })
  @ApiQuery({ name: 'bookId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: CopyStatus })
  async findAll(
    @Query('bookId') bookId?: string,
    @Query('status') status?: CopyStatus,
  ): Promise<CopyResponseDto[]> {
    const { copies } = await this.copyService.findAll({ bookId, status });
    return copies.map(copy => CopyResponseDto.fromDomain(copy));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a copy by ID' })
  @ApiResponse({ status: 200, description: 'The copy', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async findById(@Param('id') id: string): Promise<CopyResponseDto> {
    const copy = await this.copyService.findById(id);
    return CopyResponseDto.fromDomain(copy);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new copy' })
  @ApiResponse({ status: 201, description: 'The created copy', type: CopyResponseDto })
  async create(@Body() createCopyDto: CreateCopyDto): Promise<CopyResponseDto> {
    const copy = await this.copyService.create(createCopyDto);
    return CopyResponseDto.fromDomain(copy);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a copy' })
  @ApiResponse({ status: 200, description: 'The updated copy', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async update(
    @Param('id') id: string,
    @Body() updateCopyDto: UpdateCopyDto,
  ): Promise<CopyResponseDto> {
    const copy = await this.copyService.update(id, updateCopyDto);
    return CopyResponseDto.fromDomain(copy);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a copy' })
  @ApiResponse({ status: 204, description: 'Copy deleted successfully' })
  @ApiParam({ name: 'id', required: true })
  async delete(@Param('id') id: string): Promise<void> {
    await this.copyService.delete(id);
  }

  @Get('book/:bookId')
  @ApiOperation({ summary: 'Get all copies of a book' })
  @ApiResponse({ status: 200, description: 'Return all copies of the book.', type: [CopyResponseDto] })
  @ApiParam({ name: 'bookId', required: true })
  async findByBookId(@Param('bookId') bookId: string): Promise<CopyResponseDto[]> {
    const copies = await this.copyService.findByBookId(bookId);
    return copies.map(copy => CopyResponseDto.fromDomain(copy));
  }

  @Get('book/:bookId/available')
  @ApiOperation({ summary: 'Get all available copies of a book' })
  @ApiResponse({ status: 200, description: 'Return all available copies of the book.', type: [CopyResponseDto] })
  @ApiParam({ name: 'bookId', required: true })
  async findAvailableByBookId(@Param('bookId') bookId: string): Promise<CopyResponseDto[]> {
    const copies = await this.copyService.findAvailableByBookId(bookId);
    return copies.map(copy => CopyResponseDto.fromDomain(copy));
  }

  @Post(':id/borrow')
  @ApiOperation({ summary: 'Borrow a copy' })
  @ApiResponse({ status: 200, description: 'The copy has been successfully borrowed.', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async borrow(@Param('id') id: string): Promise<CopyResponseDto> {
    const copy = await this.copyService.borrow(id);
    return CopyResponseDto.fromDomain(copy);
  }

  @Post(':id/return')
  @ApiOperation({ summary: 'Return a copy' })
  @ApiResponse({ status: 200, description: 'The copy has been successfully returned.', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async return(@Param('id') id: string): Promise<CopyResponseDto> {
    const copy = await this.copyService.return(id);
    return CopyResponseDto.fromDomain(copy);
  }

  @Post(':id/maintenance')
  @ApiOperation({ summary: 'Send a copy to maintenance' })
  @ApiResponse({ status: 200, description: 'The copy has been successfully sent to maintenance.', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async sendToMaintenance(@Param('id') id: string): Promise<CopyResponseDto> {
    const copy = await this.copyService.sendToMaintenance(id);
    return CopyResponseDto.fromDomain(copy);
  }

  @Post(':id/lost')
  @ApiOperation({ summary: 'Mark a copy as lost' })
  @ApiResponse({ status: 200, description: 'The copy has been successfully marked as lost.', type: CopyResponseDto })
  @ApiParam({ name: 'id', required: true })
  async markAsLost(@Param('id') id: string): Promise<CopyResponseDto> {
    const copy = await this.copyService.markAsLost(id);
    return CopyResponseDto.fromDomain(copy);
  }
} 