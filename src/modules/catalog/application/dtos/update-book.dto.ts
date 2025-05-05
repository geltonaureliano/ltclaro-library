import { IsString, IsOptional, IsArray, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ description: 'Book title', required: false, example: 'The Lord of the Rings: The Fellowship of the Ring' })
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  @MinLength(2, { message: 'Title must have at least 2 characters' })
  @MaxLength(200, { message: 'Title must have at most 200 characters' })
  title?: string;

  @ApiProperty({ description: 'Book author', required: false, example: 'J.R.R. Tolkien' })
  @IsOptional()
  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must have at least 2 characters' })
  @MaxLength(100, { message: 'Author must have at most 100 characters' })
  author?: string;

  @ApiProperty({ description: 'Book categories', required: false, example: ['Fantasy', 'Adventure', 'Epic'] })
  @IsOptional()
  @IsArray({ message: 'Categories must be an array' })
  @IsString({ each: true, message: 'Each category must be a string' })
  categories?: string[];

  @ApiProperty({ description: 'Book description', required: false, example: 'The first volume of The Lord of the Rings trilogy...' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
} 