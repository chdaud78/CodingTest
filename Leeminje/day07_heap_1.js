/** ✏️ 목표
 * - 작업 요청 시간(request time)과 소요 시간(duration)이 주어진 여러 작업들을 처리할 때,
 *   각 작업의 요청부터 종료까지 걸린 시간의 평균을 최소화하라
 * - 평균 = ∑(종료 시점 - 요청 시점) / 작업 수
 *
 * ► 예상 로직
 * 1. jobs를 요청 시점 기준으로 정렬
 * 2. 현재 시각(time)까지 들어온 작업을 후보군(heap)에 넣기
 * 3. 후보군 중 소요 시간이 가장 짧은 작업부터 처리 (SJF 전략)
 * 4. 작업 처리 시각 갱신 → 총 걸린 시간 누적
 * 5. 모든 작업을 다 처리할 때까지 반복
 */

function solution(jobs) {
  // 1️⃣ 요청 시각 기준으로 정렬
  jobs.sort((a, b) => a[0] - b[0]);

  const heap = []; // 작업 후보군 (우선순위 큐처럼 사용)
  let time = 0; // 현재 시각
  let totalTime = 0; // 누적 대기 시간
  let idx = 0; // jobs 순회 인덱스
  const count = jobs.length;

  // ⏳ 후보군 삽입 함수: 소요 시간 기준으로 정렬
  const insertHeap = (dur, req) => {
    heap.push([dur, req]);
    heap.sort((a, b) => a[0] - b[0]); // duration 기준 정렬 (min heap처럼 동작)
  };

  // 2️⃣ 모든 작업이 처리될 때까지 반복
  while (idx < count || heap.length > 0) {
    // 3️⃣ 현재 시각까지 요청된 작업 후보군에 추가
    while (idx < count && jobs[idx][0] <= time) {
      const [req, dur] = jobs[idx++];
      insertHeap(dur, req);
    }

    // 4️⃣ 처리 가능한 작업이 있다면 → 소요시간 짧은 순으로 처리
    if (heap.length > 0) {
      const [dur, req] = heap.shift(); // 가장 짧은 작업
      time += dur; // 현재 시각 갱신
      totalTime += time - req; // 총 소요 시간 += (종료 시각 - 요청 시각)
    } else {
      // 5️⃣ 후보군이 없다면 → 다음 작업의 요청 시각으로 점프
      time = jobs[idx][0];
    }
  }

  return Math.floor(totalTime / count);
}

/**
 * 📖 풀이 과정 설명
 *
 * 1️⃣ 요청 시점 기준 정렬
 * - 요청 시점이 빠른 작업부터 처리하기 위해 jobs 배열을 먼저 정렬함.
 *
 * 2️⃣ 후보 작업 저장: Heap처럼 사용
 * - JS에는 기본 MinHeap이 없기 때문에 배열을 사용하고, 소요 시간(duration) 기준으로 정렬하여 우선순위 큐처럼 동작시킴.
 * - `heap.push()` 후 `.sort()`를 매번 수행하므로, 이론적으로는 O(n log n)보다 성능이 낮지만 입력이 작을 경우엔 괜찮.
 *
 * 3️⃣ 작업 처리 순서
 * - 현재 시각까지 요청된 작업들을 후보군에 넣고, 그 중 소요 시간이 가장 짧은 작업부터 처리함. (SJF = Shortest Job First)
 *
 * 4️⃣ 시간 갱신 및 누적
 * - 처리한 작업의 `(종료 시각 - 요청 시각)`을 누적하여 평균을 구함.
 *
 * 5️⃣ 힙이 비었을 경우
 * - 작업이 없는 상태(time < 다음 요청 시각)라면 time을 다음 작업의 요청 시각으로 점프시킴.
 *
 * ✅ 시간복잡도
 * - 최악의 경우 O(n^2 log n) 정도 발생 가능 (heap sort 때문)
 * - 그러나 일반적인 테스트 케이스에서는 충분히 빠르게 동작
 */
