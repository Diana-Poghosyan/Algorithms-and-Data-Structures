const cumulativeCountingSort = (arr) =>{
    if(arr.length === 0) return [];
    if(arr.length === 1) return arr;
    
    const n = arr.length;
    const max = Math.max(...arr);
    const min  = Math.min(...arr);
    const countArr = new Array(max - min + 1).fill(0);

    for(let  i = 0; i < n; ++i ){
        const val =  arr[i];
        countArr[val - min]++;
    }

    for(let i = 1; i < countArr.length; ++i){
        countArr[i] += countArr[i - 1];
    }

    const result = new Array(n).fill(0);
    for(let i = arr.length - 1; i >= 0 ; --i){
        const num = arr[i];
        const idx = countArr[num - min] - 1;
        result[idx] = num;
        countArr[num - min]--;
    }

    return result;
}





console.log(cumulativeCountingSort([]));

console.log(cumulativeCountingSort([5]));

console.log(cumulativeCountingSort([4, 2, 7, 1, 3]));

console.log(cumulativeCountingSort([5, 2, 5, 1, 2, 5]));

console.log(cumulativeCountingSort([-3, -1, -5, 2, 0, -2]));

console.log(cumulativeCountingSort([10, 8, 9, 7, 6]));

console.log(cumulativeCountingSort([3, 1, 3, 2, 1]));





// Time Complexity: O(n + k)
// Space Complexity: O(n + k)
