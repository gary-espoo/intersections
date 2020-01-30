"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MergeksortedHelper {
    constructor() { }
    merge(arrays) {
        let result = [];
        let minHeap = [];
        arrays.forEach((array, index) => {
            minHeap.push({ arrayIndex: index, elementIndex: 0, value: array[0] });
        });
        this.heapify(minHeap);
        while (minHeap[0].value !== Infinity) {
            let top = minHeap[0];
            result.push(top.value);
            top.elementIndex += 1;
            if (top.elementIndex >= arrays[top.arrayIndex].length) {
                top.value = Infinity;
            }
            else {
                top.value = arrays[top.arrayIndex][top.elementIndex];
            }
            this.bubbleDown(minHeap, 0);
        }
        return result;
    }
    getChildIndices(index) {
        return [
            2 * index + 1,
            2 * index + 2
        ];
    }
    findMinChildIndex(minHeap, leftIndex, rightIndex) {
        let minChildIndex;
        let leftChild = minHeap[leftIndex];
        let rightChild = minHeap[rightIndex];
        if (leftChild !== undefined) {
            if (rightChild === undefined) {
                minChildIndex = leftIndex;
            }
            else {
                if (leftChild.value == Infinity) {
                    minChildIndex = rightIndex;
                }
                else {
                    minChildIndex = Date.parse(rightChild.value.time) < Date.parse(leftChild.value.time)
                        ? rightIndex
                        : leftIndex;
                }
            }
        }
        return minChildIndex;
    }
    bubbleDown(minHeap, index) {
        let currentIndex = index;
        let current = minHeap[currentIndex];
        let [leftIndex, rightIndex] = this.getChildIndices(currentIndex);
        let minChildIndex = this.findMinChildIndex(minHeap, leftIndex, rightIndex);
        let minChild = minChildIndex === undefined
            ? undefined
            : minHeap[minChildIndex];
        while (minChild !== undefined && (current.value == Infinity || Date.parse(current.value.time) > Date.parse(minChild.value.time))) {
            [minHeap[currentIndex], minHeap[minChildIndex]] = [minHeap[minChildIndex], minHeap[currentIndex]];
            currentIndex = minChildIndex;
            [leftIndex, rightIndex] = this.getChildIndices(currentIndex);
            minChildIndex = this.findMinChildIndex(minHeap, leftIndex, rightIndex);
            minChild = minChildIndex === undefined
                ? undefined
                : minHeap[minChildIndex];
        }
    }
    heapify(minHeap) {
        for (let i = minHeap.length - 1; i >= 0; i--) {
            this.bubbleDown(minHeap, i);
        }
    }
}
exports.MergeksortedHelper = MergeksortedHelper;
//# sourceMappingURL=mergeksorted.helper.js.map