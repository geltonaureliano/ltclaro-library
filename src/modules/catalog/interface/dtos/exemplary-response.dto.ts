import { ApiProperty } from '@nestjs/swagger';
import { CopyStatus, CopyCondition } from '../../domain/entities/exemplary.entity';

export class CopyResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the copy',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Unique identifier for the copy',
    example: 'CPY-12345',
  })
  code: string;

  @ApiProperty({
    description: 'Current status of the copy',
    enum: CopyStatus,
    example: CopyStatus.AVAILABLE,
  })
  status: CopyStatus;

  @ApiProperty({
    description: 'Physical condition of the copy',
    enum: CopyCondition,
    example: CopyCondition.GOOD,
  })
  condition: CopyCondition;

  @ApiProperty({
    description: 'Location of the copy in the library',
    example: 'Shelf A-12',
  })
  location: string;

  @ApiProperty({
    description: 'ID of the book this copy belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  bookId: string;

  @ApiProperty({
    description: 'Date when the copy was created',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the copy was last updated',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
} 