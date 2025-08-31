
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsBoolean, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ChallengeType {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  UNIQUE = 'UNIQUE',
}

export class CreateChallengeDto {
  @ApiProperty({ description: 'Challenge title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Challenge description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: ChallengeType, description: 'Challenge type' })
  @IsNotEmpty()
  @IsEnum(ChallengeType)
  type: ChallengeType;

  @ApiProperty({ description: 'Target value to complete challenge', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  targetValue: number;

  @ApiProperty({ description: 'XP reward for completing challenge', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  xpReward: number;

  @ApiProperty({ description: 'Whether challenge is active', default: true })
  @IsBoolean()
  isActive: boolean = true;
}
