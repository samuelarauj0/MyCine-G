import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createReviewDto: CreateReviewDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        titleId: string;
        rating: number;
        comment: string;
    }>;
    findByTitle(titleId: string, page?: number, limit?: number): Promise<{
        reviews: ({
            user: {
                id: string;
                name: string;
                level: number;
                rank: import(".prisma/client").$Enums.Rank;
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
    }>;
    findByUser(userId: string): Promise<({
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
    })[]>;
    update(id: string, updateReviewDto: UpdateReviewDto, userId: string, userRole: string): Promise<{
        user: {
            id: string;
            name: string;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
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
    }>;
    remove(id: string, userId: string, userRole: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        titleId: string;
        rating: number;
        comment: string;
    }>;
}
