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
exports.TitlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TitlesService = class TitlesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTitleDto) {
        return this.prisma.title.create({
            data: createTitleDto,
        });
    }
    async findAll(page = 1, limit = 20, search, type) {
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
                { director: { contains: search } },
                { cast: { contains: search } },
            ];
        }
        if (type && ['MOVIE', 'SERIES'].includes(type)) {
            where.type = type;
        }
        const [titles, total] = await Promise.all([
            this.prisma.title.findMany({
                where,
                skip,
                take: limit,
                include: {
                    reviews: {
                        select: {
                            rating: true,
                        },
                    },
                    _count: {
                        select: {
                            reviews: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }),
            this.prisma.title.count({ where }),
        ]);
        const titlesWithRating = titles.map(title => {
            const avgRating = title.reviews.length > 0
                ? title.reviews.reduce((sum, review) => sum + review.rating, 0) / title.reviews.length
                : 0;
            return {
                ...title,
                averageRating: Number(avgRating.toFixed(1)),
                reviewsCount: title._count.reviews,
                reviews: undefined,
                _count: undefined,
            };
        });
        return {
            titles: titlesWithRating,
            total,
            page,
            limit,
            pages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        const title = await this.prisma.title.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
        });
        if (!title) {
            throw new common_1.NotFoundException('Título não encontrado');
        }
        const avgRating = title.reviews.length > 0
            ? title.reviews.reduce((sum, review) => sum + review.rating, 0) / title.reviews.length
            : 0;
        return {
            ...title,
            averageRating: Number(avgRating.toFixed(1)),
            reviewsCount: title._count.reviews,
            _count: undefined,
        };
    }
    async update(id, updateTitleDto) {
        try {
            return await this.prisma.title.update({
                where: { id },
                data: updateTitleDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Título não encontrado');
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.title.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Título não encontrado');
            }
            throw error;
        }
    }
    async getPopular(limit = 10) {
        return this.prisma.title.findMany({
            take: limit,
            include: {
                reviews: {
                    select: {
                        rating: true,
                    },
                },
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
        });
    }
    async getRecentlyAdded(limit = 10) {
        return this.prisma.title.findMany({
            take: limit,
            include: {
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.TitlesService = TitlesService;
exports.TitlesService = TitlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TitlesService);
//# sourceMappingURL=titles.service.js.map