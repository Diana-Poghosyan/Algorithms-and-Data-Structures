const mergeSort = (arr, left, right) => {
    if(left >= right) return;

    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right); 
}


const merge = (arr,left, mid, right) => {
    let a1 = arr.slice(left, mid + 1);
    let a2 = arr.slice(mid + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while( i < a1.length && j < a2.length){
        if(a1[i] > a2[j]){
            arr[k++] = a2[j++];
        } else {
            arr[k++] = a1[i++]
        }
    }

    while(i < a1.length){
        arr[k++] = a1[i++];
    }

    while( j < a2.length){
        arr[k++] = a2[j++];
    }
}





let arr = [8, 3, 5, 1, 7, 2, 6, 4];
mergeSort(arr, 0, arr.length - 1);
console.log(arr);

let arr1 = [5, 2, 8, 1, 3];
mergeSort(arr1, 0, arr1.length - 1);
console.log(arr1);

let arr2 = [9, 7, 5, 3, 1];
mergeSort(arr2, 0, arr2.length - 1);
console.log(arr2);

let arr3 = [4, 2, 2, 1, 4];
mergeSort(arr3, 0, arr3.length - 1);
console.log(arr3);



// Time Complexity
// Best case: O(n log(n) )
// Average case: O(n log(n) )
// Worst case: O(n log(n) ) 

// Space Complexity: O(n)
