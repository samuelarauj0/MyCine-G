import { GamificationService } from './gamification.service';
export declare class GamificationController {
    private readonly gamificationService;
    constructor(gamificationService: GamificationService);
    getLeaderboard(limit?: string): Promise<{
        id: string;
        name: string;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        _count: {
            reviews: number;
        };
    }[]>;
    getUserStats(req: any): Promise<{
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
