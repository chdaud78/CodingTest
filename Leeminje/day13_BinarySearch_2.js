// 징검다리

/**
 * ✏️ 문제 개요
 * - 출발 지점부터 도착 지점까지 distance 거리만큼 떨어져 있고, 그 사이에 rocks 배열에 위치한 바위들이 놓여있음.
 * - 바위들 중 최대 n개를 제거했을 때, 바위 사이의 거리 중 최소값을 가장 크게 만드는 것
 *
 * ✏️ 목표
 * - 바위를 n개 제거한 후, 각 지점(시작점, 바위, 도착점) 사이의 거리중 최소값을 최대한 크게 만드는 것
 *
 * ✏️ 예상 로직
 * 1. 거래의 최소값을 기준으로 이분 탐색을 진행
 * 2. 현재 거리(mid)를 최소 거리로 유지하려면 바위를 얼마나 제거해야 하는지 계산
 * 3. 제거 수가 n 이하이면 mid를 늘리고, 초과하면 줄이기
 */

// ✅ 기본 풀이
function solution(distance, rocks, n) {
  // 0️⃣ 바위 위치 정렬 + 도착지점 추가
  rocks.sort((a, b) => a - b);
  rocks.push(distance);

  // 1️⃣ 이분 탐색 범위 설정
  let left = 1;
  let right = distance;

  // 2️⃣ 이분 탐색 시작
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 거리의 최소값 후보
    let prev = 0; // 이전 바위 위치
    let removed = 0; // 제거한 바위 수

    // 3️⃣ rocks 순회하며 mid 이상 거리를 유지할 수 있는지 체크
    for (const rock of rocks) {
      const gap = rock - prev;
      if (gap < mid) removed++; // 거리가 너무 가까우면 바위 제거
      else prev = rock; // 유지 가능하므로 현재 바위 채택
    }

    // 4️⃣ 제거 수에 따라 탐색 범위 조정
    if (removed > n) right = mid - 1; // 너무 많이 제거해야 함 → 거리 줄임
    else left = mid + 1; // 유지 가능 → 거리 늘려도 됨
  }

  // 5️⃣ 최댓값을 구하는 것이므로 right에 정답 저장됨
  return right;
}

/**📖 풀이과정
 *
 * 0️⃣ 초기 세팅
 * - 바위를 오름차순 정렬한 뒤, 도착지점을 마지막 바위로 간주해 배열에 추가
 * - 이분 탐색 범위: 최소 1 ~ 최대 distance
 *
 * 1️⃣ 탐색 전략
 * - mid를 최소 거리의 후보로 놓고, 바위 사이 간격이 mid 이상이 되도록 바위를 제거함
 * - 제거된 바위 수가 n개 이하이면, 이 mid는 유효하므로 더 큰 거리도 가능 → left 증가
 * - 제거 수가 n개를 초과하면, mid가 너무 커서 유지 불가 → right 감소
 *
 * 2️⃣ 종료 조건
 * - left > right일 때 탐색 종료
 * - 이분 탐색의 특성상, 가장 큰 유효한 최소 거리는 right에 저장된다
 *
 * 3️⃣ 시간 복잡도
 * - 이분 탐색 log(distance)
 * - 각 탐색마다 rocks 순회: O(rocks.length)
 * - 총 시간 복잡도: O(rocks.length * log(distance))
 */
