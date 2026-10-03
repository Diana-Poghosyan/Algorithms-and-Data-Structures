class DynamicArray {
   #arr;
   #size;
   #capacity;
   #GROWTH = 2;

   constructor(cap) {
       if (cap <= 0 || !Number.isInteger(cap)) {
           throw new Error("Error");
       }

       this.#arr = new Uint32Array(cap);
       this.#capacity = cap;
       this.#size = 0;
   }

   #resize() {
       const newCap = this.#capacity * this.#GROWTH;
       const tmp = new Uint32Array(newCap);

       for (let i = 0; i < this.#size; ++i) {
           tmp[i] = this.#arr[i];
       }

       this.#capacity = newCap;
       this.#arr = tmp;
   }

   push_back(elem) {
       if (this.#size === this.#capacity) {
           this.#resize();
       }

       if (!Number.isInteger(elem)) {
           throw new Error("Error");
       }

       this.#arr[this.#size++] = elem;
   }

   pop_back() {
       if (!this.#size) {
           throw new Error("error");
       }

       return this.#arr[--this.#size];
   }

   at(index) {
       if (!Number.isInteger(index) || index < 0 || index >= this.#size) {
           throw new Error("Error");
       }

       return this.#arr[index];
   }

   set(index, value) {
       if (
           !Number.isInteger(index) ||
           index < 0 ||
           index >= this.#size ||
           !Number.isInteger(value)
       ) {
           throw new Error("Error");
       }

       this.#arr[index] = value;

       return value;
   }

   front() {
        return this.#arr[0];
   }

   back() {
        return this.#arr[this.#size - 1];
   }

   erase(pos) {
        for(let i = pos; i < this.#size; ++i){
            this.#arr[i] = this.#arr[i + 1];
        }

        this.#size--;
   }

   insert(pos, value) {
       if (!Number.isInteger(pos) || pos < 0 || pos >= this.#size) {
           throw new Error("Error");
       }

       if (this.#size === this.#capacity) {
           this.#resize();
       }

       for (let i = this.#size; i > pos; --i) {
           this.#arr[i] = this.#arr[i - 1];
       }

       this.#arr[pos] = value;
       this.#size++;

       return pos;
   }

   swap(i, j) {
        let tmp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = tmp;
    }

   *values() {
        for(let i = 0; i < this.#size; ++i ){
            yield this.#arr[i];
        }
   }

   *keys() {
        for(let i = 0; i < this.#size; ++i){
            yield i;
        }
   }

   forEach(fn) {
        for( let i = 0; i < this.#size; ++i){
            fn(this.#arr[i], i, this.#arr);
        }
   }

   map(fn) {
        let obj = Object(this.#arr);
        let res = new Array(this.#size);
        let k = 0;
        for( let i = 0; i < this.#size; ++i){
            if (i in obj) {
                res[k++] = fn(this.#arr[i], i, this.#arr);
            }
        }

        return res;
   }

   filter(fn) {
        let res = [];
        for(let i = 0; i < this.#size; ++i){
            if(fn(this.#arr[i], i , this.#arr)){
                res.push(this.#arr[i]);
            }
        }

        return res;
   }

   reduce(fn, init) {   
        let k = init;
        let start = 0;

        if(k === undefined){
            k = this.#arr[0];
            start = 1;
        }

        for( let i = start; i< this.#size; ++i){
            k = fn(k, this.#arr[i], i, this.#arr);
        }

        return k;
   }

   some(fn) {

        for(let i = 0; i < this.#size; ++i){
            if(fn(this.#arr[i], i, this.#arr)){
                return true;
            }
        }

        return false;
   }

   find(fn) {
        for( let i = 0; i < this.#size; ++i){
            if(fn(this.#arr[i], i, this.#arr)){
                return this.#arr[i];
            }
        }

        return undefined;
   }

   findIndex(fn) {
        for( let i = 0; i < this.#size; ++i){
            if(fn(this.#arr[i], i, this.#arr)){
                return i;
            }
        }

        return -1;
   }

   includes(value) {
        for( let i = 0; i < this.#size; ++i){
            if(this.#arr[i] === value){
                return true;
            }
        }
        return false;
   }

   [Symbol.iterator]() {
        let start = 0; 
        let end = this.#size ;
        return {
            next: () => {
                if(start < end){
                    return {
                        value: this.#arr[start++],
                        done: false
                    };
                }
                return {
                    value : undefined,
                    done : true
                };
            }
        }
    }
}






const arr = new DynamicArray(3);

arr.push_back(10);
arr.push_back(20);
arr.push_back(30);
arr.push_back(40);

console.log([...arr]);

console.log(arr.pop_back());
console.log([...arr]);

console.log(arr.at(1));

console.log(arr.set(1, 50));
console.log([...arr]);

console.log(arr.front());

console.log(arr.back());

arr.erase(1);
console.log([...arr]);

arr.insert(1, 20);
console.log([...arr]);

arr.swap(0, 2);
console.log([...arr]);

console.log([...arr.values()]);

console.log([...arr.keys()]);

arr.forEach((value, index) => {
    console.log(index, value);
});

console.log(arr.map((value) => value * 2));

console.log(arr.filter((value) => value > 15));

console.log(arr.reduce((sum, value) => sum + value, 0));

console.log(arr.some((value) => value > 25));

console.log(arr.find((value) => value === 20));

console.log(arr.findIndex((value) => value === 20));

console.log(arr.includes(30));
console.log(arr.includes(100));

for (const value of arr) {
    console.log(value);
}