"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubricsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rubrics_service_1 = require("./rubrics.service");
const rubrics_controller_1 = require("./rubrics.controller");
const rubric_entity_1 = require("./entities/rubric.entity");
let RubricsModule = class RubricsModule {
};
exports.RubricsModule = RubricsModule;
exports.RubricsModule = RubricsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([rubric_entity_1.Rubric])],
        controllers: [rubrics_controller_1.RubricsController],
        providers: [rubrics_service_1.RubricsService],
        exports: [rubrics_service_1.RubricsService],
    })
], RubricsModule);
//# sourceMappingURL=rubrics.module.js.map