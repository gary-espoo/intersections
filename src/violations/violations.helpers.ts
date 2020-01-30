import {Injectable} from '@nestjs/common';
import {join} from 'path';
import {readFileSync} from 'fs';
import {Violation} from './interface/violation.interface';
import {DataQuery} from './interface/dataquery.interface';
import {MergeksortedHelper} from './mergeksorted.helper';

var contents = JSON.parse(readFileSync(join(process.cwd(), 'data', 'data.json'), 'utf8'));

// Some dates are incorrect sanitize the data set self executing function runs
// once
(function sanitizeDates(dates : any[]) {
    dates.forEach(d => {
        d.time = d
            .time
            .match(/-0 /g)
            ? d
                .time
                .replace('-0 ', '-01 ')
            : d.time;
    })
})(contents[3].violations)

@Injectable()
export class ViolationsStore {
    //Fileters for the front end
    filters;

    //Service to merge the sorted data arrays
    mergerService : MergeksortedHelper;

    constructor() {
        //Filters for the Front End
        this.filters = JSON.parse(JSON.stringify(contents.slice(0, 3)));
        //Sort the violations by time
        this.sortViolations(contents[3].violations);
        //map the violations with the intersections
        this.mapIntersections();
        //this service merges the various intersections data in one final array
        this.mergerService = new MergeksortedHelper();
    }

    //Sorts the violations by their time  stamp
    sortViolations(violations : Violation[]) {
        const compare = (a : Violation, b : Violation) : number => {
            if (Date.parse(a.time) > Date.parse(b.time)) {
                return 1;
            } else {
                return -1;
            }
        };

        violations = violations.sort(compare);
    }

    //Adding t
    mapIntersections() {
        let violations1 : Violation[] = [],
            violations2 : Violation[] = [],
            violations3 : Violation[] = [],
            violations4 : Violation[] = [];

        contents[3]
            .violations
            .forEach((element, indx) => {
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

        contents[2]
            .intersections
            .forEach((element, count) => {
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

    findAll(query : DataQuery) : any {
        let { intersections, startTime, endTime} = query;
        let data = this.getViolations(intersections, startTime, endTime)
        let result = {
            count: data.length,            
            data:data,            
        };
        return result;
    }

    getFilters() {
        return this.filters;
    }
    //This function fetches all the zones from zone/zones
    getIntrFromZones(zones : number[]) : number[] {
        let zonesStore = contents[1].zones;
        let result : number[] = [];
        zones.forEach((elem) => {
            result.push(zonesStore[elem - 1].intersections);
        });

        return Array.from(new Set(result.flat()));
    }

    getIntrFromProjects(projects : number[]) : number[] {
        let projectsStore = contents[0].projects;
        let zones : number[] = [];
        projects.forEach((elem) => {
            zones.push(projectsStore[elem - 1].zones);
        });

        //remove duplicates by using set
        return this.getIntrFromZones(Array.from(new Set(zones.flat())));
    }

    // Find the index by doing binary search in the sorted array and find the index
    // of the next bigger element
    findIndex(time, intersection) {

        let start = 0,
            end = intersection.length - 1;
        // No need to parse it again and again in the for loop
        if (time > Date.parse(intersection[end].time)) {
            return null;
        }
        if (time <= Date.parse(intersection[start].time)) {
            return start;
        }
        // Iterate while start not meets end
        while (start <= end) {

            // Find the mid index
            let mid = Math.floor((start + end) / 2);

            // If element is present at mid, return True
            let currntTime = Date.parse(intersection[mid].time);

            if (currntTime === time) 
                return mid; // Else look in left or right half accordingly
            else if (currntTime < time) {
                let nxtTime = Date.parse(intersection[mid + 1].time);

                if ((currntTime < time) && (time < nxtTime)) {
                    return mid + 1;
                } else {
                    start = mid + 1;
                }

            } else {
                let prevTime = Date.parse(intersection[mid - 1].time);

                if ((prevTime < time) && (time < currntTime)) {
                    return mid - 1;
                } else {
                    end = mid - 1;
                }

            }

        }
    }
    //Get the subset by getting the
    getViolationSubSet(startTime : string, endTime : string, intersection : any[]) {
        let startInd = 0,
            endInd = intersection.length;
        if (startTime) {
            startInd = this.findIndex(startTime, intersection);
        }
        if (endTime) {
            endInd = this.findIndex(endTime, intersection);
            endInd = (endInd + 1 < intersection.length
                ? endInd + 1
                : endInd);
        }
        return intersection.slice(startInd, endInd);
    }

    getViolations(intersections : number[], startTime : string, endTime : string) {
        let result = [];
        //Sorted Violations in the intersections
        let intersectionOne = contents[2].intersections[0].violations,
            intersectionTwo = contents[2].intersections[1].violations,
            intersectionThree = contents[2].intersections[2].violations,
            intersectionFour = contents[2].intersections[3].violations;

        if (!intersections || intersections.length === 0) {
            return contents[3].violations;
        }
        //find the sub array from single intersection
        intersections.forEach(elem => {
            switch (elem - 1) {
                case 0:
                    result.push(this.getViolationSubSet(startTime, endTime, intersectionOne));
                    break;

                case 1:
                    result.push(this.getViolationSubSet(startTime, endTime, intersectionTwo));
                    break;

                case 2:
                    result.push(this.getViolationSubSet(startTime, endTime, intersectionThree));
                    break;

                case 3:
                    result.push(this.getViolationSubSet(startTime, endTime, intersectionFour));
                    break;
            }
        });
        if(intersections.length == 1){
            return result.flat();
        }
        //Merge the subsets
        result = this
            .mergerService
            .merge(result);

        // if (intersections.length === 1) {
        //     switch (intersections[0] - 1) {
        //         case 0:
        //             result = intersectionOne;
        //             break;
        //         case 1:
        //             result = intersectionTwo;
        //             break;

        //         case 2:
        //             result = intersectionThree;
        //             break;

        //         case 3:
        //             result = intersectionFour;
        //             break;
        //     }
        // }

        return result;
    }
}