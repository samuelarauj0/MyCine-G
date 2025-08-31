
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto, userId: string) {
    // Check if user already reviewed this title
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        titleId: createReviewDto.titleId,
      },
    });

    if (existingReview) {
      throw new ForbiddenException('You have already reviewed this title');
    }

    const review = await this.prisma.review.create({
      data: {
        ...createReviewDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            level: true,
            rank: true,
          },
        },
        title: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Award XP for reviewing
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: 10,
        },
      },
    });

    return review;
  }

  async findByTitle(titleId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { titleId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              level: true,
              rank: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.review.count({
        where: { titleId },
      }),
    ]);

    return { reviews, total };
  }

  async findByUser(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      include: {
        title: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto, userId: string, userRole: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only edit your own reviews');
    }

    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            level: true,
            rank: true,
          },
        },
        title: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string, userRole: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    if (review.userId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    return this.prisma.review.delete({
      where: { id },
    });
  }
}
