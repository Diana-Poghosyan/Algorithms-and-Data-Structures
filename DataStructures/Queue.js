class Queue {
    #capacity;  
    #size;
    #front;
    #rear;
    #arr;
    constructor(capacity = 8) {
        this.#capacity = capacity;
        this.#size = 0;
        this.#front = 0;
        this.#rear = 0;
        this.#arr = new Array(this.#capacity);
    }

    enqueue(elem) {
        if(this.#size === this.#capacity){
            throw new Error("Maximal size of Queue");
        }
        this.#arr[this.#rear] = elem;
        this.#rear = (this.#rear + 1) % this.#capacity;
        this.#size++;
    }

    dequeue() {
        if(this.#size === 0){
            throw new Error("Queue is empty");
        }
        const val = this.#arr[this.#front];
        this.#front = (this.#front + 1) % this.#capacity;
        this.#size--;
        return val; 
    }

    get size() {
        return this.#size;
    }

    get_front() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.#arr[this.#front];
    }

    get_back() {
        if(this.isEmpty()){
            return undefined;
        }
        return this.#arr[(this.#rear - 1 + this.#capacity) % this.#capacity];
    }

    print() {
        for (let i = 0; i < this.#size; i++) {
            console.log(this.#arr[(this.#front + i) % this.#capacity]);
        }
    }

    isEmpty() {
        if(this.#size === 0){
            return true;
        }

        return false;
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next : () => {
                if (index < this.#size) {
                    const value = this.#arr[(this.#front + index) % this.#capacity];

                    index++;
                    return {
                        value : value,
                        done: false
                    };
                } else {
                    return {
                        value : undefined,
                        done : true
                    };
                }
            }
        }
    }
}


let queue = new Queue(5);

console.log("1. Initial size:", queue.size);
console.log("2. isEmpty:", queue.isEmpty());

queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log("3. Size after enqueue(10, 20, 30):", queue.size);
console.log("4. isEmpty:", queue.isEmpty());

console.log("5. Front:", queue.get_front());
console.log("6. Back:", queue.get_back());

console.log("7. dequeue:", queue.dequeue());
console.log("8. Size after dequeue:", queue.size);

queue.enqueue(40);

console.log("9. Front:", queue.get_front());
console.log("10. Back:", queue.get_back());

console.log("11. print:");
queue.print();

console.log("12. for...of:");
for (let value of queue) {
    console.log(value);
}

console.log("13. Size after iteration:", queue.size);

console.log("14. dequeue:", queue.dequeue());
console.log("15. dequeue:", queue.dequeue());
console.log("16. dequeue:", queue.dequeue());

console.log("17. isEmpty:", queue.isEmpty());

try {
    queue.dequeue();
} catch (error) {
    console.log("18. dequeue() on empty queue:", error.message);
}

queue.enqueue(100);
queue.enqueue(200);

console.log("19. Size after enqueue(100, 200):", queue.size);
console.log("20. Front:", queue.get_front());
console.log("21. Back:", queue.get_back());

queue.enqueue(300);
queue.enqueue(400);
queue.enqueue(500);

console.log("22. Size before overflow:", queue.size);

try {
    queue.enqueue(600);
} catch (error) {
    console.log("23. enqueue() on full queue:", error.message);
}

console.log("24. Final size:", queue.size);

console.log("25. Final queue:");
for (let value of queue) {
    console.log(value);
}