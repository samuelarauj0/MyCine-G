declare enum ChallengeType {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    UNIQUE = "UNIQUE"
}
export declare class CreateChallengeDto {
    title: string;
    description: string;
    type: ChallengeType;
    targetValue: number;
    xpReward: number;
    isActive: boolean;
}
export {};
