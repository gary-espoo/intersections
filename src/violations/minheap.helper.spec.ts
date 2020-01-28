import { Test, TestingModule } from '@nestjs/testing';
import { MinheapHelper } from './minheap.helper';

describe('MinheapHelper', () => {
	let provider: MinheapHelper;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ MinheapHelper ]
		}).compile();

		provider = module.get<MinheapHelper>(MinheapHelper);
	});

	it('should be defined', () => {
		let arrs = [ [ 5, 6, 8, 16 ], [ 3, 7, 12, 13 ], [ 1, 10, 11, 15 ], [ 2, 4, 9, 14 ] ];
		console.log(provider.mergeKSorted(arrs));
		expect(provider).toBeDefined();
		//expect(provider.mergeKSorted(arrs)).toStrictEqual[(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)];
	});
});
