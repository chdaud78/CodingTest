// 주식 가격

// 기존 풀이
function solution(prices) {
  // 가격이 동일하거나 올라가면 계속 유지, 떨어지면 그 시점까지의 시간만 유지
  const answer = new Array(prices.length).fill(0);
  const stack = []; // 가격 떨어진 인덱스 저장

  prices.forEach((price, i) => {
    // 가격이 떨어진 경우~
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
 * ※ 주식 가격이 담긴 배열 prices
 * ※ 각 시점에서 가격이 떨어지지 않은 시간(초)을 계산해서 배열로 리턴
 *
 * 1. const answer = new Array(prices.length).fill(0);
 * - 결과를 담을 배열을 만든다.
 *
 * 2. const stack = [];
 * - 스택을 만든다.(가격이 아직 떨어지지 않은 시점(인덱스) 들을 담아둠)
 *
 * 3. prices.forEach 부분
 * - 현재 시점 i의 가격 확인
 * - 스택의 마지막 시점(index)와 비교하여 가격이 떨어졌다면, 그동안 유지된 시간을 저장
 * - 그 후 현재 인덱스를 스택에 추가
 *
 * 4. while(stack.length)
 * - 끝까지 버틴 시간 = 전체 길이 - 현재 위치 - 1
 *
 * 4-1. 방안 1
 * - 스택 안의 모든 인덱스를 앞에서부터 순차적으로 꺼냄
 * - 스택은 유지
 *
 * 4-2. 방안 2
 * - 스택에서 하나씩 뒤에서 꺼냄(LIFO)
 * - 스택이 제거됨
 */
