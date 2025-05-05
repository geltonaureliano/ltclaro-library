import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CopyStatus, CopyCondition } from '../../domain/entities/exemplary.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCopyDto {
  @ApiProperty({
    description: 'Current status of the copy',
    enum: CopyStatus,
    example: CopyStatus.AVAILABLE,
    required: false,
  })
  @IsEnum(CopyStatus)
  @IsOptional()
  status?: CopyStatus;

  @ApiProperty({
    description: 'Physical condition of the copy',
    enum: CopyCondition,
    example: CopyCondition.GOOD,
    required: false,
  })
  @IsEnum(CopyCondition)
  @IsOptional()
  condition?: CopyCondition;

  @ApiProperty({
    description: 'Location of the copy in the library',
    example: 'Shelf A-12',
    required: false,
  })
  @IsString()
  @IsOptional()
  location?: string;
} 