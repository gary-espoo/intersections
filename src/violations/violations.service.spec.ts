import { Test, TestingModule } from '@nestjs/testing';
import { ViolationsService } from './violations.service';
import { ViolationsStore } from './violations.helpers';

describe('ViolationsService', () => {
	let service: ViolationsService;
	let controller: ViolationsStore;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ ViolationsStore, ViolationsService ]
		}).compile();

		service = module.get<ViolationsService>(ViolationsService);
		controller = module.get<ViolationsStore>(ViolationsStore);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
