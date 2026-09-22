const BinarySearch = (arr, target) =>{
    let left = 0;
    let right = arr.length - 1;

    while(left <= right){
        let mid = Math.floor((left + right)/2);

        if(arr[mid] === target){
            return mid;
        } else if ( arr[mid] > target){
            right = mid - 1;
        } else {
            left = mid + 1;
        } 
    }

    return -1;

}



console.log(BinarySearch([1, 2, 3, 4, 5, 6, 7], 4));
console.log(BinarySearch([1, 2, 3, 4, 5, 6, 7], 1));
console.log(BinarySearch([1, 2, 3, 4, 5, 6, 7], 7));
console.log(BinarySearch([1, 2, 3, 4, 5, 6, 7], 10));
console.log(BinarySearch([], 5));
console.log(BinarySearch([8], 8));
console.log(BinarySearch([8], 3));
console.log(BinarySearch([-10, -5, 0, 5, 10], -5));



// Time Complexity: O(log n)
// Best case: O(1)
// Average case: O(log n) 
// Worst case: O(log n)
// Space: O(1)