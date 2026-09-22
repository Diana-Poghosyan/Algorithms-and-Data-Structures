const insertionSort = (arr) => {
    const n = arr.length;
    for(let i = 1; i < n; ++i){
        let j = i -1;
        let key = arr[i];
        while(j >= 0 && arr[j] > key){
            arr[j + 1] = arr [j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}


console.log(insertionSort([5, 3, 8, 1, 2]));
console.log(insertionSort([5, 4, 3, 2, 1]));
console.log(insertionSort([1, 2, 3, 4, 5]));
console.log(insertionSort([3]));
console.log(insertionSort([]));
console.log(insertionSort([3, 3, 2, 1, 2]));
console.log(insertionSort([-5, 3, -1, 0, 2]));
console.log(insertionSort([10, 5, 8, 5, 1]));



// Time Complexity
// Best case: O(n)
// Average case: O(n²)
// Worst case: O(n²) 

// Space Complexity: O(1)