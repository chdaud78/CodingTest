function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);

  // 양방향 추가
  for (const [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
  }
  // 거리 배열
  const dist = Array(n + 1).fill(-1);
  dist[1] = 0;
// BFS
  const queue = [1];
  let head = 0;

  while (head < queue.length) {
    const cur = queue[head++];
    for (const next of graph[cur]) {
      if (dist[next] !== -1) continue;
      dist[next] = dist[cur] + 1;
      queue.push(next);
    }
//최대거리와 개수 계산
    const maxDist = Math.max(...dist.slice(1));
    const answer = dist.filter((d) => d === maxDist).length;

    return answer;
  }
}
