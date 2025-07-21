// 최소직사각형

/**
 * ✏️ 문제 개요
 * - 다양한 명함 크기들을 모두 수납할 수 있으면서 가장 작은 지갑의 크기를 구하는 문제
 * - 명함은 가로, 세로를 돌려서 수납할 수 있음
 *
 * ✏️ 목표
 * - 모든 명합이 들어갈 수 있는 지갑 크기(넓이)를 구하기
 * - 명함을 돌려도 되기 때문에, 긴 쪽을 가로, 짧은 쪽을 세로로 통일
 *
 * ✏️ 예상로직
 * 1. sizes 배열의 각 [w, h]에서 -> [큰 값, 작은 값] 으로 정렬
 * 2. 각각을 정리해서 가로 중 최대값, 세로 중 최대값을 구함
 * 3. 넓이 = max 가로 * max * 세로 -> 최소 지갑 크기
 *
 * ... 대충 명함을 다 눕혀서 가로 기준으로 정렬하고 시작하자
 */

// 풀이 코드
function solution(sizes) {
  let maxWidth = 0;
  let maxHeight = 0;

  for (let [w, h] of sizes) {
    const big = Math.max(w, h);
    const small = Math.min(w, h);

    maxWidth = Math.max(maxWidth, big);
    maxHeight = Math.max(maxHeight, small);
  }

  return maxWidth * maxHeight;
}

/** 📖 풀이 과정
 * 0️⃣ 명함은 회전 가능
 * - [30, 70]을 [70, 30] 처럼 돌릴 수 있음
 * - 따라서 모든 명함을 가로: 더 큰 쪽, 세로: 더 작은 쪽으로 고정
 *
 * 1️⃣ 최대 가로, 최대 세로를 따로 추출
 * - 모든 명함 중 가장 큰 가로 = maxWidth
 * - 모든 명함중 가장 큰 세로 = maxHeight
 */
