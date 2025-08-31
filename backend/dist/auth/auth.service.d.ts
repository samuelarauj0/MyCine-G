import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    register(registerDto: RegisterDto): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: any;
                name: any;
                email: any;
                role: any;
                xp: any;
                level: any;
                rank: any;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: any;
                name: any;
                email: any;
                role: any;
                xp: any;
                level: any;
                rank: any;
            };
        };
    }>;
    refresh(refreshToken: string): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: any;
                name: any;
                email: any;
                role: any;
                xp: any;
                level: any;
                rank: any;
            };
        };
    }>;
    validateUser(email: string, password: string): Promise<any>;
    private generateTokens;
}
