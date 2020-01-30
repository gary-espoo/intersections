import { Violation } from './interface/violation.interface';
import { DataQuery } from './interface/dataquery.interface';
import { MergeksortedHelper } from './mergeksorted.helper';
export declare class ViolationsStore {
    filters: any;
    mergerService: MergeksortedHelper;
    constructor();
    sortViolations(violations: Violation[]): void;
    mapIntersections(): void;
    findAll(query: DataQuery): any;
    getFilters(): any;
    getIntrFromZones(zones: number[]): number[];
    getIntrFromProjects(projects: number[]): number[];
    findIndex(time: any, intersection: any): number;
    getViolationSubSet(startTime: string, endTime: string, intersection: any[]): any[];
    getViolations(intersections: number[], startTime: string, endTime: string): any;
}
