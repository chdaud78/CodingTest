function solution(n, results) {
  // 1) 방향 그래프
  const winner = Array.from({ length: n + 1 }, () => []);
  const loser = Array.from({ length: n + 1 }, () => []);

  for (const [win, lose] of results) {
    winner[win].push(lose);
    loser[lose].push(win);
  }

  // BFS
  const bfsCount = (start, adj) => {
    const visited = Array(n + 1).fill(false);
    const queue = [start];
    let head = 0;
    visited[start] = true;

    let count = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      for (const next of adj[cur]) {
        if (visited[next]) continue;
        visited[next] = true;
        queue.push(next);
        count++;
      }
    }
    return count;
  };

  let answer = 0;
  for (let i = 1; i <= n; i++) {
    const wins = bfsCount(i, winner); // i가 이기는 사람
    const loses = bfsCount(i, loser); // i를 이기는 사람
    if (wins + loses === n - 1) answer++;
  }

  return answer;
}
