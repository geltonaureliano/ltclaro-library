import { ApiProperty } from '@nestjs/swagger';
import { CopyResponseDto } from './exemplary-response.dto';

export class CopiesListResponseDto {
  @ApiProperty({
    description: 'List of copies',
    type: [CopyResponseDto],
  })
  items: CopyResponseDto[];

  @ApiProperty({
    description: 'Total number of copies found',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Number of records skipped for pagination',
    example: 0,
  })
  skip: number;

  @ApiProperty({
    description: 'Number of records returned',
    example: 10,
  })
  take: number;
} 