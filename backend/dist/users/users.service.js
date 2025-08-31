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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                xp: true,
                level: true,
                rank: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                passwordHash: true,
                role: true,
                xp: true,
                level: true,
                rank: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                passwordHash: true,
                role: true,
                xp: true,
                level: true,
                rank: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                xp: true,
                level: true,
                rank: true,
                updatedAt: true,
            },
        });
    }
    async getLeaderboard(limit = 50) {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                xp: true,
                level: true,
                rank: true,
            },
            orderBy: [
                { xp: 'desc' },
                { level: 'desc' },
            ],
            take: limit,
        });
    }
    async updateXpAndLevel(userId, xpToAdd) {
        const user = await this.findById(userId);
        const newXp = user.xp + xpToAdd;
        const newLevel = this.calculateLevel(newXp);
        const newRank = this.calculateRank(newLevel);
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                level: newLevel,
                rank: newRank,
            },
        });
    }
    calculateLevel(xp) {
        let level = 1;
        while (this.getXpForLevel(level + 1) <= xp) {
            level++;
        }
        return level;
    }
    getXpForLevel(level) {
        return 100 * level * (level - 1) / 2;
    }
    calculateRank(level) {
        if (level >= 40)
            return 'LEGEND';
        if (level >= 30)
            return 'GRANDMASTER';
        if (level >= 25)
            return 'MASTER';
        if (level >= 20)
            return 'DIAMOND';
        if (level >= 15)
            return 'PLATINUM';
        if (level >= 10)
            return 'GOLD';
        if (level >= 5)
            return 'SILVER';
        return 'BRONZE';
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map