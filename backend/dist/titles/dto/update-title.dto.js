"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTitleDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_title_dto_1 = require("./create-title.dto");
class UpdateTitleDto extends (0, swagger_1.PartialType)(create_title_dto_1.CreateTitleDto) {
}
exports.UpdateTitleDto = UpdateTitleDto;
//# sourceMappingURL=update-title.dto.js.map