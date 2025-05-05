import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SearchBookDto {
  @ApiProperty({ description: 'Search term', example: 'Tolkien' })
  @IsString({ message: 'Search term must be a string' })
  @IsNotEmpty({ message: 'Search term cannot be empty' })
  term: string;

  @ApiProperty({ description: 'Number of records to skip', required: false, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Skip must be an integer' })
  @Min(0, { message: 'Skip cannot be negative' })
  skip?: number = 0;

  @ApiProperty({ description: 'Number of records to return', required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Take must be an integer' })
  @Min(1, { message: 'Take must be at least 1' })
  take?: number = 10;
} 