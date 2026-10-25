const RED = 'RED';
const BLACK = 'BLACK';

class TreeNode {
    constructor(data, color = RED, parent = null, left = null, right = null) {
        this.data = data;
        this.color = color;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

class RBTree {
    constructor() {
        this.nil = new TreeNode(null);
        this.nil.color = BLACK;
        this.root = this.nil;
    }

    rightRotate(y) {
        const x = y.left;
        const T1 = x.right;
        x.right = y;
        y.left = T1;
        if (T1 !== this.nil) {
            T1.parent = y;
        }
        x.parent = y.parent;

        if (y.parent === this.nil) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        y.parent = x;
        return x;
        
    }

    leftRotate(x) {
        const y = x.right;
        const T1 = y.left;
        y.left = x;
        x.right = T1;
    
        if (T1 !== this.nil) {
            T1.parent = x;
        }
        y.parent = x.parent;

        if (x.parent === this.nil) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        x.parent = y;

        return y;
    }

    insertFixUp(newNode) {
        while(newNode.parent.color === RED){
            let gp = newNode.parent.parent;
            if(newNode.parent === gp.left){
                let uncle = gp.right;
                if(uncle.color === RED){
                    newNode.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    newNode = gp;
                } else {
                    if(newNode === newNode.parent.right){
                        newNode = newNode.parent;
                        this.leftRotate(newNode);
                    }
                    newNode.parent.color = BLACK;
                    gp.color = RED;
                    this.rightRotate(gp);
                }
            } else {
                let uncle = gp.left;
                if(uncle.color === RED){
                    newNode.parent.color = uncle.color = BLACK;
                    gp.color = RED;
                    newNode = gp;
                } else {
                    if(newNode === newNode.parent.left){
                        newNode = newNode.parent;
                        this.rightRotate(newNode);
                    }

                    newNode.parent.color = BLACK;
                    gp.color = RED;
                    this.leftRotate(gp);
                }
            }
        }
        this.root.color = BLACK;
    }

    insert(data) {
    let newNode = new TreeNode(data);
    let parentNode = this.nil;
    let current = this.root;
    while(current !== this.nil){
        parentNode = current;
        if(data < current.data){
            current = current.left;
        } else if(data > current.data){
            current = current.right;
        } else {
            return ;
        }
    }    
    if(parentNode === this.nil){
        this.root = newNode;
    } else if (newNode.data > parentNode.data){
        parentNode.right = newNode;
    } else {
        parentNode.left = newNode;
    }

    newNode.parent = parentNode;
    newNode.left = newNode.right = this.nil;
    this.insertFixUp(newNode);
    }
}

const rb = new RBTree();

rb.insert(10);
rb.insert(20);
rb.insert(30);
rb.insert(15);
rb.insert(25);
rb.insert(5);

console.log(rb);
