class PriorityQueue {
    constructor(compareFn) {
        this.heap = [];
        this.compareFn = compareFn || ((a, b) => a - b);
    }

    swap(i, j) {
        [this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]];
    }

    heapifyUp() {
        let idx = this.heap.length -1;
        while(this.compareFn(this.heap[idx], this.heap[this.getParent(idx)]) < 0){
            this.swap(idx,this.getParent(idx));
            idx = this.getParent(idx);
        }
    }

    heapifyDown(index = 0) {
        let smallest = index;
        while(true){
            let left = this.getLeftChild(index);
            let right = this.getRightChild(index);
            if(  this.compareFn(this.heap[left], this.heap[smallest]) < 0){
                smallest = left;
            }
            if( this.compareFn(this.heap[right], this.heap[smallest]) < 0){
                smallest = right;
            }

            if(smallest === index) return index;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    getParent(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChild(i) {
        return (i * 2) + 1;
    }

    getRightChild(i) {
        return (i * 2) + 2;
    }

    size() {
        return this.heap.length ;
    }

    isEmpty() {
        if(this.heap.length) return false;

        return true;
    }

    peek() {
        return this.heap[0];
    }

    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if(this.isEmpty()) {
            throw new Error("Empty");
        }
        const root = this.heap[0];
        const last = this.heap.pop();
        if(!this.isEmpty()){
            this.heap[0] = last;
            this.heapifyDown(0);
        }

        return root;
    }
}



const pq = new PriorityQueue();

pq.push(30);
pq.push(10);
pq.push(20);
pq.push(5);
pq.push(15);

console.log(pq.size() === 5);
console.log(pq.peek() === 5);

console.log(pq.pop() === 5);
console.log(pq.pop() === 10);
console.log(pq.pop() === 15);
console.log(pq.pop() === 20);
console.log(pq.pop() === 30);

console.log(pq.isEmpty() === true);
console.log(pq.size() === 0);

pq.push(8);
pq.push(3);

console.log(pq.peek() === 3);
console.log(pq.pop() === 3);
console.log(pq.pop() === 8);

console.log(pq.isEmpty() === true);

try {
    pq.pop();
} catch (error) {
    console.log(error.message === "Empty");
}
