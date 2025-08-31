
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        level: true,
        rank: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        xp: true,
        level: true,
        rank: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        xp: true,
        level: true,
        rank: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        level: true,
        rank: true,
        updatedAt: true,
      },
    });
  }

  async getLeaderboard(limit = 50) {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        xp: true,
        level: true,
        rank: true,
      },
      orderBy: [
        { xp: 'desc' },
        { level: 'desc' },
      ],
      take: limit,
    });
  }

  async updateXpAndLevel(userId: string, xpToAdd: number) {
    const user = await this.findById(userId);
    const newXp = user.xp + xpToAdd;
    const newLevel = this.calculateLevel(newXp);
    const newRank = this.calculateRank(newLevel);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXp,
        level: newLevel,
        rank: newRank,
      },
    });
  }

  private calculateLevel(xp: number): number {
    // XP(L) = 100 * L * (L - 1) / 2
    // Find highest level where XP(L) <= xp
    let level = 1;
    while (this.getXpForLevel(level + 1) <= xp) {
      level++;
    }
    return level;
  }

  private getXpForLevel(level: number): number {
    return 100 * level * (level - 1) / 2;
  }

  private calculateRank(level: number): string {
    if (level >= 40) return 'LEGEND';
    if (level >= 30) return 'GRANDMASTER';
    if (level >= 25) return 'MASTER';
    if (level >= 20) return 'DIAMOND';
    if (level >= 15) return 'PLATINUM';
    if (level >= 10) return 'GOLD';
    if (level >= 5) return 'SILVER';
    return 'BRONZE';
  }
}
