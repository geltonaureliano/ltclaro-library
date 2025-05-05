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
import { ExemplaryService } from '../../application/services/exemplaryy.service';
import { CreateExemplaryDto } from '../../application/dtos/create-exemplaryy.dto';
import { UpdateExemplaryDto } from '../../application/dtos/update-exemplaryy.dto';
import { ExemplaryResponseDto } from '../dtos/exemplary-response.dto';
import { ExemplaryesListResponseDto } from '../dtos/exemplaryes-list-response.dto';
import { StatusExemplary } from '../../domain/entities/exemplary.entity';

@ApiTags('Exemplaryes')
@Controller('exemplaryes')
export class ExemplaryController {
  constructor(private readonly exemplaryService: ExemplaryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os exemplaryes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de exemplaryes retornada com sucesso',
    type: ExemplaryesListResponseDto,
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('bookId') bookId?: string,
    @Query('status') status?: StatusExemplary,
  ): Promise<ExemplaryesListResponseDto> {
    const { exemplaryes, total } = await this.exemplaryService.findAll({
      skip,
      take,
      bookId,
      status,
    });

    return {
      items: exemplaryes.map(exemplary => ({
        id: exemplary.id,
        codigo: exemplary.codigo,
        status: exemplary.status,
        condicao: exemplary.condicao,
        localizacao: exemplary.localizacao,
        bookId: exemplary.bookId,
        criadoEm: exemplary.criadoEm,
        atualizadoEm: exemplary.atualizadoEm,
      })),
      total,
      skip: skip || 0,
      take: take || 10,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um exemplary pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do exemplary' })
  @ApiResponse({
    status: 200,
    description: 'Exemplary encontrado com sucesso',
    type: ExemplaryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Exemplary não encontrado' })
  async findById(@Param('id') id: string): Promise<ExemplaryResponseDto> {
    const exemplary = await this.exemplaryService.findById(id);
    return {
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    };
  }

  @Get('book/:bookId')
  @ApiOperation({ summary: 'Listar exemplaryes de um book' })
  @ApiParam({ name: 'bookId', description: 'ID do book' })
  @ApiResponse({
    status: 200,
    description: 'Lista de exemplaryes retornada com sucesso',
    type: [ExemplaryResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  async findByBookId(@Param('bookId') bookId: string): Promise<ExemplaryResponseDto[]> {
    const exemplaryes = await this.exemplaryService.findByBookId(bookId);
    return exemplaryes.map(exemplary => ({
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    }));
  }

  @Get('book/:bookId/disponiveis')
  @ApiOperation({ summary: 'Listar exemplaryes disponíveis de um book' })
  @ApiParam({ name: 'bookId', description: 'ID do book' })
  @ApiResponse({
    status: 200,
    description: 'Lista de exemplaryes disponíveis retornada com sucesso',
    type: [ExemplaryResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Book não encontrado' })
  async findDisponiveisByBookId(@Param('bookId') bookId: string): Promise<ExemplaryResponseDto[]> {
    const exemplaryes = await this.exemplaryService.findDisponiveisByBookId(bookId);
    return exemplaryes.map(exemplary => ({
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    }));
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo exemplary' })
  @ApiResponse({
    status: 201,
    description: 'Exemplary criado com sucesso',
    type: ExemplaryResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createExemplaryDto: CreateExemplaryDto): Promise<ExemplaryResponseDto> {
    const exemplary = await this.exemplaryService.create(createExemplaryDto);
    return {
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um exemplary existente' })
  @ApiParam({ name: 'id', description: 'ID do exemplary' })
  @ApiResponse({
    status: 200,
    description: 'Exemplary atualizado com sucesso',
    type: ExemplaryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Exemplary não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: string,
    @Body() updateExemplaryDto: UpdateExemplaryDto,
  ): Promise<ExemplaryResponseDto> {
    const exemplary = await this.exemplaryService.update(id, updateExemplaryDto);
    return {
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um exemplary' })
  @ApiParam({ name: 'id', description: 'ID do exemplary' })
  @ApiResponse({ status: 204, description: 'Exemplary removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Exemplary não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.exemplaryService.delete(id);
  }

  @Put(':id/emprestar')
  @ApiOperation({ summary: 'Marcar exemplary como emprestado' })
  @ApiParam({ name: 'id', description: 'ID do exemplary' })
  @ApiResponse({
    status: 200,
    description: 'Exemplary emprestado com sucesso',
    type: ExemplaryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Exemplary não encontrado' })
  @ApiResponse({ status: 400, description: 'Operação inválida para o status atual' })
  async emprestar(@Param('id') id: string): Promise<ExemplaryResponseDto> {
    const exemplary = await this.exemplaryService.emprestar(id);
    return {
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    };
  }

  @Put(':id/devolver')
  @ApiOperation({ summary: 'Marcar exemplary como devolvido' })
  @ApiParam({ name: 'id', description: 'ID do exemplary' })
  @ApiResponse({
    status: 200,
    description: 'Exemplary devolvido com sucesso',
    type: ExemplaryResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Exemplary não encontrado' })
  @ApiResponse({ status: 400, description: 'Operação inválida para o status atual' })
  async devolver(@Param('id') id: string): Promise<ExemplaryResponseDto> {
    const exemplary = await this.exemplaryService.devolver(id);
    return {
      id: exemplary.id,
      codigo: exemplary.codigo,
      status: exemplary.status,
      condicao: exemplary.condicao,
      localizacao: exemplary.localizacao,
      bookId: exemplary.bookId,
      criadoEm: exemplary.criadoEm,
      atualizadoEm: exemplary.atualizadoEm,
    };
  }
} 