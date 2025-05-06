import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CopyStatus, CopyCondition } from '../../domain/entities/copy.entity';

export class CreateCopyDto {
  @ApiProperty({ description: 'Copy code', example: 'C001' })
  @IsString({ message: 'Code must be a string' })
  @IsNotEmpty({ message: 'Code cannot be empty' })
  code: string;

  @ApiProperty({ description: 'Copy status', enum: CopyStatus, example: CopyStatus.AVAILABLE })
  @IsEnum(CopyStatus, { message: 'Invalid status' })
  status: CopyStatus;

  @ApiProperty({ description: 'Copy condition', enum: CopyCondition, example: CopyCondition.NEW })
  @IsEnum(CopyCondition, { message: 'Invalid condition' })
  condition: CopyCondition;

  @ApiProperty({ description: 'Copy location', example: 'Shelf A1' })
  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location cannot be empty' })
  location: string;

  @ApiProperty({ description: 'Book ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID('4', { message: 'Invalid book ID' })
  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  bookId: string;
} 