import { Injectable } from '@nestjs/common';
import { ViolationsStore } from './violations.helpers';
import { Violation } from './interface/violation.interface';
import { DataQuery } from './interface/dataquery.interface';
@Injectable()
export class ViolationsService {
	constructor(private readonly violationStore: ViolationsStore) {}

	findWhere(query: DataQuery): Violation[] {
		return this.violationStore.findAll(query);
	}
	getInitialData() {
		return this.violationStore.initData();
	}
}
