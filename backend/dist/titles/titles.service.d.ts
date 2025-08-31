import { PrismaService } from '../prisma/prisma.service';
import { CreateTitleDto } from './dto/create-title.dto';
import { UpdateTitleDto } from './dto/update-title.dto';
export declare class TitlesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTitleDto: CreateTitleDto): Promise<{
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
    }>;
    findAll(page?: number, limit?: number, search?: string, type?: string): Promise<{
        titles: {
            averageRating: number;
            reviewsCount: number;
            reviews: any;
            _count: any;
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
        }[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    findOne(id: string): Promise<{
        averageRating: number;
        reviewsCount: number;
        _count: any;
        reviews: ({
            user: {
                id: string;
                username: string;
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
    }>;
    update(id: string, updateTitleDto: UpdateTitleDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
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
    }>;
    getPopular(limit?: number): Promise<({
        reviews: {
            rating: number;
        }[];
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
    })[]>;
    getRecentlyAdded(limit?: number): Promise<({
        reviews: {
            rating: number;
        }[];
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
    })[]>;
}
