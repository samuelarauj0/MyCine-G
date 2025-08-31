
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TitlesModule } from './titles/titles.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ChallengesModule } from './challenges/challenges.module';
import { GamificationModule } from './gamification/gamification.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    TitlesModule,
    ReviewsModule,
    ChallengesModule,
    GamificationModule,
    AdminModule,
  ],
})
export class AppModule {}
