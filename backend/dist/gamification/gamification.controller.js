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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationController = void 0;
const common_1 = require("@nestjs/common");
const gamification_service_1 = require("./gamification.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let GamificationController = class GamificationController {
    constructor(gamificationService) {
        this.gamificationService = gamificationService;
    }
    getLeaderboard(limit) {
        const limitNumber = limit ? parseInt(limit) : 10;
        return this.gamificationService.getLeaderboard(limitNumber);
    }
    getUserStats(req) {
        return this.gamificationService.getUserStats(req.user.id);
    }
    getGlobalStats() {
        return this.gamificationService.getGlobalStats();
    }
};
exports.GamificationController = GamificationController;
__decorate([
    (0, common_1.Get)('leaderboard'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Get)('user-stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)('global-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GamificationController.prototype, "getGlobalStats", null);
exports.GamificationController = GamificationController = __decorate([
    (0, swagger_1.ApiTags)('gamification'),
    (0, common_1.Controller)('gamification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [gamification_service_1.GamificationService])
], GamificationController);
//# sourceMappingURL=gamification.controller.js.map