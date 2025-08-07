function solution(n, computers) {
  let answer = 0;
  const visited = [];
  for(let i = 0 ; i < n ; i++) {
    if(!visited[i]) {
      dfs(computers,visited,i);
      answer++
    }
  }
  return answer;
}

const dfs = (graph, visited, v) => {
  visited[v] = true;
  for(i of graph[v]) {
    if (!visited[i] && graph[v][i] === 1) {
      dfs(graph,visited,i);
    }
  }
}