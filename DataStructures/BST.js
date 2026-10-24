const Queue = require('./Queue');
const Stack = require('./Stack');

class TreeNode { 
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST { 
    constructor() {
        this.root = null;
    }

_insert(node,value) {
    if(!node) return new TreeNode(value);

    if(value > node.data){
        node.right = this._insert(node.right, value);
    } else if(value < node.data){
        node.left = this._insert(node.left, value);
    }

    return node;
}

_contains(node, value) {
    if(!node) return false;
    if(value === node.data){
        return true;
    }
    if(value > node.data){
        return this._contains(node.right, value);
    } else{
        return this._contains(node.left, value);
    }
}

_inorder(node, result) {
    if(!node) return;

    this._inorder(node.left,result);
    result.push(node.data);
    this._inorder(node.right,result);
}

_preOrder(node, result) {
    if(!node) return;

    result.push(node.data);
    this._preOrder(node.left,result);
    this._preOrder(node.right,result);
}

_postOrder(node, result) {
    if(!node) return;

    this._postOrder(node.left,result);
    this._postOrder(node.right,result);
    result.push(node.data);
}

_levelOrder(node, result, level = 0) {
    if (!node) return;

    if (!result[level]) {
        result[level] = [];
    }

    result[level].push(node.data);

    this._levelOrder(node.left, result, level + 1);
    this._levelOrder(node.right, result, level + 1);
}


_remove(node, value) {
    if(!node) return null;
    if(value > node.data){
        node.right = this._remove(node.right, value);
    } else if( value < node.data) {
        node.left = this._remove(node.left, value);
    } else {
        if(!node.left && !node.right) return null;
        if(!node.left || !node.right) {
            return node.left || node.right;
        }
        let successor = this.getMin(node.right);
        node.data = successor.data;
        node.right = this._remove(node.right, successor.data);
    }

    return node;
}

getMin(node) {
    let cur = node;
    while(cur.left){
        cur = cur.left;
    }

    return cur;
}

insertRecursive(value) {
    this.root = this._insert(this.root, value);
}

containsRecursive(value) {
    return this._contains(this.root, value);
}

inorderIterative() {
    let result = [];
    let stack = new Stack();
    let cur = this.root;
    while(cur|| !stack.isEmpty()){
        while(cur){
            stack.push(cur);
            cur = cur.left;
        }
        cur = stack.pop();
        result.push(cur.data);
        cur = cur.right;
    }

    return result;
}

postOrderIterative() {
    if (!this.root) return [];
    let stack1 = new Stack();
    stack1.push(this.root);
    let stack2 = new Stack();
    let result = [];

    while(!stack1.isEmpty()){
        let cur = stack1.pop();
        stack2.push(cur);
        if(cur.left) {
            stack1.push(cur.left);
        }
        if(cur.right){
            stack1.push(cur.right);
        }
    }
    while(!stack2.isEmpty()){
        result.push(stack2.pop().data);
    }

    return result;
}


preorderIterative() {
    const result = [];
    if (!this.root) return result;

    const stack = new Stack();
    stack.push(this.root);

    while (!stack.isEmpty()) {
        const cur = stack.pop();
        result.push(cur.data);

        if (cur.right) stack.push(cur.right);
        if (cur.left) stack.push(cur.left);
    }

    return result;
}

levelOrderIterative() {
    const result = [];

    if(!this.root) return result;

    const queue = new Queue();
    queue.enqueue(this.root);
    let levelCount = 0;
    while(!queue.isEmpty()){
        let levelSize = queue.size;
        for(let i = 0; i < levelSize; ++i){
            let cur = queue.dequeue();
            if(cur.left) queue.enqueue(cur.left);
            if(cur.right) queue.enqueue(cur.right);
            result.push(cur.data);
        }
        levelCount++;
    }

    return result;
}

levelOrderRecursive() {
    const result = [];
    this._levelOrder(this.root, result);
    return result.flat();
}

inOrderRecursive() {
    const result = [];
    this._inorder(this.root,result);
    return result;
}

preOrderRecursive() {
	const result = [];
    this._preOrder(this.root,result);
    return result;
}

postOrderRecursive() {
    const result = [];
    this._postOrder(this.root, result);
    return result;
}

removeRecursive(value) {
    this.root = this._remove(this.root, value);
    return this.root;
}

insert(value) {
    const newNode = new TreeNode(value);
    if(!this.root){
        this.root = newNode;
        return;
    }
    let cur = this.root;
    while(true){
        if (value < cur.data) {
            if (!cur.left) {
                cur.left = newNode;
                return;
            }
            cur = cur.left;
        } else if (value > cur.data) {
            if (!cur.right) {
                cur.right = newNode;
                return;
            }
            cur = cur.right;
        } else {
            return;
        }
    }
}

contains(value) {
    let cur = this.root;
    while (cur) {
        if (cur.data === value) {
            return true;
        }
        if (value < cur.data) {
            cur = cur.left;
        } else {
            cur = cur.right;
        }
    }

    return false;
}
}


const bst = new BST();

console.log('1. Empty tree:');
console.log('Inorder:', bst.inOrderRecursive()); // []
console.log('Contains 10:', bst.contains(10));   // false

console.log('\n2. Insert values:');
[10, 5, 15, 3, 7, 12, 20].forEach(value => bst.insert(value));

console.log('Inorder Recursive:', bst.inOrderRecursive());
// [3, 5, 7, 10, 12, 15, 20]

console.log('Inorder Iterative:', bst.inorderIterative());
// [3, 5, 7, 10, 12, 15, 20]

console.log('Preorder Recursive:', bst.preOrderRecursive());
// [10, 5, 3, 7, 15, 12, 20]

console.log('Preorder Iterative:', bst.preorderIterative());
// [10, 5, 3, 7, 15, 12, 20]

console.log('Postorder Recursive:', bst.postOrderRecursive());
// [3, 7, 5, 12, 20, 15, 10]

console.log('Postorder Iterative:', bst.postOrderIterative());
// [3, 7, 5, 12, 20, 15, 10]

console.log('Level Order Recursive:', bst.levelOrderRecursive());
// [10, 5, 15, 3, 7, 12, 20]

console.log('Level Order Iterative:', bst.levelOrderIterative());
// [10, 5, 15, 3, 7, 12, 20]

console.log('\n3. Contains:');
console.log('Contains 7:', bst.contains(7));   // true
console.log('Contains 100:', bst.contains(100)); // false

console.log('\n4. Insert duplicate 10:');
bst.insert(10);
console.log('Inorder:', bst.inOrderRecursive());
// [3, 5, 7, 10, 12, 15, 20]

console.log('\n5. Remove leaf node 3:');
bst.removeRecursive(3);
console.log('Inorder:', bst.inOrderRecursive());
// [5, 7, 10, 12, 15, 20]

console.log('\n6. Remove node with one child:');
bst.removeRecursive(5);
console.log('Inorder:', bst.inOrderRecursive());
// [7, 10, 12, 15, 20]

console.log('\n7. Remove node with two children:');
bst.removeRecursive(15);
console.log('Inorder:', bst.inOrderRecursive());
// [7, 10, 12, 20]

console.log('\n8. Minimum value:');
console.log('Min:', bst.getMin(bst.root).data); // 7

console.log('\n9. Contains after remove:');
console.log('Contains 15:', bst.contains(15)); // false
console.log('Contains 10:', bst.contains(10)); // true

console.log('\n10. Remove all nodes:');
[7, 10, 12, 20].forEach(value => bst.removeRecursive(value));
console.log('Inorder:', bst.inOrderRecursive()); // []
console.log('Contains 10:', bst.contains(10));   // false
console.log('Level Order:', bst.levelOrderRecursive()); // []