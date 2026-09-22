const selectionSort = (arr) => {
    const n = arr.length;
    for(let i = 0; i <  n - 1; ++i){
        let midIndex = i;
        for(let j = i + 1; j < n; ++j){
            if(arr[midIndex] > arr[j]){
                midIndex = j;
            }
        }
        if(midIndex !== i){
            [arr[i], arr[midIndex]] = [arr[midIndex], arr[i]];
        }  
    } 
    return arr;
}


console.log(selectionSort([5, 3, 8, 1, 2]));
console.log(selectionSort([5, 4, 3, 2, 1]));
console.log(selectionSort([1, 2, 3, 4, 5]));
console.log(selectionSort([3]));
console.log(selectionSort([]));
console.log(selectionSort([3, 3, 2, 1, 2]));
console.log(selectionSort([-5, 3, -1, 0, 2]));
console.log(selectionSort([10, 5, 8, 5, 1]));




// Time Complexity
// Best case: O(n²)
// Average case: O(n²)
// Worst case: O(n²) 

// Space Complexity: O(1)