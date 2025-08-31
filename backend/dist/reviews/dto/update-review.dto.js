"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_review_dto_1 = require("./create-review.dto");
const swagger_2 = require("@nestjs/swagger");
class UpdateReviewDto extends (0, swagger_1.PartialType)((0, swagger_2.OmitType)(create_review_dto_1.CreateReviewDto, ['titleId'])) {
}
exports.UpdateReviewDto = UpdateReviewDto;
//# sourceMappingURL=update-review.dto.js.map