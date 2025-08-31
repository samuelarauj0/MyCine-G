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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createReviewDto, userId) {
        const existingReview = await this.prisma.review.findFirst({
            where: {
                userId,
                titleId: createReviewDto.titleId,
            },
        });
        if (existingReview) {
            throw new common_1.ForbiddenException('You have already reviewed this title');
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
    async findByTitle(titleId, page = 1, limit = 10) {
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
    async findByUser(userId) {
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
    async update(id, updateReviewDto, userId, userRole) {
        const review = await this.prisma.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.userId !== userId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only edit your own reviews');
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
    async remove(id, userId, userRole) {
        const review = await this.prisma.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.userId !== userId && userRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('You can only delete your own reviews');
        }
        return this.prisma.review.delete({
            where: { id },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map