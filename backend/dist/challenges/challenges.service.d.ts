import { PrismaService } from '../prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
export declare class ChallengesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createChallengeDto: CreateChallengeDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.ChallengeKind;
        kind: import(".prisma/client").$Enums.ChallengeKind;
        criteria: import("@prisma/client/runtime/library").JsonValue;
        targetValue: number;
        isActive: boolean;
        xpReward: number;
        activeFrom: Date | null;
        activeTo: Date | null;
        expiresAt: Date | null;
    }>;
    findAll(): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.ChallengeKind;
        kind: import(".prisma/client").$Enums.ChallengeKind;
        criteria: import("@prisma/client/runtime/library").JsonValue;
        targetValue: number;
        isActive: boolean;
        xpReward: number;
        activeFrom: Date | null;
        activeTo: Date | null;
        expiresAt: Date | null;
    }[]>;
    findUserChallenges(userId: string): Promise<({
        challenge: {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            type: import(".prisma/client").$Enums.ChallengeKind;
            kind: import(".prisma/client").$Enums.ChallengeKind;
            criteria: import("@prisma/client/runtime/library").JsonValue;
            targetValue: number;
            isActive: boolean;
            xpReward: number;
            activeFrom: Date | null;
            activeTo: Date | null;
            expiresAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        challengeId: string;
        progress: number;
        currentValue: number;
        currentProgress: number;
        status: import(".prisma/client").$Enums.ChallengeStatus;
        isCompleted: boolean;
        isRewardClaimed: boolean;
        completedAt: Date | null;
        claimedAt: Date | null;
    })[]>;
    private calculateProgress;
    claimReward(challengeId: string, userId: string): Promise<{
        message: string;
        xpAwarded: number;
    }>;
    update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.ChallengeKind;
        kind: import(".prisma/client").$Enums.ChallengeKind;
        criteria: import("@prisma/client/runtime/library").JsonValue;
        targetValue: number;
        isActive: boolean;
        xpReward: number;
        activeFrom: Date | null;
        activeTo: Date | null;
        expiresAt: Date | null;
    }>;
    remove(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: import(".prisma/client").$Enums.ChallengeKind;
        kind: import(".prisma/client").$Enums.ChallengeKind;
        criteria: import("@prisma/client/runtime/library").JsonValue;
        targetValue: number;
        isActive: boolean;
        xpReward: number;
        activeFrom: Date | null;
        activeTo: Date | null;
        expiresAt: Date | null;
    }>;
}
