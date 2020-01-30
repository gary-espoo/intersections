import {Test, TestingModule} from '@nestjs/testing';
import {ViolationsStore} from './violations.helpers';

describe('Violations Controller', () => {
    let controller : ViolationsStore;

    beforeEach(async() => {
        const module : TestingModule = await Test
            .createTestingModule({controllers: [ViolationsStore]})
            .compile();

        controller = module.get < ViolationsStore > (ViolationsStore);
    });

    it('test the intersections from the zones', () => {
        expect(controller.getIntrFromZones).toBeDefined();
        expect(controller.getIntrFromZones([1])).toStrictEqual([1, 2, 3, 4]);
        expect(controller.getIntrFromZones([2])).toStrictEqual([1]);
        expect(controller.getIntrFromZones([3])).toStrictEqual([2]);
        expect(controller.getIntrFromZones([4])).toStrictEqual([2, 3]);
        expect(controller.getIntrFromZones([1, 2])).toStrictEqual([1, 2, 3, 4]);
        expect(controller.getIntrFromZones([2, 1])).toStrictEqual([1, 2, 3, 4]);
        expect(controller.getIntrFromZones([2, 3])).toStrictEqual([1, 2]);
        expect(controller.getIntrFromZones([2, 4])).toStrictEqual([1, 2, 3]);
        expect(controller.getIntrFromZones([1, 2, 3])).toStrictEqual([1, 2, 3, 4]);
    });

    it('test the intersections from the projects', () => {
        expect(controller.getIntrFromProjects).toBeDefined();
        expect(controller.getIntrFromProjects([1])).toStrictEqual([1, 2, 3, 4]);
        expect(controller.getIntrFromProjects([1, 2])).toStrictEqual([1, 2, 3, 4]);

    });

    it('test the Filters from the projects', () => {

        expect(controller.getFilters()[0].projects.length).toBe(4);
        expect(controller.getFilters()[1].zones.length).toBe(4);
        expect(controller.getFilters()[2].intersections.length).toBe(4);

    });

    it('test the total violations from the projects', () => {
        let response = controller.findAll({
            "intersections": [
                1, 2, 3, 4
            ],
            projects: [],
            startTime: null,
            endTime: null,
            zones: null
        });
        expect(response.data.length).toBe(2999);
    });

    it('test the individual violations from the projects', () => {
        let response = controller.findAll({"intersections": [1], projects: [], startTime: null, endTime: null, zones: null});
        //Intersection  1 has length 488
        let lengthOne = response.data.length;
        expect(lengthOne).toBe(488);

        response = controller.findAll({"intersections": [2], projects: [], startTime: null, endTime: null, zones: null});

        //Intersection  2 has length 999
        let lengthTwo = response.data.length;
        expect(lengthTwo).toBe(999);

        response = controller.findAll({"intersections": [3], projects: [], startTime: null, endTime: null, zones: null});

        //Intersection  3 has length 1010
        let lengthThree = response.data.length;
        expect(lengthThree).toBe(1010);

        response = controller.findAll({"intersections": [4], projects: [], startTime: null, endTime: null, zones: null});

        //Intersection  4 has length
        let lengthFour = response.data.length;
        expect(lengthFour).toBe(502);

        //Total violations are 2999
        expect(lengthOne + lengthTwo + lengthThree + lengthFour).toBe(2999);
    });
    it('test the Filters from the projects', () => {

        let response = controller.findAll({
            "intersections": [
                1, 2
            ],
            "startTime": "1577960520000",
            "endTime": "1578133320000",
            projects: [],
            zones: null
        });

        //Intersection  1 has length 488
        expect(response.data.length).toBe(102);
    });

    it('test the Filters from the projects', () => {

        let response = controller.findAll({
            "intersections": [
                1, 2, 3
            ],
            "startTime": "1577960520000",
            "endTime": "1578133320000",
            projects: [],
            zones: null
        });

        //Intersection  1 has length 488
        expect(response.data.length).toBe(168);
    });

});
