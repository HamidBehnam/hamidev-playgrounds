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
 * Build Adjacency List: Representation of the graph
 * DFS Processor to detect the cycles and build the topological sort order of the nodes
 * return the value
 * Time and Space complexities
 * Trade-offs: BFS VS DFS solutions
 * */
const useTopology = (nodes: Node[], edges: Edge[]) => {
  const adjList = new Map<string, Node[]>();
  const visited = new Set<string>();
  const arrival = new Map<string, number>();
  const departure = new Map<string, number>();
  let timestamp = 0;
  const topologicalSort: Node[] = [];

  function buildAdjacencyList(nodes: Node[], edges: Edge[]) {
    // initialization
    for (let node of nodes) {
      adjList.set(node.id, []);
    }

    for (let {source, destination} of edges) {
      adjList.get(source.id)!.push(destination);
    }
  }

  buildAdjacencyList(nodes, edges);

  // generates the topological sort order
  function dfs(node: Node): boolean { // returns true if there is a cycle.
    visited.add(node.id);
    arrival.set(node.id, timestamp++);

    for (let neighbor of adjList.get(node.id)!) {
      if (visited.has(neighbor.id) === false) {
        if (dfs(neighbor) === true) {
          return true;
        }
      } else if (departure.has(neighbor.id)) {
        return true;
      }
    }

    topologicalSort.push(node);
    departure.set(node.id, timestamp++);

    return false; // no cycle was found
  }

  for (let node of nodes) {
    if (visited.has(node.id) === false) {
      // is not visited
      if (dfs(node) === true) {
        return -1;
      }
    }
  }

  topologicalSort.reverse(); // in place operation

  return topologicalSort;
};

export default useTopology;

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
