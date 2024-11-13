interface Node {
  id: string;
  title: string;
  type: string;
}

interface Edge {
  source: Node;
  destination: Node;
}

/**
 * Planning:
 * Build Adjacency List: the representation of the Graph
 * call the builder
 * BFS processor Kahn's algorithm
 * Launch BFS
 * generate the array or map of the nodes' indegree values
 * push the nodes with the indegree of 0 to the queue, ready for bfs processing
 * return value
 * Time and Space complexities
 * Trade-offs: BFS VS DFS approaches
 * */
const useTopologyBFS = (nodes: Node[], edges: Edge[]) => {
  const adjList = new Map<string, Node[]>();
  const indegree = new Map<Node, number>();
  const queue: Node[] = [];
  const topologicalSort: Node[] = [];

  function buildAdjacencyList(nodes: Node[], edges: Edge[]) {
    // initialization
    for (let node of nodes) {
      adjList.set(node.id, []);
      indegree.set(node, 0);
    }

    for (let {source, destination} of edges) {
      adjList.get(source.id)?.push(destination);
      indegree.set(destination, indegree.get(destination)! + 1);
    }
  }

  buildAdjacencyList(nodes, edges);

  for (let [node, degree] of Array.from(indegree)) {
    if (degree === 0) {
      queue.push(node);
    }
  }

  function bfs() {
    // bfs implementation
    while (queue.length) {
      let node = queue.shift();
      topologicalSort.push(node!);

      for (let neighbor of adjList.get(node!.id)!) {
        indegree.set(neighbor, indegree.get(neighbor)! - 1);
        if (indegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }
  }

  bfs();

  return topologicalSort;
};

export default useTopologyBFS;

/**
 * Checkout the following LeetCode problems:
 * https://leetcode.com/problems/course-schedule/description/
 * https://leetcode.com/problems/course-schedule-ii/description/
 * https://leetcode.com/problems/alien-dictionary/description/
 * https://leetcode.com/problems/all-paths-from-source-to-target/description/
 * https://leetcode.com/problems/parallel-courses/description/
 * https://leetcode.com/problems/sequence-reconstruction/description/
 * https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/description/
 * */
