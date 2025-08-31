
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TitlesService {
  constructor(private prisma: PrismaService) {}

  async create(createTitleDto: CreateTitleDto) {
    return this.prisma.title.create({
      data: createTitleDto,
    });
  }

  async findAll(page: number = 1, limit: number = 20, search?: string, type?: string) {
    const skip = (page - 1) * limit;
    const where: Prisma.TitleWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { director: { contains: search } },
        { cast: { contains: search } },
      ];
    }

    if (type && ['MOVIE', 'SERIES'].includes(type)) {
      where.type = type as any;
    }

    const [titles, total] = await Promise.all([
      this.prisma.title.findMany({
        where,
        skip,
        take: limit,
        include: {
          reviews: {
            select: {
              rating: true,
            },
          },
          _count: {
            select: {
              reviews: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.title.count({ where }),
    ]);

    // Calculate average rating for each title
    const titlesWithRating = titles.map(title => {
      const avgRating = title.reviews.length > 0
        ? title.reviews.reduce((sum, review) => sum + review.rating, 0) / title.reviews.length
        : 0;

      return {
        ...title,
        averageRating: Number(avgRating.toFixed(1)),
        reviewsCount: title._count.reviews,
        reviews: undefined,
        _count: undefined,
      };
    });

    return {
      titles: titlesWithRating,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const title = await this.prisma.title.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!title) {
      throw new NotFoundException('Título não encontrado');
    }

    // Calculate average rating
    const avgRating = title.reviews.length > 0
      ? title.reviews.reduce((sum, review) => sum + review.rating, 0) / title.reviews.length
      : 0;

    return {
      ...title,
      averageRating: Number(avgRating.toFixed(1)),
      reviewsCount: title._count.reviews,
      _count: undefined,
    };
  }

  async update(id: string, updateTitleDto: UpdateTitleDto) {
    try {
      return await this.prisma.title.update({
        where: { id },
        data: updateTitleDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Título não encontrado');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.title.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Título não encontrado');
      }
      throw error;
    }
  }

  async getPopular(limit: number = 10) {
    return this.prisma.title.findMany({
      take: limit,
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
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
    });
  }

  async getRecentlyAdded(limit: number = 10) {
    return this.prisma.title.findMany({
      take: limit,
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
