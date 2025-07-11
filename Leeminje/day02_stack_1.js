// 같은 숫자는 실어

// 기존 풀이
const solution = (arr) => arr.filter((num, idx) => num !== arr[idx - 1]);

/** 📖 풀이 과정
 * ※ 해당 문제는 스택보다 일반 배열에 가까워서 스택으로 안 풀었음.
 * - 연속해서 같은 숫자가 나오는 경우, 중복된 숫자를 제거하고 하나만 남김
 */

// 개선 풀이
function solution(arr) {
  const stack = [];

  for (const value of arr) {
    if (result.at(-1) !== value) result.push(value);
  }

  return stack;
}
