import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Violation } from './interface/violation.interface';
import { DataQuery } from './interface/dataquery.interface';
import { MergeKSorted } from './mergeksorted.helper';

var contents = JSON.parse(readFileSync(join(process.cwd(), 'data', 'data.json'), 'utf8'));
const pageSize = 50;

@Injectable()
export class ViolationsStore {
	initDataSet;
	constructor() {
		this.initDataSet = JSON.parse(JSON.stringify(contents.slice(0, 3)));
		console.log(this.initDataSet);
		this.sortViolations(contents[3].violations);
		this.mapIntersections();
	}

	sortViolations(violations: Violation[]) {
		const compare = (a: Violation, b: Violation): number => {
			if (Date.parse(a.time) > Date.parse(b.time)) {
				return 1;
			} else {
				return -1;
			}
		};

		violations.sort(compare);
	}

	mapIntersections() {
		let violations1: Violation[] = [],
			violations2: Violation[] = [],
			violations3: Violation[] = [],
			violations4: Violation[] = [];

		contents[3].violations.forEach((element, indx) => {
			switch (element.intersection) {
				case 1:
					violations1.push(element);
					break;
				case 2:
					violations2.push(element);
					break;
				case 3:
					violations3.push(element);
					break;
				case 4:
					violations4.push(element);
					break;
			}
		});
		contents[2].intersections.forEach((element, count) => {
			switch (count + 1) {
				case 1:
					element.violations = violations1;
					break;
				case 2:
					element.violations = violations2;
					break;
				case 3:
					element.violations = violations3;
					break;
				case 4:
					element.violations = violations4;
					break;
			}
		});
	}

	findAll(query: DataQuery): any {
		let { projects, intersections, offset } = query;
		let result = {
			offset: 0,
			count: 0,
			data: this.getViolations(intersections, offset)
		};
		return result;
	}

	initData() {
		return this.initDataSet;
	}
	//This function fetches all the zones from zone/zones
	getIntrFromZones(zones: number[]): number[] {
		let zonesStore = contents[1].zones;
		let result: number[] = [];
		zones.forEach((elem) => {
			result.push(zonesStore[elem - 1].intersections);
		});

		return Array.from(new Set(result.flat()));
	}

	getIntrFromProjects(projects: number[]): number[] {
		let projectsStore = contents[0].projects;
		let zones: number[] = [];
		projects.forEach((elem) => {
			zones.push(projectsStore[elem - 1].zones);
		});

		//remove duplicates by using set
		return this.getIntrFromZones(Array.from(new Set(zones.flat())));
	}

	getViolations(intersections: number[], offset: number) {
		let result = [];

		let intersectionOne = contents[2].intersections[0].violations,
			intersectionTwo = contents[2].intersections[1].violations,
			intersectionThree = contents[2].intersections[2].violations,
			intersectionFour = contents[2].intersections[3].violations;

		if (intersections.length === 0) {
			result = contents[3].violations;
		}

		if (intersections.length === 1) {
			switch (intersections[0] - 1) {
				case 0:
					result = intersectionOne;
					break;
				case 1:
					result = intersectionTwo;
					break;

				case 2:
					result = intersectionThree;
					break;

				case 3:
					result = intersectionFour;
					break;
			}
		}

		return result;
	}
}
