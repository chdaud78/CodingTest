// 단어 변환

/**
 * ✏️ 목표
 * - begin에서 target으로 변환하는 최소 단계를 구하기
 * - 변환할 수 없는 경우 0을 반환
 *
 * ✏️ 해결 전략 (BFS)
 * 1. BFS를 사용해 begin에서 시작하여 변환 가능한 단어를 탐색
 * 2. 각 상태는 [현재 단어, 지금까지의 변환 횟수]로 표현
 * 3. 변환 가능한 단어 = 한 글자만 다른 단어
 * 4. 이미 방문한 단어는 다시 탐색하지 않도록 visited 처리
 */

// ✅ 기본 풀이
function solution(begin, target, words) {
  // target이 words 안에 없으면 변환 불가능
  if (!words.includes(target)) return 0;

  // 두 단어가 한 글자만 다른지 확인
  const isTransformable = (from, to) => {
    let diff = 0;
    for (let i = 0; i < from.length; i++) {
      if (from[i] !== to[i]) {
        diff++;
        if (diff > 1) return false;
      }
    }
    return diff === 1;
  };

  // BFS 탐색 함수
  const bfs = () => {
    const visited = new Set(); // 방문한 단어 저장
    const queue = [[begin, 0]]; // [현재 단어, 변환 횟수]

    while (queue.length > 0) {
      const [current, steps] = queue.shift();

      // 정답 조건: target에 도달한 경우
      if (current === target) return steps;

      // 변환 가능한 단어 탐색
      for (const nextWord of words) {
        if (!visited.has(nextWord) && isTransformable(current, nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, steps + 1]);
        }
      }
    }

    // target에 도달하지 못한 경우
    return 0;
  };

  return bfs();
}

/** 📖 풀이과정
 *
 * 0️⃣ 예외 처리
 * - target이 words에 없다면 절대 도달 불가능 → 0 즉시 반환
 *
 * 1️⃣ BFS 탐색
 * - 시작 단어 begin부터 시작해, 한 글자만 다른 단어로 점프하며
 *   큐를 통해 순차적으로 변환 경로 탐색
 *
 * 2️⃣ isTransformable(from, to)
 * - 두 단어의 각 문자를 비교해서 서로 다른 글자 수가 정확히 1개일 때만 true
 * - 두 글자 이상 다르면 중단 → 불필요한 비교 최소화
 *
 * 3️⃣ 큐 구조
 * - 각 큐 항목은 [현재 단어, 현재까지의 변환 단계 수]
 * - BFS의 특성상 먼저 target에 도달하면 그것이 최단 거리
 *
 * 4️⃣ visited 처리
 * - 이미 탐색한 단어는 다시 방문하지 않도록 Set에 저장
 * - 중복 탐색을 방지해 불필요한 연산 줄임
 *
 * 5️⃣ 종료 조건
 * - 큐가 다 빌 때까지도 target에 도달하지 못하면 변환 불가 → 0 반환
 */
