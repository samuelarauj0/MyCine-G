
import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('gamification')
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('leaderboard')
  getLeaderboard(@Query('limit') limit?: number) {
    return this.gamificationService.getLeaderboard(limit ? parseInt(limit) : 10);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getUserStats(@Request() req) {
    return this.gamificationService.getUserStats(req.user.sub);
  }

  @Get('global-stats')
  getGlobalStats() {
    return this.gamificationService.getGlobalStats();
  }
}
