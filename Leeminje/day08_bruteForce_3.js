// 카펫

/**
 * ✏️ 문제 개요
 * - 테두리는 갈색 격자(brown), 안쪽은 노란색 격자(yellow)로 구성된 카펫이 있는데,
 * - 전체 카펫의 가로와 세로를 구하는 문제!
 *
 * ✏️ 목표
 * - 전체 칸 수(brown + yellow)를 기준으로 가능한 가로 * 세로 조합 중,
 *   가운데가 정확이 yellow 개수만큼 되는 조합을 찾는다.
 *
 * ✏️ 예상 로직
 * 1. brown + yellow = 전체 격자 수 → 이걸 기준으로 모든 가로·세로 조합을 만든다.
 * 2. 완전 탐색을 통해 가능한 (가로, 세로) 조합을 구한다.
 * 3. (가로 - 2) * (세로 - 2)가 yellow인지 확인한다.
 * 4. 조건을 만족하는 가로·세로를 반환한다.
 */

// 초기 코드
function solution(brown, yellow) {
  // 1. 전체 격자 수 구하기
  const total = brown + yellow;

  // 2. 가능한 가로*세로 조합을 완전 탐색
  for (let i = 1; i <= total; i++) {
    const width = total / i;

    if (!Number.isInteger(width)) continue;
    if (width < i) continue;

    // 3. 조합 내에서 노란색 격자 수가 맞는지 확인하기
    // (가로 - 2) * (세로 - 2) === yellow
    const yellowWidth = width - 2;
    const yellowHeight = i - 2;

    if (yellowWidth * yellowHeight === yellow) {
      // 4. 조건 만족 시 반환
      return [width, i];
    }
  }
}

/** 📖 풀이 과정
 * 1️⃣ 전체 격자 수는 brown + yellow
 *
 * 2️⃣ 가능한 가로 × 세로 조합을 찾기 위해,
 * - 세로(height)를 1부터 total까지 반복하면서, 그에 대응하는 가로(width = total / height)를 구하기
 * - 단, width는 정수여야 하고 width ≥ height 조건을 만족해야함.
 *
 * 3️⃣ 내부 영역 (width - 2) × (height - 2)의 값이 yellow와 같다면 정답!
 */

// 풀이 코드
function solution(brown, yellow) {
  const total = brown + yellow;

  for (let height = 1; height <= total; height++) {
    const width = total / height;

    if (!Number.isInteger(width) || width < height) continue;

    const [yellowWidth, yellowHeight] = [width - 2, height - 2];
    if (yellowWidth * yellowHeight === yellow) return [width, height];
  }
}

// 개선코드
// 제곱근으로 가능한가..?에 대한 고민중
// 코드 정리 가능해보임. 고민 중
