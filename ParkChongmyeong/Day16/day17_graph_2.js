/**
 * ✏️ 목표
 * - 순위를 결정할 수 있는 선수의 수 구하기
 *
 * ► 예상 로직 (BFS(너비 우선 탐색) 사용)
 * 1. 이긴 사람과 진 사람 각각의 그래프 그리기
 * 2. bfs를 이용하여 방문 여부를 확인하며 방문한 수를 count해준다.
 * 3. 이긴 사람의 그래프, 진 사람의 그래프의 방문한 수를 구한 후 더해준다.
 * 4. 더해준 값이 n-1과 같으면 순위가 정해졌으므로 그 수를 retur해준다.
 */


function solution(n, results) {
  const winGraph = Array.from({length : n + 1} , () => []);
  const loseGraph = Array.from({length : n + 1} , () => []);

  for(const [a,b] of results) {
    winGraph[a].push(b);
    loseGraph[b].push(a);
  }

  function bfs(start, graph) {
    const visited = Array(n+1).fill(false);
    const queue = [start];
    visited[start] = true;
    let count = 0;

    while(queue.length) {
      const cur = queue.shift();

      for(const next of graph[cur]) {
        if(!visited[next]) {
          visited[next] = true;
          queue.push(next);
          count++;
        }
      }
    }
    return count;
  }

  let answer = 0;

  for(let i = 1; i <=n; i++) {
    const winCount = bfs(i, winGraph);
    const loseCount = bfs(i, loseGraph);

    if(winCount + loseCount === n-1) answer++;
  }

  return answer ;
}

/**
 * 📖 풀이 과정 설명
 * 1. `results`를 순회하며 이긴사람/진사람 그래프를 그린다.
 * `winGraph[a].push(b);`는 이긴 사람의 그래프
 * `loseGraph[b].push(a);`는 진 사람의 그래프
 * 2. bfs 순회 시작
 * `visited array`를 `n+1`만큼 `false`로 채워 만든다.
 * `queue`는 연관 노드를 저장한다.
 * `queue.shift`를 통해 현재 노드를 정해준다.
 * `graph`를 순회하며 다음 노드가 `visited` 하지 않으면 `visited`를 `true`로 해주고 `queue`에 연관 노드를 저장한다.
 * 이때 `count`를 1늘려주어 방문횟수를 저장한다.
 * 3. 이긴 사람의 그래프, 진사람의 그래프를 각각 `bfs`로 순회하면서 `count`를 저장한다.
 * 4. 이긴 사람의 수와 진사람의 수가 n-1이면 순위가 정해졌으므로 `answer`를 1늘려준 후 순위가 결정된 사람의 수를 `return`한다.
 */