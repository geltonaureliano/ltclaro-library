import { IsString, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CopyStatus, CopyCondition } from '../../domain/entities/copy.entity';

export class CreateCopyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ enum: CopyStatus })
  @IsEnum(CopyStatus)
  @IsNotEmpty()
  status: CopyStatus;

  @ApiProperty({ enum: CopyCondition })
  @IsEnum(CopyCondition)
  @IsNotEmpty()
  condition: CopyCondition;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  bookId: string;
} 