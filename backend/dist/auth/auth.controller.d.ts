import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refresh(refreshDto: RefreshDto): Promise<{
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
    getProfile(req: any): Promise<{
        data: any;
    }>;
}
