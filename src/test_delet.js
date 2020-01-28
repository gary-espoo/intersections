// Space: O(NK) (Plus O(K) for the heap)
// Time: O(NK log(K))
function mergeKSorted(arrays) {
    let result = [];

    let minHeap = [];

    arrays.forEach((array, index) => {
        minHeap.push({
            arrayIndex: index,
            elementIndex: 0,
            value: array[0]
        });
    })

    // Heapify the minHeap O(K)
    heapify(minHeap);


    while (minHeap[0].value !== Infinity) {
        let top = minHeap[0]
        result.push(top.value);
        top.elementIndex += 1;
        if (top.elementIndex >= arrays[top.arrayIndex].length) {
            top.value = Infinity;
        } else {
            top.value = arrays[top.arrayIndex][top.elementIndex];
        }
        bubbleDown(minHeap, 0);
    }

    return result;
}





// Heap Helper functions
// NOTE A lot of these are very similar to the methods used on Djikstra's Algorithm on 07.26

// Simple formula for getting child indices
function getChildIndices(index) {
    return [(2 * index) + 1, (2 * index) + 2];
}

// Returns the index of the smaller child, or undefined if there are no children
function findMinChildIndex(minHeap, leftIndex, rightIndex) {
    let minChildIndex;
    let leftChild = minHeap[leftIndex];
    let rightChild = minHeap[rightIndex];

    if (leftChild !== undefined) {
        if (rightChild === undefined) {
            minChildIndex = leftIndex;
        } else {
            minChildIndex = Date.parse(rightChild.value.time) < Date.parse(leftChild.value.time) ? rightIndex : leftIndex;
            //minChildIndex = rightChild.value < leftChild.value ? rightIndex : leftIndex;
        }
    }
    return minChildIndex;
}

// Takes in an index since we want to use it for heapify
// When removing the top, just pass in index 0

function bubbleDown(minHeap, index) {
    let currentIndex = index;
    let current = minHeap[currentIndex];
    let [leftIndex, rightIndex] = getChildIndices(currentIndex);
    let minChildIndex = findMinChildIndex(minHeap, leftIndex, rightIndex);
    let minChild = minChildIndex === undefined ? undefined : minHeap[minChildIndex];

    while (minChild !== undefined && current.value.time > minChild.value.time) {
        //while (minChild !== undefined && current.value > minChild.value) {
        [minHeap[currentIndex], minHeap[minChildIndex]] = [minHeap[minChildIndex], minHeap[currentIndex]];

        currentIndex = minChildIndex;

        [leftIndex, rightIndex] = getChildIndices(currentIndex);

        minChildIndex = findMinChildIndex(minHeap, leftIndex, rightIndex);

        minChild = minChildIndex === undefined ? undefined : minHeap[minChildIndex];
    }
}

// Just calls bubble down for every element in the heap, starting from the back
function heapify(minHeap) {
    for (let i = minHeap.length - 1; i >= 0; i--) {
        bubbleDown(minHeap, i);
    }
}



// let arrs = [
//         [
//             {
//                 a:5
//             }
//         ]
//     ,
//     {
//         [3, 4, ]
//     },


// ];


let arrs = [
    [{

            time: '2020-01-1 03:26:00',
            speed: 40
        },
        {
            time: '2020-01-1 04:45:00',
            speed: 80
        },
        {

            time: '2020-01-1 22:35:00',
            speed: 62
        }
    ],

    [{

            time: '2020-01-1 01:04:00',
            speed: 81,

        },
        {

            time: '2020-01-2 01:45:00',
            speed: 48
        },
    ]

]

f = mergeKSorted(arrs)
console.log(f)