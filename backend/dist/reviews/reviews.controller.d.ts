import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto, req: any): Promise<{
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
    findMyReviews(req: any): Promise<({
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
    update(id: string, updateReviewDto: UpdateReviewDto, req: any): Promise<{
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
    remove(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        titleId: string;
        rating: number;
        comment: string;
    }>;
}
