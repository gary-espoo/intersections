import {Injectable} from '@nestjs/common';
import {ViolationsStore} from './violations.helpers';
import {DataQuery} from './interface/dataquery.interface';
@Injectable()
export class ViolationsService {
    constructor(private readonly violationStore : ViolationsStore) {}

    findWhere(query : DataQuery) : any[] {
        return this
            .violationStore
            .findAll(query);
    }
    getFilters() {
        return this
            .violationStore
            .getFilters();
    }
}
