
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  private readonly rankThresholds = [
    { rank: 'Bronze', minXp: 0 },
    { rank: 'Prata', minXp: 100 },
    { rank: 'Ouro', minXp: 500 },
    { rank: 'Platina', minXp: 1000 },
    { rank: 'Diamante', minXp: 2500 },
    { rank: 'Mestre', minXp: 5000 },
    { rank: 'Grão-Mestre', minXp: 10000 },
  ];

  calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
  }

  calculateRank(xp: number): string {
    const rank = this.rankThresholds
      .slice()
      .reverse()
      .find(threshold => xp >= threshold.minXp);
    
    return rank?.rank || 'Bronze';
  }

  async updateUserLevelAndRank(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    const newLevel = this.calculateLevel(user.xp);
    const newRank = this.calculateRank(user.xp);

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        level: newLevel,
        rank: newRank,
      },
    });
  }

  async getLeaderboard(limit = 10) {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        xp: true,
        level: true,
        rank: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [
        { xp: 'desc' },
        { createdAt: 'asc' },
      ],
      take: limit,
    });
  }

  async getUserStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!user) return null;

    const nextRankThreshold = this.rankThresholds.find(
      threshold => threshold.minXp > user.xp
    );

    return {
      totalReviews: user._count.reviews,
      totalXp: user.xp,
      level: user.level,
      rank: user.rank,
      xpToNextRank: nextRankThreshold ? nextRankThreshold.minXp - user.xp : 0,
      nextRank: nextRankThreshold?.rank || 'Máximo',
    };
  }

  async getGlobalStats() {
    const [totalUsers, totalReviews, totalTitles] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.review.count(),
      this.prisma.title.count(),
    ]);

    return {
      totalUsers,
      totalReviews,
      totalTitles,
      averageReviewsPerUser: totalUsers > 0 ? Math.round(totalReviews / totalUsers) : 0,
    };
  }
}
