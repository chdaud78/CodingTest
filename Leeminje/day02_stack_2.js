// 올바른 괄호

// 기존 풀이
function solution(s) {
  let count = 0;

  for (const char of s) {
    count += char === '(' ? 1 : -1;
    if (count < 0) return false;
  }

  return count === 0;
}
/** 📖 풀이 과정
 * -
 * -
 */

// 개선 풀이
