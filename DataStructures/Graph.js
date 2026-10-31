class Graph {
    constructor(size, isDirected = false) {
        this.size = size;
        this.isDirected = isDirected;
        this.matrix = Array.from({length: size}, () => new Array(size).fill(0));
    }

    addVertex() {
        for(const row of this.matrix){
            row.push(0);
        }
        this.size++;
        this.matrix.push(new Array(this.size).fill(0));
    }

    addEdge(u, v) {
        this.matrix[u][v] = 1;
        if(!this.isDirected){
            this.matrix[v][u] = 1;
        }
    }

    print() {
        for (let i = 0; i < this.size; ++i) {
            console.log(this.matrix[i].join(" "));
        }
    }
}

const graph = new Graph(4);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(2, 3);

console.log("Undirected Graph:");
graph.print();

graph.addVertex();
graph.addEdge(4, 0);

console.log("After adding vertex 4:");
graph.print();

const directed = new Graph(3, true);

directed.addEdge(0, 1);
directed.addEdge(1, 2);

console.log("Directed Graph:");
directed.print();