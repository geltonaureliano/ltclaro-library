import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CopyStatus, CopyCondition } from '../../domain/entities/exemplary.entity';

export class UpdateCopyDto {
  @ApiProperty({ description: 'Copy status', enum: CopyStatus, required: false })
  @IsOptional()
  @IsEnum(CopyStatus, { message: 'Invalid status' })
  status?: CopyStatus;

  @ApiProperty({ description: 'Copy condition', enum: CopyCondition, required: false })
  @IsOptional()
  @IsEnum(CopyCondition, { message: 'Invalid condition' })
  condition?: CopyCondition;

  @ApiProperty({ description: 'Copy location', required: false })
  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;
} 