import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<{
        stats: {
            totalUsers: number;
            totalTitles: number;
            totalReviews: number;
            totalChallenges: number;
        };
        recentUsers: {
            id: string;
            name: string;
            email: string;
            xp: number;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
            createdAt: Date;
        }[];
        recentReviews: ({
            user: {
                id: string;
                name: string;
            };
            title: {
                title: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            titleId: string;
            rating: number;
            comment: string;
        })[];
        topRatedTitles: ({
            _count: {
                reviews: number;
            };
        } & {
            title: string;
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            type: import(".prisma/client").$Enums.TitleType;
            releaseDate: Date | null;
            director: string | null;
            cast: string | null;
            avgRating: number;
        })[];
    }>;
    getAllUsers(page?: number, limit?: number): Promise<{
        users: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            xp: number;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
            createdAt: Date;
            _count: {
                reviews: number;
            };
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getAllReviews(page?: number, limit?: number): Promise<{
        reviews: ({
            user: {
                id: string;
                name: string;
                email: string;
            };
            title: {
                title: string;
                id: string;
                type: import(".prisma/client").$Enums.TitleType;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            titleId: string;
            rating: number;
            comment: string;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    deleteUser(id: string): Promise<{
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
    deleteReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        titleId: string;
        rating: number;
        comment: string;
    }>;
    updateUserRole(id: string, body: {
        role: 'USER' | 'ADMIN';
    }): Promise<{
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
}
