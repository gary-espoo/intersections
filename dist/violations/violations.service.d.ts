import { ViolationsStore } from './violations.helpers';
import { DataQuery } from './interface/dataquery.interface';
export declare class ViolationsService {
    private readonly violationStore;
    constructor(violationStore: ViolationsStore);
    findWhere(query: DataQuery): any[];
    getFilters(): any;
}
