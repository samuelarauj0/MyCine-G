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
exports.CreateChallengeDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var ChallengeType;
(function (ChallengeType) {
    ChallengeType["DAILY"] = "DAILY";
    ChallengeType["WEEKLY"] = "WEEKLY";
    ChallengeType["UNIQUE"] = "UNIQUE";
})(ChallengeType || (ChallengeType = {}));
class CreateChallengeDto {
    constructor() {
        this.isActive = true;
    }
}
exports.CreateChallengeDto = CreateChallengeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Challenge title' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChallengeDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Challenge description' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateChallengeDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ChallengeType, description: 'Challenge type' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(ChallengeType),
    __metadata("design:type", String)
], CreateChallengeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target value to complete challenge', minimum: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateChallengeDto.prototype, "targetValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'XP reward for completing challenge', minimum: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateChallengeDto.prototype, "xpReward", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether challenge is active', default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateChallengeDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-challenge.dto.js.map