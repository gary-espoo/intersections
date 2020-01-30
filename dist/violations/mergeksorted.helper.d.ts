export declare class MergeksortedHelper {
    constructor();
    merge(arrays: any): any[];
    getChildIndices(index: any): number[];
    findMinChildIndex(minHeap: any, leftIndex: any, rightIndex: any): any;
    bubbleDown(minHeap: any, index: any): void;
    heapify(minHeap: any): void;
}
