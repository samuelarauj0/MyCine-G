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
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamificationService = class GamificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.rankThresholds = [
            { rank: 'Bronze', minXp: 0 },
            { rank: 'Prata', minXp: 100 },
            { rank: 'Ouro', minXp: 500 },
            { rank: 'Platina', minXp: 1000 },
            { rank: 'Diamante', minXp: 2500 },
            { rank: 'Mestre', minXp: 5000 },
            { rank: 'Grão-Mestre', minXp: 10000 },
        ];
    }
    calculateLevel(xp) {
        return Math.floor(xp / 100) + 1;
    }
    calculateRank(xp) {
        const rank = this.rankThresholds
            .slice()
            .reverse()
            .find(threshold => xp >= threshold.minXp);
        return rank?.rank || 'Bronze';
    }
    async updateUserLevelAndRank(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user)
            return null;
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
    async getUserStats(userId) {
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
        if (!user)
            return null;
        const nextRankThreshold = this.rankThresholds.find(threshold => threshold.minXp > user.xp);
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
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map