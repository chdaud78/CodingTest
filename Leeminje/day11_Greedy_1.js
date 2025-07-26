// 조이스틱

/**
 * ✏️ 문제 개요
 * - 'A'로 시작하는 문자열을 주어진 name으로 바꾸기 위해
 *   조이스틱을 ▲▼◀▶ 로 최소한으로 조작해야 함.
 *
 * ✏️ 목표
 * - 조이스틱 조작 횟수의 최솟값을 구하라.
 *
 * ✏️ 해결 전략
 * 1. 각 문자마다 위/아래(▲▼)로 바꾸는 최소 횟수 계산
 * 2. 커서 이동은 좌/우(◀▶)만 가능하며,
 *    연속된 'A' 구간을 건너뛰는 방향 전환까지 고려하여 최소 이동 계산
 */

function solution(name) {
  let totalMove = 0;

  // 0️⃣ 알파벳 상하 이동 (A → 목표 알파벳까지 최소 횟수)
  for (let i = 0; i < name.length; i++) {
    const charCode = name.charCodeAt(i);
    const upDownMove = Math.min(charCode - 65, 91 - charCode); // 'A' = 65, 'Z' = 90
    totalMove += upDownMove;
  }

  // 1️⃣ 커서 좌우 이동 최솟값 계산
  let minCursorMove = name.length - 1;

  for (let i = 0; i < name.length; i++) {
    let next = i + 1;

    // 2️⃣ 연속된 'A' 구간 스킵
    while (next < name.length && name[next] === 'A') {
      next++;
    }

    // 3️⃣ 좌→우→좌 or 좌→좌→우 모두 고려
    const moveRightThenLeft = i * 2 + (name.length - next); // 오른쪽 갔다 왼쪽으로 돌아감
    const moveLeftThenRight = (name.length - next) * 2 + i; // 왼쪽 갔다가 오른쪽으로

    minCursorMove = Math.min(minCursorMove, moveRightThenLeft, moveLeftThenRight);
  }

  return totalMove + minCursorMove;
}

/**📖 풀이과정
 *
 * 0️⃣ 알파벳 상하 이동 (A → 목표 알파벳까지 최소 횟수)
 * - 알파벳은 A~Z로 이루어져 있고, 위/아래로 이동할 수 있음
 * - 예: J = 9, Z = 1 (26 - 'Z'까지 거리)
 * - 위로 가는 게 빠른지, 아래로 가는 게 빠른지 비교 (min 사용)
 *
 * 1️⃣ 커서 좌우 이동 최솟값 계산
 * - 기본 커서 이동: 오른쪽으로만 쭉 가는 경우 → name.length - 1
 * - 하지만 중간에 연속된 A가 있는 경우 돌아가는 것이 더 이득일 수 있음
 *
 * 2️⃣  연속된 'A' 구간 스킵
 * - A가 연속되는 구간을 찾아 그 부분을 건너뛸 수 있는지 탐색
 *
 * 3️⃣ 좌→우→좌 or 좌→좌→우 모두 고려
 * - 왼쪽으로 갔다가 오른쪽, 또는 오른쪽 갔다가 왼쪽으로 돌아가는 경우 비교
 * - 모든 지점에서 최소 이동 경로를 계산하며 min값 업데이트
 */
