class AvlNode {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  constructor(value) {
    this.root = value === undefined || value === null ? null : new AvlNode(value);
  }

  _getHeight(node) {
    return node ? node.height : 0;
  }

  _update(node) {
     node.height = 1 + Math.max(this._getHeight(node.left),this._getHeight(node.right));
  }

  _bf(node) {
    if (!node)  return 0;
    return this._getHeight(node.left)-this._getHeight(node.right) ;
  }

  _getMin(node) {
    while(node.left){
        node = node.left;
    }
    return node;
  }

  _rotateRight(y) {
    const x = y.left;
    const T1 = x.right;
    x.right = y;
    y.left = T1;
    this._update(y);
    this._update(x);
    return x;
  }

  _rotateLeft(x) {
    const y = x.right;
    const T1 = y.left;
    y.left = x;
    x.right = T1;
    this._update(x);
    this._update(y);
    return y;
  }

  _insert(node, value) {
    if(!node) return new AvlNode(value);

    if(node.data > value){
        node.left = this._insert(node.left, value);
    } else if(node.data < value){
        node.right = this._insert(node.right, value);
    } else {
        return node;
    }

    this._update(node);
    let bf = this._bf(node);
    if(bf > 1 && node.left.data > value){
        return this._rotateRight(node);
    }
    if(bf < -1 && node.right.data < value){
        return this._rotateLeft(node);
    }
    if(bf > 1 && node.left.data < value){
        node.left = this._rotateLeft(node.left);
        return this._rotateRight(node);
    }
    if(bf < -1 && node.right.data > value){
        node.right = this._rotateRight(node.right);
        return this._rotateLeft(node);
    }

    return node;
  }

  _remove(node, value) {
    if(!node) return null;

    if(value > node.data){
        node.right = this._remove(node.right, value);
    } else if( value < node.data){
        node.left = this._remove(node.left, value);
    } else {
        if(!node.left && !node.right) return null;
        if(!node.left || !node.right) {
            return node.left || node.right;
        }

        let successor = this._getMin(node.right);

        node.data = successor.data;
        node.right = this._remove(node.right, successor.data);
    }

    this._update(node);

    let bf = this._bf(node);

    if(bf > 1 && this._bf(node.left) >= 0){
        return this._rotateRight(node);
    }

    if(bf > 1 && this._bf(node.left) < 0){
        node.left = this._rotateLeft(node.left);
        return this._rotateRight(node);
    }

    if(bf < -1 && this._bf(node.right) <= 0){
        return this._rotateLeft(node);
    }
    if(bf < -1 && this._bf(node.right) > 0){
        node.right = this._rotateRight(node.right);
        return this._rotateLeft(node);
    }

    return node;
  }

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  remove(value) {
    this.root = this._remove(this.root, value);
  }

  inorder() {
    const res = [];

    const dfs = (cur) => {
        if(!cur) return ;

        dfs(cur.left);
        res.push(cur.data);
        dfs(cur.right);
    }

    dfs(this.root);
    return res;
  }

  preorder() {
    const res = [];

    const dfs = (cur) => {
        if(!cur) return ;

        res.push(cur.data);
        dfs(cur.left);
        dfs(cur.right);
    }

    dfs(this.root);
    return res;
  }

  postorder() {
    const res = [];

    const dfs = (cur) => {
        if(!cur) return ;
        dfs(cur.left);
        dfs(cur.right);
        res.push(cur.data);
    }

    dfs(this.root);
    return res;
  }

  levelorder() {
    if(!this.root) return [];

    let result = [];
    const queue = [this.root];
    let i = 0;

    while (i < queue.length) {
        const node = queue[i++];

        result.push(node.data);

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return result;
    }
}

const tree = new AVL(10);

[20, 30, 40, 50, 25].forEach(value => tree.insert(value));

console.log("Inorder:", tree.inorder());
console.log("Preorder:", tree.preorder());
console.log("Postorder:", tree.postorder());
console.log("Levelorder:", tree.levelorder());

tree.remove(30);
console.log("After remove:", tree.inorder());

console.log("Root:", tree.root.data);
console.log("Height:", tree.root.height);
console.log("Balanced:", Math.abs(tree._bf(tree.root)) <= 1);