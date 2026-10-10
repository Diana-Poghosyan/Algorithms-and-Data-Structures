class Stack {
    #capacity;
    #size;
    #arr;
    #top;
    constructor(initialCapacity = 16) {
        this.#capacity  = initialCapacity;
        this.#size = 0;
        this.#arr = new Array(this.#capacity);
        this.#top = 0;
    }

    isEmpty() {
        if(this.#size === 0){
            return true;
        }

        return false;
    }

    get size() {
        return this.#size;
    }

    push(elem) {
        if(this.#size === this.#capacity){
            throw new Error("Maximal stack size");
        }        
        this.#arr[this.#top++] = elem;
        this.#size++;
    }

    pop() {
        if(this.isEmpty()){
           throw new Error("tarr chka"); 
        }

        const val = this.#arr[--this.#top];
        this.#size--;
        return val;
    }

    clear() {
        this.#top = 0;
        this.#size = 0;
    }

    [Symbol.iterator]() {
    let index = this.#size - 1;
    return {
        next: () => {
            if (index >= 0) {
                return {
                    value: this.#arr[index--],
                    done: false
                };
            }

            return {
                value: undefined,
                done: true
            };
        }
    };
    }
}






let stack = new Stack(5);

console.log("1. Initial size:", stack.size);

console.log("2. isEmpty:", stack.isEmpty());

stack.push(10);
stack.push(20);
stack.push(30);

console.log("3. After push(10, 20, 30), size:", stack.size);

console.log("4. isEmpty:", stack.isEmpty());

console.log("5. pop:", stack.pop());

console.log("6. Size after pop:", stack.size);

stack.push(40);

console.log("7. Size after push(40):", stack.size);

console.log("8. pop:", stack.pop());

console.log("9. pop:", stack.pop());

console.log("10. pop:", stack.pop());

console.log("11. isEmpty:", stack.isEmpty());

try {
    stack.pop();
} catch (error) {
    console.log("12. pop() on empty stack:", error.message);
}

stack.push(100);
stack.push(200);

console.log("13. Size before clear:", stack.size);

stack.clear();

console.log("14. Size after clear:", stack.size);

console.log("15. isEmpty after clear:", stack.isEmpty());

stack.push(1);
stack.push(2);
stack.push(3);

console.log("16. Size after pushing 3 elements:", stack.size);

console.log("17. for...of:");

for (let value of stack) {
    console.log(value);
}

console.log("18. Final size:", stack.size);
