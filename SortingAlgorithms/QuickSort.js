const quickSort = (arr, low = 0, high = arr.length - 1) => {

    if (low < high) {

        const pi = partition(arr, low, high);
        quickSort(arr, low, pi);
        quickSort(arr, pi + 1, high);
    }

    return arr;
};


const partition = (arr, low, high) => {
    const l = medianOfThree(arr, low, high);
    const pivot = arr[l];

    let i = low;
    let j = high;


    while (i <= j) {
        while (arr[i] < pivot) ++i;
        while (arr[j] > pivot) --j;

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            ++i;
            --j;
        }
    }
    
    return Math.max(j, low);
};


const medianOfThree = (arr, low, high) => {

    const mid = Math.floor((low + high) / 2);

    const a = low;
    const b = high;

    if ((arr[a] <= arr[b] && arr[b] <= arr[mid]) || (arr[mid] <= arr[b] && arr[b] <= arr[a])) {
        return b;
    }

    if ((arr[b] <= arr[a] && arr[a] <= arr[mid]) || (arr[mid] <= arr[a] && arr[a] <= arr[b])) {
        return a;
    }

    return mid;
};






let arr1 = [8, 3, 5, 1, 7, 2, 6, 4];
console.log(quickSort(arr1));

let arr2 = [5, 2, 5, 1, 2, 8, 3];
console.log(quickSort(arr2));

let arr3 = [9, 7, 5, 3, 1];
console.log(quickSort(arr3));

let arr4 = [1, 2, 3, 4, 5];
console.log(quickSort(arr4));

let arr5 = [4, 1, 4, 2, 3, 1];
console.log(quickSort(arr5));

let arr6 = [-3, 5, -1, 0, -7, 2];
console.log(quickSort(arr6));

let arr7 = [10];
console.log(quickSort(arr7));

let arr8 = [];
console.log(quickSort(arr8));