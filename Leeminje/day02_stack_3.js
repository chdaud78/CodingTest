// 주식 가격

// 기존 풀이
function solution(prices) {
  // 가격이 동일하거나 올라가면 계속 유지, 떨어지면 그 시점까지의 시간만 유지
  const answer = new Array(prices.length).fill(0);
  const stack = []; // 가격 떨어진 인덱스 저장

  prices.forEach((price, i) => {
    while (stack.length && price < prices[stack.at(-1)]) {
      const idx = stack.pop();
      answer[idx] = i - idx;
    }
    stack.push(i);
  });

  // 방안 1
  // stack.forEach(i => answer[i] = prices.length - 1 - i);

  // 방안 2
  while (stack.length) {
    const idx = stack.pop();
    answer[idx] = prices.length - 1 - idx;
  }
  return answer;
}

/** 📖 풀이 과정
 * -
 * -
 */

// 개선 풀이
