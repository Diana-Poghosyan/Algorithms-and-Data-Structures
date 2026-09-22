const bubbleSort = (arr) => {
    const n = arr.length;
    let flag = false;
    for(let i = 0; i < n - 1; ++i){
        for(let j = 0; j < n - i - 1; ++j){
            if(arr[j] > arr[j + 1]){
                flag =  true;
                [arr[j], arr[j+1]] = [arr[j + 1], arr [j]];
            }
        }
        if(!flag){
            break;
        }
        
    }
    return arr;
}



console.log(bubbleSort([5, 3, 8, 1, 2]));
console.log(bubbleSort([1, 2, 3, 4, 5]));
console.log(bubbleSort([5, 4, 3, 2, 1]));
console.log(bubbleSort([1]));
console.log(bubbleSort([]));
console.log(bubbleSort([3, 3, 2, 1, 2]));
console.log(bubbleSort([-3, 5, -1, 0, 2]));



// Time Complexity
// Best case: O(n)
// Average case: O(n²)
// Worst case: O(n²) 

// Space Complexity: O(1)