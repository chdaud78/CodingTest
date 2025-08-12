// 가장 멀리 떨어진 노드

/** ✏️ 목표
 * - 1번 노드에서 시작해 최단 경로로 가장 멀리 떨어진 노드의 개수를 구하기
 * - "가장 멀리"란, 최단 경로의 간선 수가 최대인 경우를 의미
 * - 잘못된 입력과 범위 밖 값, 자가 루프 등은 무시하고 처리
 *
 * ► 예상 로직
 * 1. 예외 처리: n과 vertex의 유효성 검증
 * 2. 인접 리스트로 그래프 구성 (잘못된 간선은 건너뜀)
 * 3. BFS로 1번 노드부터 모든 노드까지 최단 거리 계산
 * 4. 최단 거리 중 최댓값을 찾고, 그 거리를 가진 노드 개수를 반환
 */

function solution(n, vertex) {
  // 1️⃣ 예외 처리
  if (!Number.isInteger(n) || n < 1) throw new TypeError('n은 1 이상의 정수');
  if (!Array.isArray(vertex)) throw new TypeError('vertex는 2차원 배열');

  // 2️⃣ 그래프 구성
  const g = Array.from({ length: n + 1 }, () => []);
  for (const e of vertex) {
    if (!Array.isArray(e) || e.length !== 2) continue; // 잘못된 형식 무시

    let [a, b] = e;

    if (!Number.isInteger(a) || !Number.isInteger(b)) continue; // 숫자 아닌 경우 무시
    if (a === b) continue; // 자기 자신과 연결된 간선 무시
    if (a < 1 || a > n || b < 1 || b > n) continue; // 범위 밖 무시

    g[a].push(b);
    g[b].push(a);
  }

  // 3️⃣ BFS 준비
  const dist = new Array(n + 1).fill(-1); // -1: 미방문 표시
  const q = new Array(n); // 큐(성능 최적화를 위해 head/tail 사용)
  let head = 0;
  let tail = 0;

  dist[1] = 0; // 시작 노드 거리 = 0
  q[tail++] = 1;

  // 4️⃣ BFS 실행 (최단 거리 계산)
  while (head < tail) {
    const cur = q[head++];
    const nextDist = dist[cur] + 1;

    for (const nxt of g[cur]) {
      if (dist[nxt] !== -1) continue; // 이미 방문

      dist[nxt] = nextDist;
      q[tail++] = nxt;
    }
  }

  // 5️⃣ 최댓거리 계산
  let maxD = 0;
  for (let i = 1; i <= n; i++) if (dist[i] > maxD) maxD = dist[i];

  // 6️⃣ 최댓거리 노드 개수 세기
  let count = 0;
  for (let i = 1; i <= n; i++) if (dist[i] === maxD) count++;

  return count;
}

/**
 * 📖 풀이 과정 설명
 * 1️⃣ 예외 처리
 * - n은 1 이상의 정수인지 확인
 * - vertex가 2차원 배열인지 검증
 *
 * 2️⃣ 그래프 구성
 * - vertex의 각 [a, b] 간선을 양방향으로 인접 리스트에 저장
 * - 간선 데이터가 잘못됐거나 범위를 벗어나면 건너뚜;ㅁ
 * - 자기 자신과 연결된 간선(a === b)은 무시
 *
 * 3️⃣ BFS로 최단 거리 계산
 * - dist 배열을 -1로 초기화하여 미방문 상태를 표시
 * - 시작 노드 1의 거리를 0으로 설정하고 큐에 넣기
 * - 큐에서 노드를 꺼내 인접 노드를 방문하며 거리를 기록
 *
 * 4️⃣ 최댓거리와 개수 찾기
 * - dist 배열에서 최댓값(maxD)을 찾기
 * - maxD를 가진 노드의 개수를 세어 반환
 */
