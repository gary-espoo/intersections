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
const common_1 = require("@nestjs/common");
const violations_service_1 = require("./violations.service");
let ViolationsController = class ViolationsController {
    constructor(violationsService) {
        this.violationsService = violationsService;
    }
    getFilters() {
        return this
            .violationsService
            .getFilters();
    }
    findWhere(query) {
        if (this.sanitizeQuery(query)) {
            return this
                .violationsService
                .findWhere(query);
        }
        else {
            return [];
        }
    }
    sanitizeQuery(query) {
        if (query.hasOwnProperty('intersections')) {
            ``;
            query['intersections'] = query['intersections']
                .split(',')
                .map((i) => parseInt(i));
        }
        else {
            query['intersections'] = [1, 2, 3, 4];
        }
        return query;
    }
};
__decorate([
    common_1.Get('init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ViolationsController.prototype, "getFilters", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ViolationsController.prototype, "findWhere", null);
ViolationsController = __decorate([
    common_1.UseInterceptors(common_1.CacheInterceptor),
    common_1.Controller('api/violations'),
    __metadata("design:paramtypes", [violations_service_1.ViolationsService])
], ViolationsController);
exports.ViolationsController = ViolationsController;
//# sourceMappingURL=violations.controller.js.map