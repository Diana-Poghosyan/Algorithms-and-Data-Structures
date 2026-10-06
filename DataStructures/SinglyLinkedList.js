class Node {
    constructor(data, next = null) {
        this.value = data;
        this.next = next;
    }
}

class SList {
    constructor(iterables) {
        this.head = null;
        this.size = 0;
        if( iterables && typeof(iterables[Symbol.iterator]) === "function"){
            for(let val of iterables){
                this.push_back(val);
            }
        }
    }

    static fromArray(arr) {
    const list = new SList();

    for (let value of arr) {
        list.push_back(value);
    }

    return list;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    push_back(elem) {
        const newNode = new Node(elem);
        if(!this.head){
            this.head = newNode;
            this.size++;
            return;
        }
        let current = this.head;

        while(current.next){
            current = current.next;
        }

        current.next = newNode;
        this.size++;
    }

    push_front(elem) {
        let newNode = new Node(elem);
        if(this.head){
            newNode.next = this.head;
            this.head = newNode;
        } else {
            this.head = newNode;
        }

        this.size++
    }

    pop_back() {
        if(this.head && this.head.next){
            let current = this.head;
            while(current.next.next){
                current = current.next;
            }
            current.next = null;
            this.size--;
        } else {
            this.head = null;
            this.size = 0;
        }
    }

    pop_front() {
         if(this.head){
            this.head = this.head.next;
            this.size--;
        } 
    }

    toArray() {
        let current = this.head;
        let res = [];
        while(current){
            res.push(current.value);
            current = current.next;
        }

        return res;
    }

    front() {
        if(this.head){
            return this.head.value;
        } else {
            return undefined;
        }
    }

    isEmpty() {
        if(this.head){
            return false;
        } 

        return true;
    }

    at(index) {
        if(index <= 0 || index > this.size){
           throw new Error("iivalid index");
        } else {
            let cur = this.head;
            for(let i = 1; i < index; ++i ){
                cur = cur.next;
            }
            return cur.value;
        }
    }

    insert(index, value) {
        if(index === 1) {
            this.push_front(value);
            return;
        }
        if(index === this.size + 1) {
            this.push_back(value);
            return;
        }

        if(index <= 0 || index > this.size + 1 ){
           throw new error("iivalid index");
        } else {
        const newNode = new Node(value);
        let current = this.head;
        for(let j = 1; j < index - 1; ++j){
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
        this.size++;
        }
    }

    erase(index) {
        if(index <= 0 || index > this.size){
           return undefined;
        } else {

            if (index === 1) {
            const val = this.head.value;
            this.head = this.head.next;
            this.size--;
            return val;
            }

            let cur = this.head;
            for(let i = 1; i < index - 1; ++i){
                cur = cur.next;
            }

            let val = cur.next.value;
            cur.next = cur.next.next;
            this.size--;

            return val;
        }
    }

    reverse() {
        let cur = this.head;
        let prev = null;

        while(cur){
            let n = cur.next;
            cur.next = prev;
            prev = cur;
            cur = n;
        }

        this.head = prev; 
    }

    merge(list) {
        if(!this.head){
            this.head = list.head;
            this.size = list.size;
            return this.head;
        } 
        let cur = this.head;
        while(cur.next){
            cur = cur.next;
        }
        cur.next = list.head;
        this.size += list.size;

        return this.head;
    }

    remove(value) {
        if(this.head){
        let cur = this.head;
        
        while(cur.next){
            if(this.head.value === value){
                this.head = this.head.next;
            }

            if(cur.next.value === value){
                cur.next = cur.next.next;
                this.size--;
            }

            cur = cur.next;
        }

        return this.head;
        } else {
            throw new Error("chka tarr");
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
            slow.next = null;

            let left = mergeSort(list);
            let right = mergeSort(mid);
            return merge(left, right);
        }


        function merge(l1, l2) {
            const dummy = new Node(null);
            let cur = dummy;
            while(l1 && l2){
                if(cmp(l1.value,  l2.value) <= 0){
                    cur.next = l1;
                    l1 = l1.next;
                } else {
                    cur.next = l2;
                    l2 = l2.next;
                }

                cur = cur.next;
            }

            cur.next = l1 || l2;
            return dummy.next;
        }


        this.head = mergeSort(this.head);

    }

    


    [Symbol.iterator]() {
        let cur = this.head;
        return {
            next : () => {
                    if(cur){
                        let value = cur.value;
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







let list = new SList([10, 20, 30, 40]);

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

console.log("8. isEmpty:", list.isEmpty());

console.log("9. at(1):", list.at(1));
console.log("10. at(3):", list.at(3));

list.insert(2, 15);
console.log("11. insert(2, 15):", list.toArray());

console.log("12. erase(3):", list.erase(3));
console.log("13. after erase:", list.toArray());

list.reverse();
console.log("14. reverse:", list.toArray());

list.remove(20);
console.log("15. remove(20):", list.toArray());

list.sort();
console.log("16. sort:", list.toArray());

console.log("17. for...of:");

for (let value of list) {
    console.log(value);
}

let list2 = new SList([100, 200, 300]);

console.log("18. list2:", list2.toArray());

list.merge(list2);
console.log("19. merge:", list.toArray());

console.log("20. Final size:", list.size);

let list3 = SList.fromArray([7, 3, 9, 1]);

console.log("21. fromArray:", list3.toArray());
console.log("22. fromArray size:", list3.size);