// 섬 연결하기

/**
 * ✏️ 문제 개요
 * - n개의 섬과 섬 사이 다리를 건설할 비용(costs)이 주어질 때
 *   모든 섬이 서로 통행 가능하도록 연결하는 최소 비용을 구하는 문제
 *
 * ✏️ 목표
 * - 최소 비용으로 모든 섬을 연결 (최소 신장 트리 MST)
 *
 * ✏️ 해결 전략 (크루스칼 + Union-Find)
 * 1. 다리(간선)를 비용 오름차순으로 정렬
 * 2. 가장 낮은 비용의 다리부터 선택
 *    - 두 섬이 이미 연결된 상태(같은 집합)라면 건너뜀
 *    - 아니면 다리를 연결하고 비용 추가
 * 3. n-1개의 다리가 선택되면 종료
 */

// ✅ 기본 풀이
function solution(n, costs) {
  // 0️⃣ 간선(다리) 비용 기준 오름차순 정렬
  costs.sort((a, b) => a[2] - b[2]);

  // Union-Find를 위한 부모 배열
  const parent = Array.from({ length: n }, (_, i) => i);

  // Find: 루트 노드를 찾기 (경로 압축)
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  // Union: 두 노드를 같은 집합으로 합침
  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA !== rootB) {
      parent[rootB] = rootA; // 두 집합을 합침
      return true;
    }
    return false; // 이미 같은 집합이면 합치지 않음
  }

  let totalCost = 0;
  let edgesUsed = 0;

  // 1️⃣ 간선(다리)을 순회
  for (const [a, b, cost] of costs) {
    // 2️⃣ 두 섬이 연결되어 있지 않으면 다리를 추가
    if (union(a, b)) {
      totalCost += cost;
      edgesUsed++;
      // 3️⃣ 모든 섬이 연결되면 종료 (n-1개의 간선 선택 완료)
      if (edgesUsed === n - 1) break;
    }
  }

  return totalCost;
}

/**📖 풀이과정
 *
 * 0️⃣ 비용 기준 정렬
 * - 가장 적은 비용부터 선택하기 위해 오름차순으로 정렬
 *
 * 1️⃣ 간선 선택
 * - 간선을 순회하면서 두 섬이 같은 집합인지 확인
 *
 * 2️⃣ Union-Find
 * - find(): 부모 노드를 재귀적으로 찾아 루트 반환
 * - union(): 서로 다른 집합일 때만 연결하고 true 반환
 *
 * 3️⃣ MST 완성
 * - n-1개의 간선이 선택되면 모든 섬이 연결된 상태
 * - 누적된 비용(totalCost) 반환
 */
