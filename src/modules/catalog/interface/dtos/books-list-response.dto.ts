import { ApiProperty } from '@nestjs/swagger';
import { BookResponseDto } from './book-response.dto';

export class BooksListResponseDto {
  @ApiProperty({ description: 'List of books', type: [BookResponseDto] })
  items: BookResponseDto[];

  @ApiProperty({ description: 'Total number of books' })
  total: number;
} 