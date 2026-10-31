function isPrime(n){
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    const limit = Math.sqrt(n);
    for (let i = 3; i <= limit; i += 2) {
        if (n % i === 0) return false;
    }
   return true;
}


function nextPrime(n){
    if (n < 2) return 2;
    let candidate = n * 2;

    if (candidate % 2 === 0 && candidate > 2) {
        candidate++;
    }

     while (!isPrime(candidate)) {
        candidate += 2;
    }

    return candidate;
}


class HashTable {
    constructor(initialCapacity = 11, maxLoadFactor = 1.0){
        this.capacity = isPrime(initialCapacity) ? initialCapacity : nextPrime(initialCapacity);
        this.maxLoadFactor = maxLoadFactor;
        this.table = new Array(this.capacity);
        this.size = 0;
    }

    _hash(key){
        let hash = 0;

        if(typeof key === "number"){
            const str = String(key);

            for (let i = 0; i < str.length; i++) {
                hash = (hash * 31 + str.charCodeAt(i)) % this.capacity;
            }

            return hash;
        }

        if(typeof key === "string") {
            for(let i = 0; i < key.length; i++){
                hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
            }

        return hash;
        }

        throw new TypeError("Key must be a string or a number");       
    }

    loadFactor(){
        return this.size / this.capacity;
    }

    has(key){
        const index = this._hash(key);

        if(!this.table[index]) return false;

        for(const k of this.table[index]){
            if(k.key === key) return true;
        }

        return false;
    }

    get(key){
        const index = this._hash(key);

        if(!this.table[index]) return undefined;

        for(const k of this.table[index]){
            if(k.key === key) return k.value;
        }

        return undefined; 
    }

    set(key, value){
        const index = this._hash(key);

        if(!this.table[index]){
            this.table[index] = [];
        }

        for( const k of this.table[index]){
            if(k.key === key){
                k.value = value;
                return this;
            }
        }

        this.table[index].push({key, value});
        this.size++;

        if(this.loadFactor() > this.maxLoadFactor){
            this.resize();
        }

        return this;
    }

    getSize(){
        return this.size;
    }

    delete(key){
        const index = this._hash(key);

        const k = this.table[index];
        if(!k) return false;

        for(let i = 0; i < k.length; ++i){
            if(k[i].key === key){
                k.splice(i,1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    *keys(){
        for(const k of this.table){
            if(!k) continue;

            for(const t of k){
                yield t.key;
            }
        }
    }

    *values(){
        for(const k of this.table){
            if(!k) continue;
            for(const t of k){
                yield t.value;
            }
        }
    }

    *entries(){
        for(const k of this.table){
            if(!k) continue;

            for(const t of k){
                yield [t.key, t.value];
            }
        }
    }

    resize(){
        const oldTable = this.table;

        this.capacity = nextPrime(this.capacity);
        this.table = new Array(this.capacity);

        for(const k of oldTable){
            if(!k) continue;

            for(const {key, value} of k){
                const index = this._hash(key);

                if(!this.table[index]){
                    this.table[index] = [];
                }

                this.table[index].push({key, value});
            }
        }
    }

    clear(){
        this.table = new Array(this.capacity);
        this.size = 0;
    }

    *[Symbol.iterator](){
        yield *this.entries();
    }
}

const hash = new HashTable(5, 0.7);

hash.set("name", "Diana");
hash.set(123, "Number");
hash.set("123", "String");
hash.set("city", "Yerevan");

console.log(hash.get("name"));
console.log(hash.get(123));
console.log(hash.get("123"));

console.log(hash.has("city"));
console.log(hash.has("age"));

console.log(hash.getSize());
console.log(hash.loadFactor());

console.log([...hash.keys()]);
console.log([...hash.values()]);
console.log([...hash.entries()]);

console.log(hash.delete(123));
console.log(hash.delete("age"));

console.log(hash.has(123));
console.log(hash.getSize());

hash.set("age", 18);
hash.set("country", "Armenia");

console.log([...hash]);

hash.set("language", "Armenian");
console.log(hash.capacity);

hash.clear();

console.log(hash.getSize());
console.log([...hash]);