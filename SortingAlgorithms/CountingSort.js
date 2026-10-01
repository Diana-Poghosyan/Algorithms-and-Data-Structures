const countingSort= (arr) =>{
    if(arr.length === 0) return [];
    if(arr.length === 1) return arr;

    const n = arr.length;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const countArr = new Array(max - min +1).fill(0);

    for(let  i = 0; i < n ; ++i){
        const num  = arr[i] - min;
        countArr[num]++;
    }

    const res = new Array(n).fill(0);
    let k = 0;
    for(let  i = 0; i < countArr.length; ++i){
        while(countArr[i] > 0){
            res[k++] = i + min;
            countArr[i]--;
        }
    }

    return res;
}





console.log(countingSort([]));

console.log(countingSort([5]));

console.log(countingSort([4, 2, 7, 1, 3]));

console.log(countingSort([5, 2, 5, 1, 2, 5]));

console.log(countingSort([-3, -1, -5, 2, 0, -2]));

console.log(countingSort([10, 8, 9, 7, 6]));




// Time Complexity
// Best case: O(n x k)
// Average case: O(n x k)
// Worst case: O(n x k) 

// Space Complexity: O(n + k)
