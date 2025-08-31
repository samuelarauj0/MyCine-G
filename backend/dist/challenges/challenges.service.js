"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ChallengesService = class ChallengesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createChallengeDto) {
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
    async findUserChallenges(userId) {
        const activeChallenges = await this.prisma.challenge.findMany({
            where: { isActive: true },
        });
        const userChallenges = await Promise.all(activeChallenges.map(async (challenge) => {
            const userChallenge = await this.prisma.userChallenge.findFirst({
                where: {
                    userId,
                    challengeId: challenge.id,
                },
            });
            const currentProgress = await this.calculateProgress(userId, challenge);
            if (userChallenge) {
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
            }
            else {
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
        }));
        return userChallenges;
    }
    async calculateProgress(userId, challenge) {
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
    async claimReward(challengeId, userId) {
        const userChallenge = await this.prisma.userChallenge.findFirst({
            where: {
                userId,
                challengeId,
                isCompleted: true,
            },
            include: { challenge: true },
        });
        if (!userChallenge) {
            throw new common_1.NotFoundException('Challenge not completed or already claimed');
        }
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
    async update(id, updateChallengeDto) {
        return this.prisma.challenge.update({
            where: { id },
            data: updateChallengeDto,
        });
    }
    async remove(id) {
        return this.prisma.challenge.delete({
            where: { id },
        });
    }
};
exports.ChallengesService = ChallengesService;
exports.ChallengesService = ChallengesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChallengesService);
//# sourceMappingURL=challenges.service.js.map