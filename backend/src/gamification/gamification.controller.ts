import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('gamification')
@Controller('gamification')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('leaderboard')
  getLeaderboard(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.gamificationService.getLeaderboard(limitNumber);
  }

  @Get('user-stats')
  getUserStats(@Request() req: any) {
    return this.gamificationService.getUserStats(req.user.id);
  }

  @Get('global-stats')
  getGlobalStats() {
    return this.gamificationService.getGlobalStats();
  }
}