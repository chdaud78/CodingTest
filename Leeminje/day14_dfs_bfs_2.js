// 네트워크

/**
 * ✏️ 문제 개요
 * - 컴퓨터 n대가 있고, 서로 연결 여부를 나타내는 2차원 배열 computers가 주어진다.
 * - 한 번 연결된 컴퓨터는 같은 네트워크로 간주된다.
 *
 * ✏️ 목표
 * - 컴퓨터들 간의 네트워크(연결된 덩어리)의 개수를 구하라.
 *
 * ✏️ 해결 전략
 * 1. 그래프처럼 보고, 각 컴퓨터를 정점(node)으로 간주한다.
 * 2. 아직 방문하지 않은 컴퓨터를 만나면 DFS를 통해 연결된 모든 컴퓨터를 방문 처리.
 * 3. 한 번의 DFS가 끝나면 하나의 네트워크가 완성된 것 → count++
 */

// ✅ DFS 풀이
function solution(n, computers) {
  const visited = Array(n).fill(false); // 0️⃣ 방문 기록용 배열
  let count = 0; // ✅ 네트워크 개수

  // 1️⃣ DFS 함수 정의
  function dfs(node) {
    visited[node] = true; // 현재 노드 방문 처리

    for (let i = 0; i < n; i++) {
      // 2️⃣ 연결되어 있고, 아직 방문하지 않은 컴퓨터라면 DFS 계속
      if (computers[node][i] === 1 && !visited[i]) {
        dfs(i);
      }
    }
  }

  // 3️⃣ 모든 컴퓨터를 돌면서 DFS 시작
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i); // 연결된 모든 컴퓨터 방문
      count++; // DFS 한 번 = 네트워크 하나
    }
  }

  return count;
}
