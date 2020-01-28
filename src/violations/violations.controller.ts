import { Controller, Get, Query } from '@nestjs/common';
import { ViolationsService } from './violations.service';
import { DataQuery } from './interface/dataquery.interface';
@Controller('api/violations')
export class ViolationsController {
	constructor(private readonly violationsService: ViolationsService) {}
	@Get('init')
	getInitData(): any {
		return this.violationsService.getInitialData();
	}
	@Get()
	findWhere(@Query() query): any {
		if (this.sanitizeQuery(query)) {
			return this.violationsService.findWhere(query);
		} else {
			return [];
		}
	}

	sanitizeQuery(query: any): any {
		console.log(query);
		if (query.hasOwnProperty('projects')) {
			query['projects'] = query['projects'].split(',').map((i) => parseInt(i));
		}
		if (query.hasOwnProperty('intersections')) {
			query['intersections'] = query['intersections'].split(',').map((i) => parseInt(i));
		}
		if (query.hasOwnProperty('zones')) {
			query['zones'] = query['zones'].split(',').map((i) => parseInt(i));
		}
		if (query.hasOwnProperty('offset')) {
			query['offset'] = parseInt(query['offset']);
		}
		console.log(query);
		return query;
	}
}
