import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
        updatedAt: Date;
    }>;
    getLeaderboard(limit?: number): Promise<{
        id: string;
        name: string;
        xp: number;
        level: number;
        rank: import(".prisma/client").$Enums.Rank;
    }[]>;
    updateXpAndLevel(userId: string, xpToAdd: number): Promise<{
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
    private calculateLevel;
    private getXpForLevel;
    private calculateRank;
}
