import { Test, TestingModule } from '@nestjs/testing';
import { MergeKSorted } from './mergeksorted.helper';

describe('MinheapHelper', () => {
	let provider: MergeKSorted;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ MergeKSorted ]
		}).compile();

		provider = module.get<MergeKSorted>(MergeKSorted);
	});

	it('test n way merge', () => {
		let arrs = [
			[
				{ id: 2337, intersection: 2, time: '2020-01-1 01:04:00', speed: 81 },
				{ id: 2497, intersection: 2, time: '2020-01-1 01:45:00', speed: 48 },
				{ id: 2755, intersection: 2, time: '2020-01-1 11:01:00', speed: 30 },
				{ id: 2798, intersection: 2, time: '2020-01-1 15:37:00', speed: 32 },
				{ id: 2996, intersection: 2, time: '2022-01-2 01:30:00', speed: 99 }
			],
			[
				{ id: 2752, intersection: 1, time: '2020-01-11 06:38:00', speed: 53 },
				{ id: 2744, intersection: 1, time: '2020-01-11 10:24:00', speed: 55 },
				{ id: 2745, intersection: 1, time: '2020-01-12 13:42:00', speed: 47 },
				{ id: 2774, intersection: 1, time: '2021-01-15 22:50:00', speed: 37 },
				{ id: 2761, intersection: 1, time: '2021-01-21 09:27:00', speed: 66 }
			],
			[
				{ id: 27, intersection: 3, time: '2020-02-11 06:38:00', speed: 53 },
				{ id: 74, intersection: 3, time: '2021-03-15 22:50:00', speed: 37 },
				{ id: 1, intersection: 3, time: '2021-05-21 09:27:00', speed: 66 }
			]
		];
		console.log(provider.merge(arrs));
		expect(provider).toBeDefined();
	});
});
