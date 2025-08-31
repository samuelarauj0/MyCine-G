
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalTitles,
      totalReviews,
      totalChallenges,
      recentUsers,
      recentReviews,
      topRatedTitles,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.title.count(),
      this.prisma.review.count(),
      this.prisma.challenge.count({ where: { isActive: true } }),
      this.prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          xp: true,
          level: true,
          rank: true,
          createdAt: true,
        },
      }),
      this.prisma.review.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          title: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),
      this.prisma.title.findMany({
        take: 10,
        include: {
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: {
          reviews: {
            _count: 'desc',
          },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalTitles,
        totalReviews,
        totalChallenges,
      },
      recentUsers,
      recentReviews,
      topRatedTitles,
    };
  }

  async getAllUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          xp: true,
          level: true,
          rank: true,
          createdAt: true,
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    return { users, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getAllReviews(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          title: {
            select: {
              id: true,
              title: true,
              type: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.review.count(),
    ]);

    return { reviews, total, page, totalPages: Math.ceil(total / limit) };
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async deleteReview(id: string) {
    return this.prisma.review.delete({
      where: { id },
    });
  }

  async updateUserRole(id: string, role: 'USER' | 'ADMIN') {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}
