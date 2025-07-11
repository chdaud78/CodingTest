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
 * ※ 여는 괄호가 닫는 괄호보다 먼저 나와야하고, 괄호의 짝이 모두 맞아야 함.
 * - count로 괄호의 열린 괄호의 수를 추적함
 * - 여는 괄호라면 +1, 닫는 괄호라면 -1의 반복적인 연산을 통해, count가 -1 이 되는 경우 실패
 * - 마지막 값까지 count가 0이라면 성공
 */

// 개선 풀이
/** 📖 풀이 과정
 * ※ 위의 풀이는 스택을 사용하지 않음! 몰랐다.
 * -  stack 선언 후 재진행
 */
function solution(s) {
  const stack = [];

  for (const char of s) {
    if (char === '(') {
      stack.push(char);
    } else {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }

  return stack.length === 0;
}

// 실용적인 버전
// function solution(s) {
//   const stack = [];
//   for (const char of s) {
//     if (char === '(') stack.push(c);
//     else if (!stack.pop()) return false;
//   }
//   return stack.length === 0;
// }
