import {UseInterceptors,CacheInterceptor,Controller, Get, Query} from '@nestjs/common';
import {ViolationsService} from './violations.service';


//Cache added 
@UseInterceptors(CacheInterceptor)
@Controller('api/violations')
export class ViolationsController {
    constructor(private readonly violationsService : ViolationsService) {}

    @Get('init')
    getFilters() : any {

        return this
            .violationsService
            .getFilters();
    }
    @Get()
    findWhere(@Query()query) : any {
        if(this.sanitizeQuery(query)) {
            return this
                .violationsService
                .findWhere(query);
        } else {
            return [];
        }
    }

    sanitizeQuery(query : any) : any {

        if(query.hasOwnProperty('intersections')) {
            ``
            query['intersections'] = query['intersections']
                .split(',')
                .map((i) => parseInt(i));
        } else {
            query['intersections'] = [1, 2, 3, 4];
        }


        return query;
    }
}
