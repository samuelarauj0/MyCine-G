
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async create(createChallengeDto: CreateChallengeDto) {
    return this.prisma.challenge.create({
      data: createChallengeDto,
    });
  }

  async findAll() {
    return this.prisma.challenge.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUserChallenges(userId: string) {
    const activeChallenges = await this.prisma.challenge.findMany({
      where: { isActive: true },
    });

    const userChallenges = await Promise.all(
      activeChallenges.map(async (challenge) => {
        const userChallenge = await this.prisma.userChallenge.findFirst({
          where: {
            userId,
            challengeId: challenge.id,
          },
        });

        const currentProgress = await this.calculateProgress(userId, challenge);

        if (userChallenge) {
          // Update progress
          await this.prisma.userChallenge.update({
            where: { id: userChallenge.id },
            data: {
              currentProgress,
              isCompleted: currentProgress >= challenge.targetValue,
              completedAt: currentProgress >= challenge.targetValue && !userChallenge.isCompleted 
                ? new Date() 
                : userChallenge.completedAt,
            },
          });

          return this.prisma.userChallenge.findUnique({
            where: { id: userChallenge.id },
            include: { challenge: true },
          });
        } else {
          // Create new user challenge
          return this.prisma.userChallenge.create({
            data: {
              userId,
              challengeId: challenge.id,
              currentProgress,
              isCompleted: currentProgress >= challenge.targetValue,
              completedAt: currentProgress >= challenge.targetValue ? new Date() : null,
            },
            include: { challenge: true },
          });
        }
      })
    );

    return userChallenges;
  }

  private async calculateProgress(userId: string, challenge: any): Promise<number> {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));

    switch (challenge.type) {
      case 'DAILY':
        return this.prisma.review.count({
          where: {
            userId,
            createdAt: {
              gte: startOfDay,
            },
          },
        });

      case 'WEEKLY':
        return this.prisma.review.count({
          where: {
            userId,
            createdAt: {
              gte: startOfWeek,
            },
          },
        });

      case 'UNIQUE':
        return this.prisma.review.count({
          where: { userId },
        });

      default:
        return 0;
    }
  }

  async claimReward(challengeId: string, userId: string) {
    const userChallenge = await this.prisma.userChallenge.findFirst({
      where: {
        userId,
        challengeId,
        isCompleted: true,
      },
      include: { challenge: true },
    });

    if (!userChallenge) {
      throw new NotFoundException('Challenge not completed or already claimed');
    }

    // Award XP
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: userChallenge.challenge.xpReward,
        },
      },
    });

    return { message: 'Reward claimed successfully', xpAwarded: userChallenge.challenge.xpReward };
  }

  async update(id: string, updateChallengeDto: UpdateChallengeDto) {
    return this.prisma.challenge.update({
      where: { id },
      data: updateChallengeDto,
    });
  }

  async remove(id: string) {
    return this.prisma.challenge.delete({
      where: { id },
    });
  }
}
