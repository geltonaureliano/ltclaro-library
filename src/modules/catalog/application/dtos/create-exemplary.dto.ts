import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CopyStatus, CopyCondition } from '../../domain/entities/exemplary.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCopyDto {
  @ApiProperty({
    description: 'Unique identifier for the copy',
    example: 'CPY-12345',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Current status of the copy',
    enum: CopyStatus,
    example: CopyStatus.AVAILABLE,
  })
  @IsEnum(CopyStatus)
  status: CopyStatus;

  @ApiProperty({
    description: 'Physical condition of the copy',
    enum: CopyCondition,
    example: CopyCondition.GOOD,
  })
  @IsEnum(CopyCondition)
  condition: CopyCondition;

  @ApiProperty({
    description: 'Location of the copy in the library',
    example: 'Shelf A-12',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'ID of the book this copy belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  bookId: string;
} 