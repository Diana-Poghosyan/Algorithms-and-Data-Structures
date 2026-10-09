class Node {
  
    constructor(data, next = null, prev = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
    }
}

class DList {
    #head;
    #tail;
    #size;
    constructor(iterables) {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
        if( iterables && typeof(iterables[Symbol.iterator]) === "function"){
            for(let val of iterables){
                this.push_back(val);
            }
        }
    }

    static fromArray(arr) {
        const dlist = new DList();

        for(let val of arr){
            dlist.push_back(val);
        }

        return dlist;
    }

    get size() {
        return this.#size;
    }

    clear() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;

    }

    push_back(elem) {
        const newNode = new Node(elem);

        if(!this.#head){
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return;
        } else {
            this.#tail.next = newNode;
            newNode.prev = this.#tail;
            this.#tail = newNode;
            this.#size++;
            return; 
        }
    }

    push_front(elem) {
        const newNode = new Node(elem);
        if(!this.#head){
            this.#head = newNode;
            this.#tail = newNode;
            this.#size++;
            return;
        } else {
            newNode.next = this.#head;
            this.#head.prev = newNode;
            this.#head = newNode;
            this.#size++;
            return;
        }
    }

    pop_back() {
          if(this.#size === 1){
            const el = this.#tail.data;
            this.#head = null;
            this.#tail = null;
            this.#size = 0;
            return el;
        }
        if(!this.#head){
            throw new Error("tarr chka");
        } else {
            const el = this.#tail.data;
            this.#tail = this.#tail.prev;
            this.#tail.next = null;
            this.#size--;
            return el;
        }
    }

    pop_front() {
         if(this.#size === 1){
            const el = this.#tail.data;
            this.#head = null;
            this.#tail = null;
            this.#size = 0;
            return el;
        }
        if(!this.#head){
            throw new Error("tarr chka");
        } else {
            const el = this.#head.data;
            this.#head = this.#head.next;
            this.#head.prev = null;
            this.#size--;
            return el;
        }
    }

    toArray() {
        let current = this.#head;
        let res = [];
        while(current){
            res.push(current.data);
            current = current.next;
        }

        return res;
    }

    front() {
        if(this.#head){
            return this.#head.data;
        } else {
            return undefined;
        }
    }

    back() {
        if(this.#tail){
            return this.#tail.data;
        } else {
            return undefined;
        }
    }

    isEmpty() {
        if(this.#head){
            return false;
        } 

        return true;
    }

    at(index) {
        if(index <= 0 || index > this.#size){
           throw new Error("iivalid index");
        } else {
            let cur;
            if((this.#size / 2) >= index){
                cur = this.#head;
                for(let i = 1; i < index; ++i ){
                    cur = cur.next;
                }
                
            } else {
                cur = this.#tail;
                for(let i = this.#size; i > index; --i){
                    cur = cur.prev;
                }
            }

            return cur.data;
        }
    }

    insert(index, value) {
        if(index === 1) {
            this.push_front(value);
            return;
        }
        if(index === this.#size + 1) {
            this.push_back(value);
            return;
        }

        if(index <= 0 || index > this.#size + 1 ){
           throw new Error("iivalid index");
        } else {
            const newNode = new Node(value);
            let current;
            if((this.#size / 2) >= index){
                current = this.#head;
                for(let j = 1; j < index - 1; ++j){
                    current = current.next;
                }
            } else {
                current = this.#tail;
                for(let j = this.#size; j >= index ; j-- ){
                    current = current.prev;
                }
            }
            newNode.next = current.next;
            current.next.prev = newNode;
            current.next = newNode;
            newNode.prev = current;
            this.#size++;
        }
    }

    erase(index) {
        if(index <= 0 || index > this.#size){
           return undefined;
        } else {

            if (index === 1) {
                return this.pop_front();
            }

            if (index === this.#size){
                return this.pop_back();
            }

            let current;
            if((this.#size / 2) >= index){
                current = this.#head;
                for(let j = 1; j < index ; ++j){
                    current = current.next;
                }
            } else {
                current = this.#tail;
                for(let j = this.#size; j > index ; j-- ){
                    current = current.prev;
                }
            }

            let val = current.data;
            current.prev.next = current.next;
            current.next.prev = current.prev;
            this.#size--;

            return val;
        }
    } 

    reverse() {
        let cur = this.#head;
    
        while(cur){
            let n = cur.next;
            cur.next = cur.prev;
            cur.prev = n;
            cur = n;
        }
        let k = this.#head;
        this.#head = this.#tail;
        this.#tail = k;
    }

    merge(list) {
        if(!list.#head){
            return this;
        }

        if(!this.#head){
            this.#head = list.#head;
            this.#tail = list.#tail;
            this.#size = list.#size;
            return this;
        } 
       
        this.#tail.next = list.#head;
        list.#head.prev = this.#tail;
        this.#tail = list.#tail;
        this.#size += list.#size;

        return this;
    }

    remove(value) {
    if(!this.#head) {
        throw new Error("chka tarr");
    }

    let cur = this.#head;
    while(cur) {
        if(cur.data === value) {

            if(cur === this.#head) {
                this.pop_front();
            } else if(cur === this.#tail) {
                this.pop_back();
            } else {
                cur.prev.next = cur.next;
                cur.next.prev = cur.prev;
                this.#size--;
            }
            return;
        }
        cur = cur.next;
    }
    }

    sort(cmp) {
         cmp =  typeof cmp === "function" ? cmp: (a , b) => (a - b); 

        function mergeSort(list) {
            if(!list || !list.next) return list;

            let slow = list;
            let fast = list.next;

            while( fast && fast.next){
                slow = slow.next;
                fast = fast.next.next;
            }

            let mid = slow.next;
            mid.prev = null;
            slow.next = null;

            let left = mergeSort(list);
            let right = mergeSort(mid);
            return merge(left, right);
        }


        function merge(l1, l2) {
            const dummy = new Node(null);
            let cur = dummy;
            while(l1 && l2){
                if(cmp(l1.data,  l2.data) <= 0){
                    cur.next = l1;
                    l1 = l1.next;
                } else {
                    cur.next = l2;
                    l2 = l2.next;
                }

                cur.next.prev = cur === dummy ? null : cur;
                cur = cur.next;
            }

            cur.next = l1 || l2;
            if(cur.next) {
            cur.next.prev = cur === dummy ? null : cur;
        }

        let head = dummy.next;

        if(head) {
            head.prev = null;
        }

        return head;
    }

    this.#head = mergeSort(this.#head);

    this.#tail = this.#head;

    if(this.#tail) {
        while(this.#tail.next) {
            this.#tail = this.#tail.next;
        }
    }

    return this;
}

    [Symbol.iterator]() {
        let cur = this.#head;
        return {
            next : () => {
                    if(cur){
                        let value = cur.data;
                        cur = cur.next;
                        return {
                            value : value,
                            done : false
                        };
                    } else {
                        return {
                            value: undefined,
                            done: true
                        };
                    }
            }
        }
    }
}




let list = new DList([10, 20, 30, 40]);

console.log("1. Initial:", list.toArray());

console.log("2. Size:", list.size);

list.push_back(50);

console.log("3. push_back:", list.toArray());

list.push_front(5);

console.log("4. push_front:", list.toArray());

list.pop_back();

console.log("5. pop_back:", list.toArray());

list.pop_front();

console.log("6. pop_front:", list.toArray());

console.log("7. front:", list.front());

console.log("8. back:", list.back());

console.log("9. isEmpty:", list.isEmpty());

console.log("10. at(1):", list.at(1));

console.log("11. at(3):", list.at(3));

list.insert(2, 15);

console.log("12. insert(2, 15):", list.toArray());

console.log("13. erase(3):", list.erase(3));

console.log("14. after erase:", list.toArray());

list.reverse();

console.log("15. reverse:", list.toArray());

list.remove(20);

console.log("16. remove(20):", list.toArray());

list.sort();

console.log("17. sort:", list.toArray());

console.log("18. for...of:");

for (let value of list) {
    console.log(value);
}

let list2 = new DList([100, 200, 300]);

console.log("19. list2:", list2.toArray());

list.merge(list2);

console.log("20. merge:", list.toArray());

console.log("21. Final size:", list.size);

let list3 = DList.fromArray([7, 3, 9, 1]);

console.log("22. fromArray:", list3.toArray());

console.log("23. fromArray size:", list3.size);

list.clear();

console.log("24. clear:", list.toArray());

console.log("25. isEmpty after clear:", list.isEmpty());