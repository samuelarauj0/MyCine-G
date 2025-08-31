
import { Controller, Get, Patch, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID (ADMIN or owner only)' })
  @ApiResponse({ status: 200, description: 'User data' })
  async getUserById(@Param('id') id: string, @Request() req) {
    // Allow user to see their own profile or admin to see any profile
    if (req.user.id !== id && req.user.role !== UserRole.ADMIN) {
      throw new Error('Forbidden');
    }
    
    const user = await this.usersService.findById(id);
    return {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        xp: user.xp,
        level: user.level,
        rank: user.rank,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(req.user.id, updateUserDto);
    return {
      data: user,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get leaderboard' })
  @ApiResponse({ status: 200, description: 'Leaderboard data' })
  async getLeaderboard(@Query('limit') limit?: string) {
    const users = await this.usersService.getLeaderboard(
      limit ? parseInt(limit) : 50
    );
    return {
      data: users,
    };
  }
}
