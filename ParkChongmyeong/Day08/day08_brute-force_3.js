// 전력망을 둘로 나누기

function solution(n, wires) {
  const graph = Array.from({ length : n + 1 }, () => []);
  for(const[a,b] of wires) {
    graph[a].push(b);
    graph[b].push(a);
  }

  function dfs(node, parent) {
    let cnt = 1;
    for(const child of graph[node]) {
      if(child !== parent) {
        cnt+=dfs(child,node);
      }
    }

    return cnt;
  }

  let minDiff = Infinity;
  for(const[a,b] of wires) {
    graph[a].splice(graph[a].indexOf(b), 1);
    graph[b].splice(graph[b].indexOf(a), 1);

    const cntA = dfs(a,b);
    const cntB = n - cntA;

    minDiff = Math.min(minDiff, Math.abs(cntA - cntB));

    graph[a].push(b);
    graph[b].push(a);
  }

  return minDiff;
}

/**
 * 📖 풀이 과정 설명
 *
 * 못 풀어서 책 참고했습니다,, 복습 시간에 다시 한번 더 풀어보도록 하겠습니다.
 */