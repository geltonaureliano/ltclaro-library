import { IsString, IsNotEmpty, IsInt, Min, IsArray, IsOptional, MinLength, MaxLength, IsISBN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title', example: 'The Lord of the Rings' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MinLength(2, { message: 'Title must have at least 2 characters' })
  @MaxLength(200, { message: 'Title must have at most 200 characters' })
  title: string;

  @ApiProperty({ description: 'Book author', example: 'J.R.R. Tolkien' })
  @IsString({ message: 'Author must be a string' })
  @IsNotEmpty({ message: 'Author cannot be empty' })
  @MinLength(2, { message: 'Author must have at least 2 characters' })
  @MaxLength(100, { message: 'Author must have at most 100 characters' })
  author: string;

  @ApiProperty({ description: 'Book ISBN', example: '9788533613379' })
  @IsString({ message: 'ISBN must be a string' })
  @IsNotEmpty({ message: 'ISBN cannot be empty' })
  @IsISBN(undefined, { message: 'Invalid ISBN' })
  isbn: string;

  @ApiProperty({ description: 'Publication year', example: 1954 })
  @IsInt({ message: 'Publication year must be an integer' })
  @Min(0, { message: 'Publication year cannot be negative' })
  publicationYear: number;

  @ApiProperty({ description: 'Book publisher', example: 'Martins Fontes' })
  @IsString({ message: 'Publisher must be a string' })
  @IsNotEmpty({ message: 'Publisher cannot be empty' })
  publisher: string;

  @ApiProperty({ description: 'Book categories', example: ['Fantasy', 'Adventure'] })
  @IsArray({ message: 'Categories must be an array' })
  @IsString({ each: true, message: 'Each category must be a string' })
  categories: string[];

  @ApiProperty({ description: 'Book description', required: false, example: 'A masterpiece of fantasy literature...' })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
} 