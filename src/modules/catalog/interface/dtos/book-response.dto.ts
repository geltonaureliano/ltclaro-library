import { ApiProperty } from '@nestjs/swagger';

export class BookResponseDto {
  @ApiProperty({ description: 'Book ID' })
  id: string;

  @ApiProperty({ description: 'Book title' })
  title: string;

  @ApiProperty({ description: 'Book author' })
  author: string;

  @ApiProperty({ description: 'Book ISBN' })
  isbn: string;

  @ApiProperty({ description: 'Publication year' })
  publicationYear: number;

  @ApiProperty({ description: 'Book publisher' })
  publisher: string;

  @ApiProperty({ description: 'Book categories' })
  categories: string[];

  @ApiProperty({ description: 'Book description', required: false })
  description?: string;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;
} 