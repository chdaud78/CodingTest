// 섬 연결하기

/**
 * ✏️ 목표
 * - 섬을 연결하는 최소 비용 찾기
 *
 * ► 예상 로직 (그래프)
 * 1. `cost`가 낮은 순서로 정렬
 * 2. `cost` 낮은 것 부터 하나씩 `visited` 처리
 * 3. 모든게 다 `visited`에 들어있으면 연결된 것이므로 그 때의 비용 return
 */

function solution(n, costs) {
  costs.sort((a,b) => a[2] - b[2]);

  const parent = Array.from({length : n}, (_, i) => i);

  function find(x) {
    if(parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a,b) {
    const rootA = find(a);
    const rootB = find(b);
    if(rootA !== rootB) {
      parent[rootB] = rootA;
      return true;
    }
    return false;
  }

  let total = 0;
  for(let [a,b,cost] of costs) {
    if(union(a,b)) total += cost;
  }
  return total;
}

/**
 * 📖 풀이 과정 설명 (크루스칼 알고리즘)
 *
 * 1. 간선을 비용 기준으로 정렬한다.
 * 2. 루트 노드를 찾는다.
 * 2-1. `parent[x] !== x`면 루트 노드가 아니므로 제귀 하며 경로를 압축해준다.
 * 3. 두 노드를 같은 집합으로 합친다.
 * 4. 최소 비용으로 MST를 구성하며 전체 cost를 구한다.
 *
 * cf) 책과 블로그를 많이 참고했습니다. 다음 복습 시간에 다시 한 번더 풀어보도록 하겠습니다.
 */