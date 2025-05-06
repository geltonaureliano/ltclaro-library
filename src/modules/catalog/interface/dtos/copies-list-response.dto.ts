import { ApiProperty } from '@nestjs/swagger';
import { CopyResponseDto } from './copy-response.dto';

export class CopiesListResponseDto {
  @ApiProperty({ description: 'List of copies', type: [CopyResponseDto] })
  items: CopyResponseDto[];

  @ApiProperty({ description: 'Total number of copies' })
  total: number;
} 