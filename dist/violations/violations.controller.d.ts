import { ViolationsService } from './violations.service';
export declare class ViolationsController {
    private readonly violationsService;
    constructor(violationsService: ViolationsService);
    getFilters(): any;
    findWhere(query: any): any;
    sanitizeQuery(query: any): any;
}
