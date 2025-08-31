import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUserById(id: string, req: any): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            xp: number;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            xp: number;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
            updatedAt: Date;
        };
    }>;
    getLeaderboard(limit?: string): Promise<{
        data: {
            id: string;
            name: string;
            xp: number;
            level: number;
            rank: import(".prisma/client").$Enums.Rank;
        }[];
    }>;
}
