import {Test, TestingModule} from '@nestjs/testing';
import {ViolationsService} from './violations.service';
import {ViolationsStore} from './violations.helpers';

describe('ViolationsService', () => {
    let service : ViolationsService;
    let controller : ViolationsStore;
    beforeEach(async() => {
        const module : TestingModule = await Test
            .createTestingModule({
            providers: [ViolationsStore, ViolationsService]
        })
            .compile();

        service = module.get < ViolationsService > (ViolationsService);
        controller = module.get < ViolationsStore > (ViolationsStore);
    });

    it('should be defined and return the correct filters', () => {
        expect(service.getFilters()).toBeDefined();
        expect(service.getFilters()[0].projects.length).toBe(4);
        expect(service.getFilters()[1].zones.length).toBe(4);
        expect(service.getFilters()[2].intersections.length).toBe(4);
        expect(typeof(service.findWhere({"intersections": [1], projects: [], startTime: null, endTime: null, zones: null}))).toBe('object');
    });
});

/*

	findWhere(query: DataQuery): Violation[] {
		return this.violationStore.findAll(query);
	}
	getFilters() {
*/
