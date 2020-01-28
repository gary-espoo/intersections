import { Test, TestingModule } from '@nestjs/testing';
import { ViolationsStore } from './violations.helpers';

describe('Violations Controller', () => {
	let controller: ViolationsStore;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ ViolationsStore ]
		}).compile();

		controller = module.get<ViolationsStore>(ViolationsStore);
	});
	/*
  Zones
  { 
    "id": 1, 
    "name": "DEFAULT",
    "intersections": [1,2,3,4]
},
{ 
    "id": 2, 
    "name": "DXB",
    "intersections": [1]
},
{ 
    "id": 3, 
    "name": "AD",
    "intersections": [2]
},
{ 
    "id": 4, 
    "name": "RAK",
    "intersections": [2, 3]
}
 */
	it('test the intersections from the zones', () => {
		expect(controller.getIntrFromZones).toBeDefined();
		expect(controller.getIntrFromZones([ 1 ])).toStrictEqual([ 1, 2, 3, 4 ]);
		expect(controller.getIntrFromZones([ 2 ])).toStrictEqual([ 1 ]);
		expect(controller.getIntrFromZones([ 3 ])).toStrictEqual([ 2 ]);
		expect(controller.getIntrFromZones([ 4 ])).toStrictEqual([ 2, 3 ]);
		expect(controller.getIntrFromZones([ 1, 2 ])).toStrictEqual([ 1, 2, 3, 4 ]);
		expect(controller.getIntrFromZones([ 2, 1 ])).toStrictEqual([ 1, 2, 3, 4 ]);
		expect(controller.getIntrFromZones([ 2, 3 ])).toStrictEqual([ 1, 2 ]);
		expect(controller.getIntrFromZones([ 2, 4 ])).toStrictEqual([ 1, 2, 3 ]);
		expect(controller.getIntrFromZones([ 1, 2, 3 ])).toStrictEqual([ 1, 2, 3, 4 ]);
	});

	/*

        "projects": [
            {
                "id": 1,
                "name": "Project A",
                "zones": [1, 2]
            },
            {
                "id": 2,
                "name": "Project B",
                "zones": [1, 2, 3]
            },
            {
                "id": 3,
                "name": "Project C",
                "zones": [1, 4]
            },
            {
                "id": 4,
                "name": "Project D",
                "zones": [1]
            }
        ]
    },
},
*/
	it('test the intersections from the projects', () => {
		expect(controller.getIntrFromProjects).toBeDefined();
		expect(controller.getIntrFromProjects([ 1 ])).toStrictEqual([ 1, 2, 3, 4 ]);
		expect(controller.getIntrFromProjects([ 1, 2 ])).toStrictEqual([ 1, 2, 3, 4 ]);
	});
});
