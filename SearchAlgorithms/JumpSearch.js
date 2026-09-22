const jumpSearch = (arr, target) => {
    if(target > arr[arr.length - 1]){
        return -1;
    }

    const n = arr.length - 1;
    let prev = 0;
    const stepLen = Math.floor(Math.sqrt(arr.length));
    let step = stepLen;

    while(arr[Math.min(step, n)] < target){
        prev = step;
        step += stepLen;
    }

    while(arr[prev] < target){
        prev++;
    }
    if(arr[prev] === target){
        return prev;
    } else {
        return -1;
    }
}



console.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 1));
console.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 9));
console.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 17));
console.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 8));
console.log(jumpSearch([1, 3, 5, 7, 9, 11, 13, 15, 17], 20));
console.log(jumpSearch([1], 1));
console.log(jumpSearch([1], 5));
console.log(jumpSearch([-10, -5, 0, 5, 10], -5));
console.log(jumpSearch([-10, -5, 0, 5, 10], 0));
console.log(jumpSearch([-10, -5, 0, 5, 10], 7));
console.log(jumpSearch([0], 1));



// Time Complexity: O(√n)
// Best Case: O(1)
// Average Case: O(√n)
// Worst Case: O(√n)
// Space: O(1)