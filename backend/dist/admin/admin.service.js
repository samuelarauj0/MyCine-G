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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDashboardStats() {
        const [totalUsers, totalTitles, totalReviews, totalChallenges, recentUsers, recentReviews, topRatedTitles,] = await Promise.all([
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
    async deleteUser(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async deleteReview(id) {
        return this.prisma.review.delete({
            where: { id },
        });
    }
    async updateUserRole(id, role) {
        return this.prisma.user.update({
            where: { id },
            data: { role },
        });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map