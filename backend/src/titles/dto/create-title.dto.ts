
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTitleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: ['MOVIE', 'SERIES'] })
  @IsEnum(['MOVIE', 'SERIES'])
  type: 'MOVIE' | 'SERIES';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cast?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  posterUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  trailerUrl?: string;
}
