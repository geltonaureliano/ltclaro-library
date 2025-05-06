import { ApiProperty } from '@nestjs/swagger';
import { CopyStatus, CopyCondition } from '../../domain/entities/copy.entity';
import { Copy } from '../../domain/entities/copy.entity';

export class CopyResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty({ enum: CopyStatus })
  status: CopyStatus;

  @ApiProperty({ enum: CopyCondition })
  condition: CopyCondition;

  @ApiProperty()
  location: string;

  @ApiProperty()
  bookId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static fromDomain(copy: Copy): CopyResponseDto {
    const response = new CopyResponseDto();
    response.id = copy.id;
    response.code = copy.code;
    response.status = copy.status;
    response.condition = copy.condition;
    response.location = copy.location;
    response.bookId = copy.bookId;
    response.createdAt = copy.createdAt;
    response.updatedAt = copy.updatedAt;
    return response;
  }
} 