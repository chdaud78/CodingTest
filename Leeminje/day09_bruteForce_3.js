// 전력망을 둘로 나누기

/**
 * ✏️ 문제 개요
 * - n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있음
 * - 전선 중 하나를 끊어서 트리를 2개의 네트워크로 분리
 * - 이때 두 네트워크의 송전탑 수 차이의 절댓값을 최소화해야 함
 *
 * ✏️ 목표
 * - wires 배열에 있는 전선 중 하나를 제거하여 두 전력망으로 분할
 * - 각 전선 제거마다 두 네트워크로 나누고, 송전탑 개수를 각각 세기
 * - 송전탑 수 차이의 최소값을 반환
 *
 *
 * ✏️ 예상 로직
 * 1. wires 배열에서 전선 하나씩 제거 (총 n-1번 시도)
 * 2. 그래프를 새로 구성 (해당 간선 제외하고)
 * 3. 그래프 탐색 (BFS or DFS)으로 분리된 두 그룹 중 하나의 송전탑 수 계산
 * 4. 나머지는 전체 송전탑 수(n) - 계산된 수
 * 5. 두 그룹의 송전탑 수 차이의 절댓값 계산
 * 6. 그 중 최소값을 저장하여 반환
 */

// ✅ 기본 풀이
// 3️⃣ BFS를 이용해 한쪽 네트워크에 포함된 송전탑 수 세기
const bfsCount = (start, adjList, n) => {
  const visited = Array(n + 1).fill(false);
  const queue = [start];
  visited[start] = true;
  let count = 1;
  let front = 0;

  while (front < queue.length) {
    const current = queue[front++];
    for (const neighbor of adjList[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        count++;
      }
    }
  }

  // 4️⃣ 나머지 네트워크의 송전탑 수는 전체 - 탐색된 송전탑 수
  return count;
};

function solution(n, wires) {
  let minDiff = Infinity;

  // 1️⃣ 모든 간선을 하나씩 제거하며 시뮬레이션
  for (let i = 0; i < wires.length; i++) {
    // 2️⃣ 그래프를 인접 리스트 형태로 재구성
    const adjList = Array.from({ length: n + 1 }, () => []);

    wires.forEach(([a, b], idx) => {
      if (idx !== i) {
        adjList[a].push(b);
        adjList[b].push(a);
      }
    });

    const groupSize = bfsCount(1, adjList, n);
    // 5️⃣ 두 네트워크 간의 송전탑 개수 차이 계산
    const diff = Math.abs(n - 2 * groupSize);
    minDiff = Math.min(minDiff, diff);
  }

  return minDiff; // 6️⃣ 모든 경우 중 가장 작은 차이값을 반환
}
/**
 * 📖 풀이과정
 *
 * 0️⃣ 트리의 성질을 활용
 * - 송전탑 n개가 트리 형태로 연결되어 있으므로 간선은 항상 n - 1개
 * - 간선 하나를 제거하면 반드시 두 개의 연결된 네트워크(트리)로 나뉘게 됨
 *
 * 1️⃣ 모든 간선을 하나씩 제거하며 시뮬레이션
 * - wires 배열의 각 간선을 하나씩 제거해가며 반복문 수행
 * - 제거된 간선을 제외하고 새로운 그래프(인접 리스트)를 구성
 *
 * 2️⃣ 그래프를 인접 리스트 형태로 재구성
 * - n개의 송전탑을 노드로 보고, 연결된 송전탑 정보를 기반으로 리스트 생성
 * - 인덱스가 송전탑 번호이고, 값은 연결된 송전탑들의 배열
 *
 * 3️⃣ BFS를 이용해 한쪽 네트워크에 포함된 송전탑 수 세기
 * - 제거된 간선으로 인해 두 개의 네트워크로 분리되었기 때문에
 * - 아무 노드(예: 1번 노드)에서 시작해 BFS 탐색을 하며 방문 가능한 송전탑 수를 셈
 *
 * 4️⃣ 나머지 네트워크의 송전탑 수는 전체 - 탐색된 송전탑 수
 * - 두 네트워크의 송전탑 개수는 각각:
 *   → A = 탐색한 송전탑 수
 *   → B = n - A
 *
 * 5️⃣ 두 네트워크 간의 송전탑 개수 차이 계산
 * - Math.abs(n - 2 * A) 로 바로 계산 가능
 * - 절댓값을 통해 어느 쪽이 더 크든 상관없이 차이만 구함
 *
 * 6️⃣ 모든 경우 중 가장 작은 차이값을 반환
 * - 각 반복에서 구한 차이를 minDiff에 저장하며 최소값으로 갱신
 * - 모든 간선 제거 시뮬레이션이 끝난 후, 최소 차이값을 최종 반환
 */
