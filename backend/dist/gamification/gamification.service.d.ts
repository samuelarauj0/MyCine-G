import { PrismaService } from '../prisma/prisma.service';
export declare class GamificationService {
    private prisma;
    constructor(prisma: PrismaService);
    private readonly rankThresholds;
    calculateLevel(xp: number): number;
    calculateRank(xp: number): string;
    updateUserLevelAndRank(userId: string): Promise<{
        id: string;
        name: string;
        username: string | null;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getLeaderboard(limit?: number): Promise<{
        id: string;
        name: string;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        _count: {
            reviews: number;
        };
    }[]>;
    getUserStats(userId: string): Promise<{
        totalReviews: number;
        totalXp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        xpToNextRank: number;
        nextRank: string;
    }>;
    getGlobalStats(): Promise<{
        totalUsers: number;
        totalReviews: number;
        totalTitles: number;
        averageReviewsPerUser: number;
    }>;
}
