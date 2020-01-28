export class MergeKSorted {
	constructor(parameters) {}

	merge(arrays) {
		let result = [];

		let minHeap = [];

		arrays.forEach((array, index) => {
			minHeap.push({
				arrayIndex: index,
				elementIndex: 0,
				value: array[0]
			});
		});

		// Heapify the minHeap O(K)
		this.heapify(minHeap);

		while (minHeap[0].value !== Infinity) {
			let top = minHeap[0];
			result.push(top.value);
			top.elementIndex += 1;
			if (top.elementIndex >= arrays[top.arrayIndex].length) {
				top.value = Infinity;
			} else {
				top.value = arrays[top.arrayIndex][top.elementIndex];
			}
			this.bubbleDown(minHeap, 0);
		}

		return result;
	}

	// Simple formula for getting child indices
	getChildIndices(index) {
		return [ 2 * index + 1, 2 * index + 2 ];
	}

	// Returns the index of the smaller child, or undefined if there are no children
	findMinChildIndex(minHeap, leftIndex, rightIndex) {
		let minChildIndex;
		let leftChild = minHeap[leftIndex];
		let rightChild = minHeap[rightIndex];

		if (leftChild !== undefined) {
			if (rightChild === undefined) {
				minChildIndex = leftIndex;
			} else {
				if (leftChild.value == Infinity) {
					minChildIndex = rightIndex;
				} else {
					minChildIndex =
						Date.parse(rightChild.value.time) < Date.parse(leftChild.value.time) ? rightIndex : leftIndex;
				}
			}
		}
		return minChildIndex;
	}

	// Takes in an index since we want to use it for heapify
	// When removing the top, just pass in index 0

	bubbleDown(minHeap, index) {
		let currentIndex = index;
		let current = minHeap[currentIndex];
		let [ leftIndex, rightIndex ] = this.getChildIndices(currentIndex);
		let minChildIndex = this.findMinChildIndex(minHeap, leftIndex, rightIndex);
		let minChild = minChildIndex === undefined ? undefined : minHeap[minChildIndex];

		while (
			minChild !== undefined &&
			(current.value == Infinity || Date.parse(current.value.time) > Date.parse(minChild.value.time))
		) {
			[ minHeap[currentIndex], minHeap[minChildIndex] ] = [ minHeap[minChildIndex], minHeap[currentIndex] ];

			currentIndex = minChildIndex;

			[ leftIndex, rightIndex ] = this.getChildIndices(currentIndex);

			minChildIndex = this.findMinChildIndex(minHeap, leftIndex, rightIndex);

			minChild = minChildIndex === undefined ? undefined : minHeap[minChildIndex];
		}
	}
	// Just calls bubble down for every element in the heap, starting from the back
	heapify(minHeap) {
		for (let i = minHeap.length - 1; i >= 0; i--) {
			this.bubbleDown(minHeap, i);
		}
	}
}

// let arrs = [
// 	[
// 		{
// 			time: '2020-01-1 03:26:00',
// 			speed: 40
// 		},
// 		{
// 			time: '2020-01-1 04:45:00',
// 			speed: 80
// 		}
// 	],

// 	[
// 		{
// 			time: '2021-01-1 01:04:00',
// 			speed: 81
// 		},
// 		{
// 			time: '2031-01-1 01:04:00',
// 			speed: 81
// 		}
// 	],
// 	[
// 		{
// 			time: '2020-01-1 01:04:00',
// 			speed: 81
// 		},
// 		{
// 			time: '2022-01-1 01:04:00',
// 			speed: 81
// 		}
// 	]
// ];

// f = mergeKSorted(arrs);
// console.log(f);
