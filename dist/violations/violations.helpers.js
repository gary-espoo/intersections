"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const mergeksorted_helper_1 = require("./mergeksorted.helper");
var contents = JSON.parse(fs_1.readFileSync(path_1.join(process.cwd(), 'data', 'data.json'), 'utf8'));
(function sanitizeDates(dates) {
    dates.forEach(d => {
        d.time = d
            .time
            .match(/-0 /g)
            ? d
                .time
                .replace('-0 ', '-01 ')
            : d.time;
    });
})(contents[3].violations);
let ViolationsStore = class ViolationsStore {
    constructor() {
        this.filters = JSON.parse(JSON.stringify(contents.slice(0, 3)));
        this.sortViolations(contents[3].violations);
        this.mapIntersections();
        this.mergerService = new mergeksorted_helper_1.MergeksortedHelper();
    }
    sortViolations(violations) {
        const compare = (a, b) => {
            if (Date.parse(a.time) > Date.parse(b.time)) {
                return 1;
            }
            else {
                return -1;
            }
        };
        violations = violations.sort(compare);
    }
    mapIntersections() {
        let violations1 = [], violations2 = [], violations3 = [], violations4 = [];
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
    findAll(query) {
        let { intersections, startTime, endTime } = query;
        let data = this.getViolations(intersections, startTime, endTime);
        let result = {
            count: data.length,
            data: data,
        };
        return result;
    }
    getFilters() {
        return this.filters;
    }
    getIntrFromZones(zones) {
        let zonesStore = contents[1].zones;
        let result = [];
        zones.forEach((elem) => {
            result.push(zonesStore[elem - 1].intersections);
        });
        return Array.from(new Set(result.flat()));
    }
    getIntrFromProjects(projects) {
        let projectsStore = contents[0].projects;
        let zones = [];
        projects.forEach((elem) => {
            zones.push(projectsStore[elem - 1].zones);
        });
        return this.getIntrFromZones(Array.from(new Set(zones.flat())));
    }
    findIndex(time, intersection) {
        let start = 0, end = intersection.length - 1;
        if (time > Date.parse(intersection[end].time)) {
            return null;
        }
        if (time <= Date.parse(intersection[start].time)) {
            return start;
        }
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            let currntTime = Date.parse(intersection[mid].time);
            if (currntTime === time)
                return mid;
            else if (currntTime < time) {
                let nxtTime = Date.parse(intersection[mid + 1].time);
                if ((currntTime < time) && (time < nxtTime)) {
                    return mid + 1;
                }
                else {
                    start = mid + 1;
                }
            }
            else {
                let prevTime = Date.parse(intersection[mid - 1].time);
                if ((prevTime < time) && (time < currntTime)) {
                    return mid - 1;
                }
                else {
                    end = mid - 1;
                }
            }
        }
    }
    getViolationSubSet(startTime, endTime, intersection) {
        let startInd = 0, endInd = intersection.length;
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
    getViolations(intersections, startTime, endTime) {
        let result = [];
        let intersectionOne = contents[2].intersections[0].violations, intersectionTwo = contents[2].intersections[1].violations, intersectionThree = contents[2].intersections[2].violations, intersectionFour = contents[2].intersections[3].violations;
        if (!intersections || intersections.length === 0) {
            return contents[3].violations;
        }
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
        if (intersections.length == 1) {
            return result.flat();
        }
        result = this
            .mergerService
            .merge(result);
        return result;
    }
};
ViolationsStore = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ViolationsStore);
exports.ViolationsStore = ViolationsStore;
//# sourceMappingURL=violations.helpers.js.map