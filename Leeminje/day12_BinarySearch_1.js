// 입국심사

/**
 * ✏️ 문제 개요
 * - 여러 명의 심사관이 각자 다른 속도로 심사를 진행할 때,
 *   n명의 사람이 모두 심사를 마치는 데 걸리는 최소 시간을 구하는 문제
 *
 * ✏️ 목표
 * - 모든 사람이 심사를 끝낼 수 있는 가장 짧은 시간을 찾기
 *
 * ✏️ 해결 전략
 * 1. 가능한 시간 범위를 두고 이분 탐색 진행
 * 2. 특정 시간(mid) 안에 처리할 수 있는 사람 수를 계산
 * 3. 처리 가능한 인원이 n명 이상이면 시간을 줄이고, 부족하면 늘린다.
 */

// ✅ 기본 풀이
function solution(n, times) {
  // 0️⃣ 탐색 범위 초기화 - left: 최소 시간(1분), right: 최악의 경우 (가장 느린 심사관 * n명)
  let left = 1;
  let right = Math.max(...times) * n;
  let answer = right;

  // 1️⃣ 특정 시간(midTime) 동안 처리할 수 있는 사람 수를 계산하는 함수
  const countFunc = (midTime) => {
    let total = 0;
    for (let time of times) {
      total += Math.floor(midTime / time); // 각 심사관이 처리 가능한 인원
      if (total >= n) break; // n명을 넘기면 더 볼 필요 없음
    }
    return total;
  };

  // 2️⃣ 이분 탐색 시작
  while (left <= right) {
    const midTime = Math.floor((left + right) / 2); // 중간 시간
    const count = countFunc(midTime); // midTime에 처리 가능한 총 인원

    if (count >= n) {
      // midTime 안에 모든 사람을 처리할 수 있음(더 짧은 시간 시도!)
      answer = midTime;
      right = midTime - 1;
    } else {
      // midTime이 부족 -> 시간을 늘림
      left = midTime + 1;
    }
  }

  return answer;
}

/**📖 풀이과정
 *
 * 0️⃣ 범위 설정
 * - 최소 시간은 1분, 최대 시간은 (가장 느린 심사관 * n명)으로 두고 시작.
 * - 이 범위 내에서 정답 시간을 찾기 위해 이분 탐색을 적용한다.
 *
 * 1️⃣ 처리 가능 인원 계산 함수(countFunc)
 * - midTime이라는 특정 시간이 주어졌을 때,
 *   각 심사관이 midTime 동안 처리할 수 있는 사람 수 = midTime / time
 * - 모든 심사관의 처리량을 합산해 n명 이상인지 판단.
 *
 * 2️⃣ 이분 탐색 진행
 * - midTime을 기준으로:
 *    - count >= n → midTime 안에 모두 처리 가능. 시간을 더 줄여본다.
 *    - count < n → midTime으로는 부족. 시간을 늘린다.
 * - 조건을 만족하는 시간을 계속 좁혀 나간다.
 *
 * 3️⃣ 종료 조건
 * - left > right가 되면 탐색이 끝나고,
 *   answer에는 모든 사람을 심사할 수 있는 최소 시간이 남는다.
 *
 * 이 방법으로 O(log(maxTime*n) * m)의 시간 복잡도로 효율적으로 문제를 해결할 수 있다.
 */
